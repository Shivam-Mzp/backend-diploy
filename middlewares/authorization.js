const env = require("../env");

module.exports = (permittedRoles) => {
    return async (req, res, next) => {

        // first get the user from the req
        const user = req.user;

        // then check if it is admin or not and if it is admin then give all permission to him
        if (user.email === env.ADMIN_EMAIL) {
            return next();
        }

        // then check if any of the roles that user has matches with any of the permittedRoles
        const isPermittedArray = user.roles.filter((role) => {
            return permittedRoles.includes(role);
        });

        // if not then throw an error
        if (isPermittedArray.length === 0) {
            return res.status(400).json({
                status: "Error",
                message: "You Are Not Permitted To Access This...",
            });
        }

        // else return next
        return next();
    };
};
