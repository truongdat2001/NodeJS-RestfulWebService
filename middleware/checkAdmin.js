let checkAdmin = (req, res, next) => {
    const user = req.session.user;
    if (user && user.rule == "admin") {
        next();
    } else {
        res.status(403).send("Bạn không có quyền truy cập trang web này")
    }
}

module.exports = checkAdmin;