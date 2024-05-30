import jwt from 'jsonwebtoken';

const generateTokenSetCookie = (userId, res) => {
    // Generate a JWT token using the user's ID and a secret key, with an expiration of 15 days.
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15d" });

    // Set the JWT as a cookie in the response, with specific security and expiration settings.
    res.cookie("jwt", token, {
        // maxAge: The duration for which the cookie will be valid (15 days).
        maxAge: 15 * 24 * 60 * 60 * 1000,
        // httpOnly: The cookie cannot be accessed through client-side scripts, enhancing security.
        httpOnly: true,
        // sameSite: The cookie will only be sent for requests originating from the same site, preventing CSRF attacks.
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    });
};

export default generateTokenSetCookie;
