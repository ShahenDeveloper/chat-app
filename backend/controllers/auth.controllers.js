import User from "../models/user.models.js"
import bcryptjs from 'bcryptjs'
import generateTokenSetCookie from "../utils/generateToken.js"
export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender} = req.body
        if(password !== confirmPassword){
            return res.status(400).json({error: "Password do not match."})
        }
        const user = await User.findOne({username: username})

        if(user){
            return res.status(400).json({error: "Username already exists."})
        }

        const saltRounds = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, saltRounds)
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,username,password: hashPassword,gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
        generateTokenSetCookie(newUser._id, res)
        await newUser.save()
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })
        }else{
            res.status(400).json({error: "Invalid User data"})
        }
    } catch (error) {
        console.log('error while signup',error)
        res.status(500).json({error: "Internal server error"})
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenSetCookie(user._id, res);

        res.status(201).json({ message: "User successfully logged in", 
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic
     });
    } catch (error) {
        console.log('error while login', error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt","",{maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    } catch (error) {
        console.log('error while logout', error);
        res.status(500).json({ error: "Internal server error" });
    }
}