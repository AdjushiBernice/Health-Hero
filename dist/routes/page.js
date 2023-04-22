"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctors_controller_1 = require("../controller/doctors.controller");
const reports_controller_1 = require("../controller/reports.controller");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get("/", (req, res, next) => {
    res.render("login");
});
router.get("/signUp", (req, res, next) => {
    res.render("signUp");
});
router.get("/dashboard", auth_1.auth, async (req, res) => {
    try {
        return res.render("dashboard", {
            doctor: res.locals.user,
        });
    }
    catch (err) {
        console.log(err);
    }
});
router.get("/patients", auth_1.auth, reports_controller_1.getMyPatient);
router.get("/allPatients", auth_1.auth, reports_controller_1.getAllPatient);
router.get("/createPatient", auth_1.auth, (req, res, next) => {
    res.render("createPatient");
});
router.get("/allDoctors", auth_1.auth, doctors_controller_1.getDoctors);
exports.default = router;
