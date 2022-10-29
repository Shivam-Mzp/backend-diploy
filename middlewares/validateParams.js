module.exports = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({
            errors: error.details.map((item) => {
                return (item.message).split("\"").join("'");
        }) });
    } else {
        next();
    }
};
