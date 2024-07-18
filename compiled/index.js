"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const loginRouter_1 = __importDefault(require("./loginRouter"));
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 8080);
app.set('host', process.env.HOST || "127.0.0.1");
app.use(express_1.default.json());
app.get("/", (req, res) => {
    const filePath = path_1.default.join(__dirname, "index.html");
    res.sendFile(filePath);
});
app.use("/login", loginRouter_1.default);
app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server is running : http://${app.get('host')}:${app.get('port')}`);
});
