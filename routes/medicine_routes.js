const express = require('express');
const Medicine = require('../models/medicine');
const bcrypt = require("bcryptjs");
const medicineRouter = express.Router();
const jwt = require("jsonwebtoken");
const { json } = require('express');
const admin = require("../middlewares/admin_data");
const e = require('express');

medicineRouter.get('/api/medicine/get_all', async(req, res) => {
    try {
        console.log("Get all medicine  is called");
        const medicines = await Medicine.find();
        res.json(medicines);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

medicineRouter.post('/api/medicine/insert_medicine', async(req, res) => {
    try {
        console.log("Insert Medicine is called");
        const { name, thumbnails, price, cost, type, description, unit, amount } = req.body;
        let medicine = new Medicine({
            name,
            thumbnails,
            price,
            cost,
            type,
            description,
            unit,
            amount
        });
        medicine = await medicine.save();
        res.json(medicine);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


medicineRouter.post('/api/medicine/edit_medicine', async(req, res) => {
    try {
        console.log("Edit medicine is called");
        const { name, thumbnails, price, type, description, id } = req.body;
        let medicine = await Medicine.findById(id);
        medicine.name = name;
        medicine.thumbnails = thumbnails;
        medicine.price = price;
        medicine.type = type;
        medicine.description = description;
        medicine = await medicine.save();
        res.json(medicine);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

medicineRouter.post('/api/medicine/update_amount', async(req, res) => {
    try {
        console.log("Update amount is called");
        const { id, amount } = req.body;
        let med = await Medicine.findById(id);
        // const meed  =  await Medicine.findOneAndUpdate({});
        med.amount += amount;
        med = await med.save();
        res.json(med);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

medicineRouter.post('/api/medicine/delete_medicine', async(req, res) => {
    try {
        console.log("Delete medicine is called");
        const { id } = req.body;
        let med = await Medicine.findByIdAndDelete(id);
        res.json(med);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

medicineRouter.get('/api/medicine/search/:name', async(req, res) => {
    try {
        console.log("Search medicine function is called");
        let medicines;
        medicines = await Medicine.find({
            name: { $regex: req.params.name, $options: "i" },
        });
        res.json(medicines);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

medicineRouter.get('/api/medicine/selectFollowType/:type', async(req, res) => {
    try {
        console.log("Select  follow type function is called");
        const medicines = await Medicine.find({
            type: req.params.type,
        });
        res.json(medicines);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = medicineRouter;