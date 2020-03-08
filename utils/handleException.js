const handleException = fn => (req, res, next) => {
    fn(req, res).catch((err) => {
        next(err)})
}

module.exports = handleException;
