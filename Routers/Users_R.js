const express = require('express');
const router = express.Router();
const Users_Mid = require("../middleware/Users_Mid");
const Measurements_Mid = require("../Middleware/Measurements_Mid");

// POST request to add users
router.post('/', [Users_Mid.Addusers], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", Last_Id: req.insertId });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});

// GET request to read users
router.get('/', [Users_Mid.Readusers], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", data: req.users_data });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});

// PUT request to update user
router.put('/', [Users_Mid.Updateusers], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});

r
router.delete('/', [Users_Mid.Deleteusers], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});


router.get('/userData', [Users_Mid.GetUserMonthStats], (req, res) => {
    const { user_id, month } = req.query;

    if (!user_id || !month) {
        return res.status(400).json({ error: "Missing user_id or month" });
    }

    if (req.success) {
        res.status(200).json({ msg: "ok", data: req.user_measurements });
    } else {
        console.error("Error fetching user measurements:", req.error);
        res.status(500).json({ message: req.error || "Unknown error" });
    }
});


module.exports = router;
