"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doctors_1 = __importDefault(require("../../Model/doctors"));
const testUtils_1 = require("./testUtils");
const globals_1 = require("@jest/globals");
const node_test_1 = require("node:test");
const globals_2 = require("@jest/globals");
const report_1 = __importDefault(require("../../Model/report"));
// import {
//   validateNotEmpty,
//   validateStringEquality,
//   validateMongoDuplicationError,
// } from "./validator";
(0, globals_1.beforeAll)(async () => await (0, testUtils_1.dbConnect)());
(0, globals_1.afterAll)(async () => await (0, testUtils_1.dbDisconnect)());
(0, node_test_1.afterEach)(async (done) => {
    await (0, testUtils_1.dbDropCollection)();
    done();
});
(0, globals_1.describe)("Doctor Model Test Suite", () => {
    (0, globals_1.test)("should create a Doctor data successfully", async () => {
        const DoctorData = {
            email: "tolu@gmail.com",
            DoctorsName: "Tolu",
            password: "hfuska",
            phoneNumber: "0132567",
            gender: "male",
            specialization: "nurse",
        };
        const newDoctorData = new doctors_1.default({
            DoctorData,
        });
        await newDoctorData.save();
        (0, globals_2.expect)(newDoctorData._id).toBeDefined();
        (0, globals_2.expect)(newDoctorData.email).toBe(DoctorData.email);
        (0, globals_2.expect)(newDoctorData.DoctorsName).toBe(DoctorData.DoctorsName);
        (0, globals_2.expect)(newDoctorData.password).toBe(DoctorData.password);
        (0, globals_2.expect)(newDoctorData.gender).toBe(DoctorData.gender);
        (0, globals_2.expect)(newDoctorData.specialization).toBe(DoctorData.specialization);
    });
    (0, globals_1.test)("should fail for Doctor data without required fields", async () => {
        const invalidDoctorData = {
            email: "tolu@gmail.com",
            password: "hfuska",
            phoneNumber: "0132567",
            gender: "male",
            specialization: "nurse",
        };
        try {
            const newDoctorData = new doctors_1.default({
                invalidDoctorData,
            });
            await newDoctorData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.DoctorsName).toBeDefined();
        }
    });
    (0, globals_1.test)("should fail for Doctor data without required fields", async () => {
        const invalidDoctorData = {
            DoctorsName: "Tolu",
            email: "tolugmail.com",
            password: "hfuska",
            phoneNumber: "0132567",
            gender: "male",
            specialization: "nurse",
        };
        try {
            const newDoctorData = new doctors_1.default({
                invalidDoctorData,
            });
            await newDoctorData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.email).toBeDefined();
        }
    });
});
(0, globals_1.describe)("Patient Model Test Suite", () => {
    (0, globals_1.test)("should create a Patient data successfully", async () => {
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
        const newPatientData = new report_1.default({
            PatientData,
        });
        await newPatientData.save();
        (0, globals_2.expect)(newPatientData._id).toBeDefined();
        (0, globals_2.expect)(newPatientData.doctorId).toBe(PatientData.doctorId);
        (0, globals_2.expect)(newPatientData.patientName).toBe(PatientData.patientName);
        (0, globals_2.expect)(newPatientData.age).toBe(PatientData.age);
        (0, globals_2.expect)(newPatientData.weight).toBe(PatientData.weight);
        (0, globals_2.expect)(newPatientData.height).toBe(PatientData.height);
        (0, globals_2.expect)(newPatientData.genotype).toBe(PatientData.genotype);
        (0, globals_2.expect)(newPatientData.bloodGroup).toBe(PatientData.bloodGroup);
        (0, globals_2.expect)(newPatientData.bloodPressure).toBe(PatientData.bloodPressure);
        (0, globals_2.expect)(newPatientData.HIV_status).toBe(PatientData.HIV_status);
        (0, globals_2.expect)(newPatientData.hepatitis).toBe(PatientData.hepatitis);
    });
    (0, globals_1.test)("should fail for Patient data without required fields", async () => {
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
            const newPatientData = new report_1.default({
                invalidPatientData,
            });
            await newPatientData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.doctorId).toBeDefined();
        }
    });
});
