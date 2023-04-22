"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const doctors_controller_1 = require("../controller/doctors.controller");
// import{register,Login,
//     //getDoctorsAndPatient,
//     // getEachDoctor, 
//     // getPatientByDoctor, 
//     logOut} from "../controller/doctorController";
// import { auth } from '../middlewares/auth';
const router = express_1.default.Router();
// /* GET users listing. */
router.post('/signUp', doctors_controller_1.signUp);
router.post("/login", doctors_controller_1.Login);
router.get("/logout", doctors_controller_1.logOut);
exports.default = router;
