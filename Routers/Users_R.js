const express = require('express');
const router = express.Router();
const Users_Mid = require("../middleware/Users_Mid");

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

// DELETE request to delete user
router.delete('/', [Users_Mid.Deleteusers], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});



router.get('/stats/:userId/:month', [Users_Mid.GetUserMonthStats], (req, res) => {
    if (req.success) {
        res.status(200).json({
            msg: "ok",
            data: req.userStats, // Return the user stats to the frontend
        });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});



module.exports = router;
