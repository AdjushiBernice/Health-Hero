import express, { Request, Response, NextFunction } from "express";
import { getDoctors } from "../controller/doctors.controller";
import { getAllPatient, getMyPatient } from "../controller/reports.controller";

import { auth } from "../middlewares/auth";
import Doctor from "../Model/doctors";
import Patient from "../Model/report";

import { updatePatientSchema, options } from "../utils/utils";

const router = express.Router();


router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("login");
});
router.get("/signUp", (req: Request, res: Response, next: NextFunction) => {
  res.render("signUp");
});

router.get("/dashboard", auth, async (req: Request | any, res: Response) => {
  try {
   

    return res.render("dashboard", {
      doctor: res.locals.user,

    });
  } catch (err) {
    console.log(err);
  }
});
router.get("/patients",auth, getMyPatient)
router.get("/allPatients",auth, getAllPatient)
router.get("/createPatient",auth,(req: Request, res: Response, next: NextFunction) => {
    res.render("createPatient");
  })
router.get("/allDoctors",auth,getDoctors)


export default router;
