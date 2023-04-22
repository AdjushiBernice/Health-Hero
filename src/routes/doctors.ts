import express from 'express';
import { Login, logOut, signUp } from '../controller/doctors.controller';

// import{register,Login,
//     //getDoctorsAndPatient,
//     // getEachDoctor, 
//     // getPatientByDoctor, 
//     logOut} from "../controller/doctorController";
// import { auth } from '../middlewares/auth';
const router = express.Router();

// /* GET users listing. */
router.post('/signUp',signUp);
router.post("/login",Login)
router.get("/logout",logOut)

export default router;
