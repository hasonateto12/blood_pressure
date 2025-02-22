const express = require('express');
const router = express.Router();
module.exports = router;

const Measurements_Mid=require("../middleware/Measurements_Mid");

router.post('/',[Measurements_Mid.Addmeasurements], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok",Last_Id:req.insertId});
    } else {
        return res.status(500).json({message: err});
    }
});

router.get('/',[Measurements_Mid.Readmeasurements], (req, res) => { //Read - קבלת רשימה
    if(req.success){
        res.status(200).json({msg:"ok",data:req.measurements_data});
    } else {
        return res.status(500).json({message: err});
    }
});

router.put('/', [Measurements_Mid.Updatemeasurements], (req, res) => { //Update - עריכה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});

router.delete('/',[Measurements_Mid.Deletemeasurements], (req, res) => { // Delete - מחיקה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: err});
    }
});