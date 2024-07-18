"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post('/regist', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(req.body);
    yield prisma.users.create({
        data: {
            username: username,
            password: password
        }
    });
    res.json({
        "result": "success"
    });
}));
router.get("/registUser", (req, res) => {
    const filePath = path_1.default.join(__dirname, "regist.html");
    res.sendFile(filePath);
});
router.post('/loginProc', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const User = yield prisma.users.findFirst({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    });
    if (User) {
        res.json({
            "result": "success",
            "username": User.username,
            "password": User.password
        });
    }
    else {
        res.json({
            "result": "fail"
        });
    }
}));
router.get("/", (req, res) => {
    const filePath = path_1.default.join(__dirname, "login.html");
    res.sendFile(filePath);
});
exports.default = router;
