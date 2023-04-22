"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.getDoctors = exports.Login = exports.signUp = void 0;
const utils_1 = require("../utils/utils");
const utils_2 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const doctors_1 = __importDefault(require("../Model/doctors"));
const jwtsecret = process.env.JWT_SECRET;
const signUp = async (req, res, next) => {
    try {
        const { email, DoctorsName, password, confirm_password, phoneNumber, gender, specialization, } = req.body;
        const validationResult = utils_1.registerDoctorsSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render("signUp", {
                error: validationResult.error.details[0].message,
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 8);
        const user = await doctors_1.default.findOne({
            email,
        });
        if (!user) {
            let newDoctor = new doctors_1.default({
                email,
                DoctorsName,
                password: hashedPassword,
                phoneNumber,
                gender,
                specialization,
            });
            await newDoctor.save();
            return res.redirect("/");
        }
        res.render("signUp");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ Error: "Internal server error" });
    }
};
exports.signUp = signUp;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validationResult = utils_2.loginDoctorsSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .render("login", { error: validationResult.error.details[0].message });
        }
        const doctor = await doctors_1.default.findOne({
            email,
        });
        const validUser = await bcryptjs_1.default.compare(password, doctor?.password || "");
        if (!validUser) {
            return res.render("login");
        }
        const token = jsonwebtoken_1.default.sign({ doctorId: doctor?._id }, jwtsecret, {
            expiresIn: "3d",
        });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        res.redirect("/dashboard");
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.Login = Login;
const getDoctors = async (req, res, next) => {
    try {
        const doctors = await doctors_1.default.find();
        return res.render("doctors", {
            doctors
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.getDoctors = getDoctors;
const logOut = async (req, res, next) => {
    res.clearCookie("token");
    res.redirect("/");
};
exports.logOut = logOut;
