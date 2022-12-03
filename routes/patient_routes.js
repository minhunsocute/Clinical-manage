const express = require('express');
const patientRouter = express.Router();
const Patient = require('../models/patient');
const jwt = require("jsonwebtoken");

const { json, application } = require('express');
const auth = require("../middlewares/auth_data");
const e = require('express');
const JWT_SECRET = "asdfasdfadsfasdfqwerjfzxcv@#$#%@:::::"

patientRouter.post('/api/addPatient/', async (req, res) => {
    try {
        console.log('calling addPatient Route');
        const { name,
            address,
            gender,
            dob,
            phoneNumber,
            avt,
            status } = req.body;

        let patient = new Patient({
            name,
            address,
            gender,
            dob,
            phoneNumber,
            avt,
            status
        });

        let checkPatientExisting = await Patient.find({ name: name, address: address });

        if (!checkPatientExisting) {
            return res.status(404).json({ msg: "Patient existed" });
        }

        patient = await patient.save();
        res.json({ id: patient._id, ...patient._doc });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


patientRouter.post('/api/deletePatient/', async (req, res) => {
    try {
        console.log('calling deletePatient Route');
        const { patientId } = req.body;

        console.log(patientId);
        let patient = await Patient.findByIdAndRemove(patientId);
        console.log('here');
        if (!patient) {
            return res.status(404).json({isSuccess: false, msg: "Can not found patient " });
        }

        console.log(patient);

        res.json({ isSuccess: true, patient: { id: patient._id, ...patient._doc } });

    } catch (error) {
        res.status(500).json({isSuccess: false, error: error.message });
    }
});

patientRouter.get('/api/getAllPatient/', async (req, res) => {
    try {
        console.log('calling getAllPatient Route');

        let patients = await Patient.find();

        if (!patients) {
            return res.status(404).json({ isSuccess: false, msg: "List Patients Empty" });
        }

        res.json({ isSuccess: true, patients });
    } catch (error) {
        res.status(500).json({ isSuccess: false, error: error.message });
    }
});

module.exports = { patientRouter };