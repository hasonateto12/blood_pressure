const express = require('express');
const router = express.Router();
const Measurements_Mid = require("../middleware/Measurements_Mid");

// Add measurement (POST)
router.post('/', [Measurements_Mid.Addmeasurements], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", Last_Id: req.insertId });
    } else {
        console.error("Error adding measurement:", req.error);
        res.status(500).json({ message: req.error || "Unknown error" });
    }
});

// Get all measurements (GET)
router.get('/', [Measurements_Mid.Readmeasurements], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", data: req.measurements_data });
    } else {
        console.error("Error fetching measurements:", req.error);
        res.status(500).json({ message: req.error || "Unknown error" });
    }
});

// Update measurement (PUT)
router.put('/:id', [Measurements_Mid.Updatemeasurements], (req, res) => {
    console.log("Received PUT request for ID:", req.params.id);
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        console.error("Error updating measurement:", req.error);
        res.status(500).json({ message: req.error || "Unknown error" });
    }
});

// Delete measurement (DELETE)
router.delete('/:id', [Measurements_Mid.Deletemeasurements], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        console.error("Error deleting measurement:", req.error);
        res.status(500).json({ message: req.error || "Unknown error" });
    }
});

module.exports = router;