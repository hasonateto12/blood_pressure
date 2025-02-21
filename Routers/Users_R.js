const express = require('express');
const router = express.Router();
module.exports = router;

const Users_Mid=require("../middleware/Users_Mid");

router.post('/',[Users_Mid.Addusers], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok",Last_Id:req.insertId});
    } else {
        return res.status(500).json({message: err});
    }
});

router.get('/',[Users_Mid.Readusers], (req, res) => { //Read - קבלת רשימה
    if(req.success){
        res.status(200).json({msg:"ok",data:req.users_data});
    } else {
        return res.status(500).json({message: err});
    }
});

router.put('/', [Users_Mid.Updateusers], (req, res) => { //Update - עריכה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});

router.delete('/',[Users_Mid.Deleteusers], (req, res) => { // Delete - מחיקה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});