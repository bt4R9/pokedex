const TWO_YEARS = 60 * 60 * 24 * 365 * 2;

module.exports = (req, res, next) => {
    res.cookie('_csrf', req.csrfToken(), {
        maxAge: TWO_YEARS,
        httpOnly: false
    });
    next();
};
