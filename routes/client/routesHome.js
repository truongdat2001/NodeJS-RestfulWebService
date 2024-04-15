import express from "express";
import clientCtrl from "../../controllers/clientController";
import checkAdmin from "../../middleware/checkAdmin"

const router = express.Router();

router.get("/", clientCtrl.getHomepage);

router.get("/shop", clientCtrl.getShop);

router.get("/catalog/:nameCategory", clientCtrl.getCatalog);

router.get("/detail/:id", clientCtrl.getDetail);

router.get("/login", clientCtrl.login, checkAdmin);

router.post("/user-login", clientCtrl.postLogin);

router.get("/register", clientCtrl.register);

router.post("/create-user", clientCtrl.postRegister);

router.post("/new-comment", clientCtrl.postComment);

router.get("/logout", clientCtrl.getLogout);

module.exports = router;