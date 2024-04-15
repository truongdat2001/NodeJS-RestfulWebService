import express from "express";
import mysql from "mysql2";
import bodyparser from "body-parser";
import session from "express-session";
import method_override from "method-override";
import configViewEngine from "./config/viewEngine";
import clientRouter from "./routes/client/routesHome";
import adminRouter from "./routes/admin/routesAdmin";
import apiRouter from "./routes/API/apiRouter"

const app = express();
const port = 3000;

//dùng bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//dùng method_override
app.use(method_override("_method"));

//dùng session
app.use(session({
    secret: "secret-key", //Chuỗi bí mật dùng để mã hóa cookie session.

    resave: false, //xác định liệu session sẽ được lưu lại mỗi khi có sự thay đổi hay không, 
    //đặt giá trị là false thường là tốt để tránh việc lưu session 1 cách không cần thiết.

    saveUninitialized: true //Xác định liệu session sẽ được lưu lại nếu nó không được thay đổi hay không. 
    //Đặt giá trị là true có thể hữu ích để lưu session cho người dùng mới mà chưa có dữ liệu session nào.

}))

//sử dụng config
configViewEngine(app);

app.use("/", clientRouter)

app.use("/admin/", adminRouter)

app.use("/api/v1/", apiRouter)

app.use((req, res) => {
    res.render("404")
})

app.listen(port, () => {
    console.log(`Server running port: http://localhost:${port}`);
})