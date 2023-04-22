import Doctor from "../../Model/doctors";
import { dbConnect, dbDisconnect, dbDropCollection } from "./testUtils";
import { describe, test, beforeAll, afterAll } from "@jest/globals";
import { afterEach } from "node:test";
import { expect } from "@jest/globals";
import mongoose from "mongoose";
import Patient from "../../Model/report";

// import {
//   validateNotEmpty,
//   validateStringEquality,
//   validateMongoDuplicationError,
// } from "./validator";

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());
afterEach(async (done) => {
  await dbDropCollection();
  done();
});

describe("Doctor Model Test Suite", () => {
  test("should create a Doctor data successfully", async () => {
    const DoctorData = {
      email: "tolu@gmail.com",
      DoctorsName: "Tolu",
      password: "hfuska",
      phoneNumber: "0132567",
      gender: "male",
      specialization: "nurse",
    };

    const newDoctorData = new Doctor({
      DoctorData,
    });
    await newDoctorData.save();
    expect(newDoctorData._id).toBeDefined();
    expect(newDoctorData.email).toBe(DoctorData.email);
    expect(newDoctorData.DoctorsName).toBe(DoctorData.DoctorsName);
    expect(newDoctorData.password).toBe(DoctorData.password);
    expect(newDoctorData.gender).toBe(DoctorData.gender);
    expect(newDoctorData.specialization).toBe(DoctorData.specialization);
  });
  test("should fail for Doctor data without required fields", async () => {
    const invalidDoctorData = {
      email: "tolu@gmail.com",
      password: "hfuska",
      phoneNumber: "0132567",
      gender: "male",
      specialization: "nurse",
    };

    try {
      const newDoctorData = new Doctor({
        invalidDoctorData,
      });
      await newDoctorData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors.DoctorsName).toBeDefined();
    }
  });
  test("should fail for Doctor data without required fields", async () => {
    const invalidDoctorData = {
      DoctorsName: "Tolu",
      email: "tolugmail.com",
      password: "hfuska",
      phoneNumber: "0132567",
      gender: "male",
      specialization: "nurse",
    };

    try {
      const newDoctorData = new Doctor({
        invalidDoctorData,
      });
      await newDoctorData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors.email).toBeDefined();
    }
  });
});

describe("Patient Model Test Suite", () => {
  test("should create a Patient data successfully", async () => {
    const PatientData = {
      doctorId: "1234567jvgkjfkfh",
      patientName: "Tayo",
      age: 12,
      weight: "34kg",
      height: "2m",
      bloodGroup: "o+",
      genotype: "AS",
      bloodPressure: "123",
      HIV_status: "positive",
      hepatitis: "b+",
    };

    const newPatientData = new Patient({
      PatientData,
    });
    await newPatientData.save();
    expect(newPatientData._id).toBeDefined();
    expect(newPatientData.doctorId).toBe(PatientData.doctorId);
    expect(newPatientData.patientName).toBe(PatientData.patientName);
    expect(newPatientData.age).toBe(PatientData.age);
    expect(newPatientData.weight).toBe(PatientData.weight);
    expect(newPatientData.height).toBe(PatientData.height);
    expect(newPatientData.genotype).toBe(PatientData.genotype);
    expect(newPatientData.bloodGroup).toBe(PatientData.bloodGroup);
    expect(newPatientData.bloodPressure).toBe(PatientData.bloodPressure);
    expect(newPatientData.HIV_status).toBe(PatientData.HIV_status);
    expect(newPatientData.hepatitis).toBe(PatientData.hepatitis);
  });
  test("should fail for Patient data without required fields", async () => {
    const invalidPatientData = {
      patientName: "Tayo",
      age: 12,
      weight: "34kg",
      height: "2m",
      bloodGroup: "o+",
      genotype: "AS",
      bloodPressure: "123",
      HIV_status: "positive",
      hepatitis: "b+",
    };

    try {
      const newPatientData = new Patient({
        invalidPatientData,
      });
      await newPatientData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors.doctorId).toBeDefined();
    }
  });
});
