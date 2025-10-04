const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../model/user")

const register = async(req, res) => {
    try {
        const { name, lastname, email, password } = req.body

        if (!name || !lastname || !email || !password) {
            return res.status(400).send("All fields are required")
        }

        const findUser = await User.findOne({ email })
        if (findUser) {
            return res.status(401).send("User already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            lastname,
            email,
            password: hashedPassword
        })

        await user.save()

        const accessToken = jwt.sign({
                UserInfo: {
                    id: user._id,
                    email: user.email,
                    name: user.name
                }
            },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' }
        )

        const refreshToken = jwt.sign({ email: user.email },
            process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }
        )

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            message: "User registered successfully",
            accessToken,
            user: {
                email: user.email,
                name: user.name
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500).send("Server error")
    }

}
const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(401).send("User not found");
        }

        const isMatch = await bcrypt.compare(password, findUser.password);
        if (!isMatch) {
            return res.status(401).send("Invalid credentials");
        }

        const accessToken = jwt.sign({
                UserInfo: {
                    id: findUser._id,
                    email: findUser.email,
                    name: findUser.name,
                },
            },
            process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign({ email: findUser.email },
            process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" }
        );

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
            accessToken,
            user: {
                email: findUser.email,
                name: findUser.name,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
module.exports = { register, login }