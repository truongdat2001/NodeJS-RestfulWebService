import db from "../models/database/db";

class clientCtrl {
    static getHomepage(req, res) {
        let sqlCatalog = "SELECT * FROM catalog";
        db.query(sqlCatalog, (err, listcatalog) => {
            let sqlProduct = "SELECT * FROM products";
            db.query(sqlProduct, (err, listproducts) => {
                // Lấy thông tin người dùng từ session
                let username = req.session.user ? req.session.user.username : null;
                let rule = req.session.user ? req.session.user.rule : null;

                // Truyền thông tin người dùng và quyền hạn vào trang chủ
                return res.render("clients/home", { catalog: listcatalog, product: listproducts, username: username, rule: rule });
            })
        })
    }

    static getShop(req, res) {
        let keySearch = req.query.tukhoa;
        let sqlCatalog = "SELECT * FROM catalog";
        db.query(sqlCatalog, (err, listcatalog) => {
            let sqlProduct = 'SELECT * FROM products';
            db.query(sqlProduct, (err, listproducts) => {
                let sqlSearchProduct = `SELECT * FROM products WHERE nameProduct LIKE '%${keySearch}%' OR ISBN LIKE '%${keySearch}%' OR authorProduct LIKE '%${keySearch}%'`;
                db.query(sqlSearchProduct, (err, data) => {
                    let username = req.session.user ? req.session.user.username : null;
                    let rule = req.session.user ? req.session.user.rule : null;
                    // console.log(data);
                    res.render("clients/shop", { catalog: listcatalog, product: listproducts, productSearch: data, keySearch, username: username, rule: rule })
                })
            })
        })
    }

    static getCatalog(req, res) {
        let keySearch = req.query.tukhoa;
        let nameCategory = req.params.nameCategory;
        let sqlCatalog = "SELECT * FROM catalog";
        db.query(sqlCatalog, (err, listcatalog) => {
            // Truy vấn SQL để tìm idCategory từ tên category
            let sqlFindCategoryId = "SELECT idCategory FROM catalog WHERE nameCategory=?";
            db.query(sqlFindCategoryId, [nameCategory], (err, data) => {
                let idCategory = data[0].idCategory;
                // Truy vấn SQL để lấy các sản phẩm từ idCategory
                let sqlFindProducts = "SELECT * FROM products WHERE idCategory=?";
                db.query(sqlFindProducts, [idCategory], (err, listproducts) => {
                    let username = req.session.user ? req.session.user.username : null;
                    let rule = req.session.user ? req.session.user.rule : null;
                    res.render("clients/product-by-catalog", { catalog: listcatalog, product: listproducts, nameCategory, keySearch, username: username, rule: rule })
                })
            })
        })
    }

    static getDetail(req, res) {
        let id = req.params.id;
        let keySearch = req.query.tukhoa;
        let sqlCatalog = "SELECT * FROM catalog";
        let sqlProduct = 'SELECT * FROM products WHERE idProduct=?';
        db.query(sqlCatalog, (err, listcatalog) => {
            db.query(sqlProduct, [id], (err, listproducts) => {
                if (err) {
                    console.error("Lỗi khi truy vấn sản phẩm:", err);
                    return res.status(500).json({ message: 'Lỗi trong quá trình truy vấn sản phẩm.' });
                }
                let username = req.session.user ? req.session.user.username : null;
                let rule = req.session.user ? req.session.user.rule : null;
                let sqlCmtCount = "SELECT COUNT(*) AS totalComments FROM comments WHERE idProduct=?";
                db.query(sqlCmtCount, [id], (err, result) => {
                    if (err) {
                        console.error("Lỗi khi đếm số lượng bình luận:", err);
                        return res.status(500).json({ message: 'Lỗi trong quá trình đếm số lượng bình luận.' });
                    }
                    let totalComments = result[0].totalComments || 0;
                    let sqlCmt = "SELECT * FROM comments WHERE idProduct=?";
                    db.query(sqlCmt, [id], (err, data) => {
                        if (err) {
                            console.error("Lỗi khi truy vấn bình luận:", err);
                            return res.status(500).json({ message: 'Lỗi trong quá trình truy vấn bình luận.' });
                        }
                        res.render("clients/detail", {
                            catalog: listcatalog,
                            pro: listproducts[0],
                            comment: data,
                            keySearch,
                            username: username || null,
                            rule: rule || null,
                            totalComments: totalComments
                        });
                    });
                });
            });
        });
    }



    static postComment(req, res) {
        let { userName, content, idProduct } = req.body;
        let username = req.session.user ? req.session.user.username : null;
        let rule = req.session.user ? req.session.user.rule : null;
        const idUsers = req.session.user.id;
        // console.log(idUsers);

        // Kiểm tra xem người dùng đã gửi đánh giá cho cuốn sách này chưa
        const sqlCheckCmt = "SELECT * FROM comments WHERE (idUsers = ? OR userName = ?) AND idProduct = ?";
        db.query(sqlCheckCmt, [idUsers, userName, idProduct], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Lỗi trong quá trình kiểm tra đánh giá.' });
            }
            if (result.length > 0) {
                return res.status(400).json({ message: 'Bạn đã gửi đánh giá cho cuốn sách này rồi.' });
            }

            // Thêm đánh giá mới vào cơ sở dữ liệu
            let date = new Date;

            const sqlAddCmt = "INSERT INTO comments (idProduct, contents, dateComment, idUsers, userName) VALUES (?, ?, ?, ?, ?)";
            db.query(sqlAddCmt, [idProduct, content, date, idUsers, userName], (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: 'Lỗi trong quá trình thêm đánh giá.' });
                }
                res.redirect(`/detail/${idProduct}`)
            });
        });
    }

    static login(req, res) {
        res.render("clients/login", { errMessage: "" })
    }

    static register(req, res) {
        res.render("clients/register")
    }

    static getLogout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Lỗi hủy session", err)
            }
            res.redirect("/login")
        })

    }

    static postLogin(req, res, next) {
        let { username, password } = req.body;
        let sqlCheckUser = "SELECT * FROM users WHERE userName=? AND password=?";
        db.query(sqlCheckUser, [username, password], (err, data) => {
            if (err) {
                console.log("Lỗi truy vấn cơ sở dữ liệu:", err);
            }

            if (data.length === 0 || data[0].password !== password) {
                console.log("Tài khoản không tồn tại hoặc sai mật khẩu.");
                return res.render("clients/login", { errMessage: "Tài khoản không tồn tại hoặc sai mật khẩu." });
            }

            if (data[0].rule == 'admin') {
                let rule = data[0].rule;
                req.session.user = { username, rule, id: data[0].id }
                return res.redirect("admin/")
            }

            if (data.length > 0) {
                req.session.user = { username, id: data[0].id }
                res.redirect("/")
            }

        })
    }

    static postRegister(req, res) {
        let { username, email, password } = req.body;

        db.query("SELECT * FROM users WHERE email = ?", email, (err, data) => {
            if (err) {
                console.log(err);
                res.render("clients/register")
            }

            if (data.length == 0) {
                let objUser = {
                    userName: username,
                    password,
                    email
                }

                db.query("INSERT INTO users (userName, password, email) VALUES (?,?,?)",
                    [objUser.userName, objUser.password, objUser.email], (err, data) => {
                        // console.log(data);
                        if (err) {
                            console.log(err);
                        }

                        res.redirect("/login")
                    })
            } else {
                res.render("clients/register", { errMessage: "Email đã tồn tại. Vui lòng để email khác!!!" })
            }
        })
    }

}


module.exports = clientCtrl;