import express, { Request, Response, NextFunction } from "express";
import { registerDoctorsSchema, options } from "../utils/utils";
import { loginDoctorsSchema } from "../utils/utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../Model/doctors";

const jwtsecret = process.env.JWT_SECRET as string;

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      DoctorsName,
      password,
      confirm_password,
      phoneNumber,
      gender,
      specialization,
    } = req.body;

    const validationResult = registerDoctorsSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.render("signUp", {
        error: validationResult.error.details[0].message,
      });
          }
    

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await Doctor.findOne({
      email,
    });

    if (!user) {
      let newDoctor = new Doctor({
        email,
        DoctorsName,
        password:hashedPassword,
        phoneNumber,
        gender,
        specialization,
      });

      await newDoctor.save();

      return res.redirect("/")
    }
    res.render("signUp")
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal server error" });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const validationResult = loginDoctorsSchema.validate(req.body, options);
    if (validationResult.error) {
      return res
      .render("login",{ error: validationResult.error.details[0].message });
    }

    const doctor = await Doctor.findOne({
      email,
    });

    const validUser = await bcrypt.compare(password, doctor?.password || "");
    if (!validUser) {
      return res.render("login")
    }
    const token = jwt.sign({ doctorId: doctor?._id }, jwtsecret, {
      expiresIn: "3d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3* 24 * 60 * 60 * 1000,
    });
    res.redirect("/dashboard")
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getDoctors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctors = await Doctor.find();

    return res.render("doctors", {
     doctors
    });
  } catch (err) {
    console.log(err);
  }
};


export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.clearCookie("token");
  res.redirect("/");
};
