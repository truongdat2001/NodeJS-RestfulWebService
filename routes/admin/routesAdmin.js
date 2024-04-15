import express from "express";
import adminCtrl from "../../controllers/adminController";
import checkAdmin from "../../middleware/checkAdmin"
import multer from "multer";

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === "image/jpg" || //Kiểm tra image có phải dạng jpg
            file.mimetype === "image/jpeg" || //Kiểm tra image có phải dạng jpeg
            file.mimetype === "image/png") { //Kiểm tra image có phải dạng png
            cb(null, 'public/images/');
        } else {
            cb(new Error("not image"), false);
        }
    },
    filename: (req, file, cb) => {
        // cb(null, file.originalname); // Đây là câu lệnh lấy đúng tên image
        cb(null, Date.now() + ".png") //Đây là câu lệnh đổi lại tên image theo ngày hiện tại
    }
});

var upload = multer({ storage: storage })


const router = express.Router();

router.get("/", checkAdmin, adminCtrl.getHome);

router.get("/users", checkAdmin, adminCtrl.getListUsers);

router.get("/listproducts", checkAdmin, adminCtrl.getListProducts);

router.get("/newproduct", checkAdmin, adminCtrl.getNewProduct);

router.get("/listcatalog", checkAdmin, adminCtrl.getListCatalog);

router.get("/newcatalog", checkAdmin, adminCtrl.getNewCatalog);

router.post("/new-category", adminCtrl.postNewCatalog);

router.post("/create-product", checkAdmin, upload.single("image"), adminCtrl.postNewProduct);

router.get("/editcatalog/:id", checkAdmin, adminCtrl.getEditCatalog);

router.delete("/delete-cata", checkAdmin, adminCtrl.deleteCatalog);

router.put("/update-catalog", checkAdmin, adminCtrl.putUpdateCatalog);

router.get("/editproduct/:id", checkAdmin, adminCtrl.getEditProduct);

router.put("/update-product", checkAdmin, upload.single("image"), adminCtrl.putUpdateProduct);

router.delete("/delete-product", checkAdmin, adminCtrl.deleteProduct);

router.get("/logout", adminCtrl.Logout);

module.exports = router;