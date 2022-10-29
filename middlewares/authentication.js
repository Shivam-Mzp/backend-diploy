
const jwt = require("jsonwebtoken");
const env = require("../env");

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, env.JWT_SECRET_KEY, (err, user) => {
            if (err) {
                return reject(err);
            }
            return resolve(user);
        });
    });
};

module.exports = async (req, res, next) => {

    // Check if authorization header is present if not then throw an error

    const bearerToken = req?.headers?.authorization;

    if (!bearerToken)
        return res.status(401).json({
            status: "Failed",
            message: "You Did Not Send The Authorization Header...",
        });


    // Check if authorization header is present then it start with "Bearer " if not throw an error

    if (!bearerToken.startsWith("Bearer "))
        return res.status(401).json({
            status: "Failed",
            message: "You Did Not Send The Authorization Header Starts With (Bearer )... ",
        });

    // Extract the token from the bearer token
    const token = bearerToken.split(" ")[1].trim();

    // decrypt the token and try to fetch the user
    try {

        const user = await verifyToken(token);
        req.user = user.user;
        return next();

    } catch (err) {
        return res.status(400).json({
            status: "failed",
            message: "You Are Not Sending The Correct Token...",
        });
    }

};
