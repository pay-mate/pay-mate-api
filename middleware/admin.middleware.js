const createError = require('http-errors');

module.exports.isMe = (params = 'id') => {

    return (req, res, next) => {
        const admin_id = req.params[params];

        if (!req.isAuthenticated()) {
            throw createError(403);
        } else if (admin_id !== req.user.id) {
            throw createError(401);
        } else {
            next();
        }
    }
}
