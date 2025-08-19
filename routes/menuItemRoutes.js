const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

router.post('/', async(req,res)=>{
    try{
        const data = req.body; 
            const newMenu = new MenuItem(data);

        // save the new Menu to the DB
        const response = await newMenu.save();
        console.log('Data Saved Successfully');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/', async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Data Fetched Successfully');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// commented
module.exports = router;