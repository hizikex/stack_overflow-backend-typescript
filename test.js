const express = require("express");
const mongoose = require('mongoose')
const multer = require('multer');

const sampleSchema = mongoose.Schema({
    name: String,
    childrenImage: [String],
}, {timestamps: true})

const sampleModel = mongoose.model("sample", sampleSchema);

// multer config
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
})

// create a family
app.post('/family', upload.fields([{name: "childrenImage", maxCount: 5}]), async (req, res)=>{
    try{
        const {name} = req.body;
        const newFamily = new sampleModel({
            name: name,
            // childrenImage: req.files["childrenImage"][0].filename
            childrenImage: req.files.map((file)=>{
                file.filename
            })
        })
        const savedFamily = await newFamily.save();
        return res.status(201).json({
            message: "successfully created.",
            data: savedFamily
        })
    }catch(e){
        res.status(500).json({
            message: e.message
        })
    }
})