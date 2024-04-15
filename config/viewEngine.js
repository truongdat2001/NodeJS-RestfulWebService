import express from "express";

const configViewEngine = (app) => {
    app.set("view engine", "ejs");
    app.set("views", "./views");

    app.use(express.static("public"));
    app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
    app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
}

module.exports = configViewEngine;