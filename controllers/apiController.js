import db from "../models/database/db";

class apiCtrl {
    static getApiUsersAll(req, res) {
        let sql = "SELECT * FROM users";
        db.query(sql, (err, data) => {
            if (!data || data.length === 0) {
                return res.status(404).json({
                    message: "Không có dữ liệu"
                })
            } else {
                return res.status(200).json({
                    users: data
                })
            }
        })
    }

    static getApiProducts(req, res) {
        let sql = "SELECT * FROM products";
        db.query(sql, (err, data) => {
            if (!data || data.length === 0) {
                return res.status(404).json({
                    message: "Không có dữ liệu"
                })
            } else {
                return res.status(200).json({
                    products: data
                })
            }
        })
    }

    static getApiCatalog(req, res) {
        let sql = "SELECT * FROM catalog";
        db.query(sql, (err, data) => {
            if (!data || data.length === 0) {
                return res.status(404).json({
                    message: "Không có dữ liệu"
                })
            } else {
                return res.status(200).json({
                    catalog: data
                })
            }
        })
    }

    static getApiComments(req, res) {
        let sql = "SELECT * FROM commets";
        db.query(sql, (err, data) => {
            if (!data || data.length === 0) {
                return res.status(404).json({
                    message: "Không có dữ liệu"
                })
            } else {
                return res.status(200).json({
                    comment: data
                })
            }
        })
    }

    static getApiDetail(req, res) {
        let id = req.params.id;
        let sqlProduct = 'SELECT * FROM products WHERE idProduct=?';
        db.query(sqlProduct, [id], (err, data) => {
            if (!data || data.length === 0) {
                return res.status(404).json({
                    message: "Không có dữ liệu"
                })
            } else {
                return res.status(200).json({
                    comment: data
                })
            }
        })
    }

    static getISBN(req, res) {
        let isbn = req.params.isbn;
        let sql = "SELECT * FROM products WHERE ISBN=?";
        db.query(sql, [isbn], (err, data) => {
            if (!data || data.length === 0) {
                return res.status(404).json({
                    message: "ISBN không tồn tại"
                })
            } else {
                return res.status(200).json({
                    data
                })
            }
        })
    }

    static postApiLogin(req, res) {
        let { username, password } = req.body;

        if (!username || !password) {
            return res.status(200).json({
                message: "Thiếu các thông số bắt buộc!!"
            })
        }

        let sqlCheckUser = "SELECT * FROM users WHERE userName=? AND password=?";
        db.query(sqlCheckUser, [username, password], (err, data) => {
            if (data.length === 0 || data[0].password !== password) {
                return res.status(200).json({
                    errMessage: "Tài khoản không tồn tại hoặc sai mật khẩu."
                });
            } else {
                return res.status(200).json({
                    message: "Đăng nhập thành công!!"
                })
            }
        })
    }

    static postApiRegister(req, res) {
        let { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(200).json({
                message: "Thiếu các thông số bắt buộc!!"
            })
        }

        db.query("SELECT * FROM users WHERE email = ?", email, (err, data) => {
            if (data.length > 0) {
                return res.status(200).json({
                    message: "Email đã tồn tại!!"
                })
            } else {
                db.query("INSERT INTO users (userName, password, email) VALUES (?,?,?)",
                    [username, password, email], (err, data) => {
                        return res.status(200).json({
                            message: "Đăng ký tài khoản thành công."
                        })
                    })
            }
        })
    }

    static postApiNewCatalog(req, res) {
        let { nameCategory, dateCategory } = req.body;
        if (!nameCategory || !dateCategory) {
            return res.status(200).json({
                errMessage: "Thiếu các thông số bắt buộc!!"
            })
        }

        let sql = "INSERT INTO catalog (nameCategory, dateCategory) VALUES (?,?)";
        db.query(sql, [nameCategory, dateCategory], (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Lỗi truy vấn!"
                })
            }
            return res.status(200).json({
                message: "Thêm thành công!!!"
            })
        })
    }

    static putApiUpdateCatalog(req, res) {
        let { nameCategory, dateCategory, id } = req.body;
        let sql = "UPDATE catalog SET nameCategory=?, dateCategory=? WHERE idCategory=?";
        db.query(sql, [nameCategory, dateCategory, id], (err, data) => {
            if (!nameCategory || !dateCategory || !id) {
                return res.status(200).json({
                    message: "Thiếu các trường bắt buộc!!"
                })
            }

            if (err) {
                return res.status(400).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json({
                message: "Cập nhật thành công!!!"
            })
        })
    }

    static postApiNewProduct(req, res) {
        let { nameProduct, description, dateProduct, authorProduct, image, isbn, publishingYear, numberOfPage, catalog } = req.body;

        if (!nameProduct || !description || !dateProduct || !authorProduct || !image || !isbn || !publishingYear || !numberOfPage || !catalog) {
            return res.status(200).json({
                errMessage: "Thiếu các thông số bắt buộc!!"
            })
        }

        db.query("INSERT INTO products SET ?", { nameProduct, description, dateProduct, authorProduct, images: image, ISBN: isbn, publishingYear, numberOfPage, idCategory: catalog }, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Lỗi truy vấn"
                })
            }
            return res.status(200).json({
                message: "Thêm thành công!!!"
            })
        })
    }

    static putApiUpdateProduct(req, res) {
        let { nameProduct, description, dateProduct, authorProduct, image, isbn, publishingYear, numberOfPage, catalog, id } = req.body;

        if (!nameProduct || !description || !dateProduct || !authorProduct || !image || !isbn || !publishingYear || !numberOfPage || !catalog || !id) {
            return res.status(200).json({
                errMessage: "Thiếu các thông số bắt buộc!!"
            })
        }

        let sql = "UPDATE products SET nameProduct=?, description=?, dateProduct=?, authorProduct=?, images=?, ISBN=?, publishingYear=?, numberOfPage=?, idCategory=? WHERE idProduct=?";
        db.query(sql, [nameProduct, description, dateProduct, authorProduct, image, isbn, publishingYear, numberOfPage, catalog, id], (err, data) => {
            return res.status(200).json({
                message: "Cập nhật thành công!!!"
            })
        })
    }


    static deleteApiDeleteCatalog(req, res) {
        let id = req.params.id;
        let sql = "DELETE FROM catalog WHERE idCategory=?";
        db.query(sql, [id], (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Lỗi truy vấn"
                })
            };
            return res.status(200).json({
                message: "Xóa thành công!!"
            })
        })
    }

    static deleteApiDeleteProduct(req, res) {
        let id = req.params.id;
        let sql = "DELETE FROM products WHERE idProduct=?";
        db.query(sql, id, (err, data) => {
            if (err) {
                return res.status(400).json({
                    message: "Lỗi truy vấn"
                })
            };
            return res.status(200).json({
                message: "Xóa thành công!!"
            })
        })
    }
}

module.exports = apiCtrl;