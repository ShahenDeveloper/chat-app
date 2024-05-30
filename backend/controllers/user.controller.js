import User from "../models/user.models.js"

export const getUserForSideBar = async ( req, res) => {
    try {
        const loggedInUserId = req.user._id

        const  filterUser = await User.find({ _id: {$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filterUser)
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}