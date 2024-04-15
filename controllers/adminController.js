import db from "../models/database/db";

class adminCtrl {
    static getHome(req, res) {
        const username = req.session.user.username;
        res.render("admin/home", { username })
    }

    static getListUsers(req, res) {
        let sql = "SELECT * FROM users";
        const username = req.session.user.username;
        db.query(sql, (err, data) => {
            if (err) throw err;
            res.render("admin/users", { listUser: data, username })
        })
    }

    static getListProducts(req, res) {
        const username = req.session.user.username;
        let sql = "SELECT * FROM products";
        db.query(sql, (err, data) => {
            if (err) throw err;
            res.render("admin/listproducts", { listProducts: data, username })
        })
    }

    static getNewProduct(req, res) {
        const username = req.session.user.username;
        let sql = "SELECT * FROM catalog";
        db.query(sql, (err, data) => {
            res.render("admin/newproduct", { listCatalog: data, username })
        })
    }

    static postNewProduct(req, res) {
        let { nameProduct, description, dateProduct, authorProduct, isbn, publishingYear, numberOfPage, catalog } = req.body;
        let image = "images/" + req.file.filename;
        if (!image) {
            const err = new Error("Please upload a file");
            return next(err);
        }
        let newProduct = {
            nameProduct,
            description,
            dateProduct,
            authorProduct,
            ISBN: isbn,
            publishingYear,
            numberOfPage,
            images: image,
            idCategory: catalog
        }
        db.query("INSERT INTO products SET ?", newProduct, (err, data) => {
            if (err) throw err;
            res.redirect("/admin/listproducts")
        })
    }

    static getListCatalog(req, res) {
        const username = req.session.user.username;
        let sql = "SELECT * FROM catalog";
        db.query(sql, (err, data) => {
            if (err) throw err;
            res.render("admin/listcatalog", { listCatalog: data, username })
        })
    }

    static getNewCatalog(req, res) {
        const username = req.session.user.username;
        res.render("admin/newcatalog", { username })
    }

    static postNewCatalog(req, res) {
        const username = req.session.user.username;
        let { nameCategory, dateCategory } = req.body;
        if (nameCategory == "") {
            res.render("admin/newcatalog", { errMessage: "Không được để trống!!", username })
        } else {
            // console.log(req.body);
            let sql = "INSERT INTO catalog (nameCategory, dateCategory) VALUES (?,?)";
            db.query(sql, [nameCategory, dateCategory], (err, data) => {
                res.redirect("/admin/listcatalog");
            })
        }
    }

    static getEditCatalog(req, res) {
        const username = req.session.user.username;
        let id = req.params.id;
        db.query("SELECT * FROM catalog WHERE idCategory=?", id, (err, data) => {
            res.render("admin/editcatalog", { cata: data, username })
        })
    }

    static putUpdateCatalog(req, res) {
        let { nameCategory, dateCategory, id } = req.body;
        let sql = "UPDATE catalog SET nameCategory=?, dateCategory=? WHERE idCategory=?";
        db.query(sql, [nameCategory, dateCategory, id], (err, data) => {
            res.redirect("/admin/listcatalog");
        })
    }

    static deleteCatalog(req, res) {
        let id = req.body.id;
        let sql = "DELETE FROM catalog WHERE idCategory=?";
        // console.log(req.body);
        db.query(sql, [id], (err, data) => {
            if (err) throw err;
            res.redirect("/admin/listcatalog");
        })
    }

    static getEditProduct(req, res) {
        const username = req.session.user.username;
        let id = req.params.id;
        db.query("SELECT * FROM products WHERE idProduct=?", id, (err, data) => {
            let sql = "SELECT * FROM catalog";
            db.query(sql, (err, listCatalog) => {
                res.render("admin/editproduct", { product: data, listCatalog: listCatalog, username })
            })
        })
    }

    static putUpdateProduct(req, res) {
        let { nameProduct, description, dateProduct, authorProduct, isbn, publishingYear, numberOfPage, catalog, id } = req.body;
        let image = "images/" + req.file.filename;
        if (!image) {
            const err = new Error("Please upload a file");
            return next(err);
        }
        let sql = "UPDATE products SET nameProduct=?, description=?, dateProduct=?, authorProduct=?, images=?, ISBN=?, publishingYear=?, numberOfPage=?, idCategory=? WHERE idProduct=?";
        db.query(sql, [nameProduct, description, dateProduct, authorProduct, image, isbn, publishingYear, numberOfPage, catalog, id], (err, data) => {
            res.redirect("/admin/listproducts");
        })
    }

    static deleteProduct(req, res) {
        let id = req.body.id;
        let sql = "DELETE FROM products WHERE idProduct=?";
        db.query(sql, id, (err, data) => {
            if (err) throw err;
            res.redirect("/admin/listProducts");
        })
    }

    static Logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                console.log("Lỗi hủy session", err)
            }
            res.redirect("/login")
        })
    }
}

module.exports = adminCtrl;