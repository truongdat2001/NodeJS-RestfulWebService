import express from "express";

import apiCtrl from "../../controllers/apiController";

const router = express.Router();

router.get("/users", apiCtrl.getApiUsersAll);

router.get("/products", apiCtrl.getApiProducts);

router.get("/product/:id", apiCtrl.getApiDetail);

router.get("/catalog", apiCtrl.getApiCatalog);

router.get("/comments", apiCtrl.getApiComments);

router.get("/isbn/:isbn", apiCtrl.getISBN);

router.post("/login", apiCtrl.postApiLogin);

router.post("/register", apiCtrl.postApiRegister);

router.post("/new_product", apiCtrl.postApiNewProduct);

router.post("/new_catalog", apiCtrl.postApiNewCatalog);

router.put("/update_catalog", apiCtrl.putApiUpdateCatalog);

router.put("/update_product", apiCtrl.putApiUpdateProduct);

router.delete("/delete_catalog/:id", apiCtrl.deleteApiDeleteCatalog);

router.delete("/delete_product/:id", apiCtrl.deleteApiDeleteProduct);

module.exports = router;