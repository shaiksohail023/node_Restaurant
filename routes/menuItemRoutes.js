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

//parameterized call
router.get('/:taste', async(req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste == 'spicy' || taste == 'sweet' || taste == 'sour'){
            const response = await Person.find({taste:taste});
            console.log('Data Fetched Successfully');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid Taste'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//update person
router.put('/:id', async(req,res)=>{
    try{
        const menuId = req.params.id; //Extract the id from URL Parameter
        const updatedMenuItemData = req.body;

        const response = await Person.findByIdAndUpdate(menuId,updatedMenuItemData, {
            new: true, //return updated document
            runValidators: true //Run mongoose validation
        })

        //if the id is not present in person table then it will go in these 
        // if condition
        if(!response){
            return res.status(400).json({error: 'Menu Item not found'});
        }

        console.log('data Updated Successfully');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.delete('/:id', async(req,res)=>{
    try{
        const menuId = req.params.id; //Extract the id from URL Parameter
        const response = await Person.findByIdAndDelete(menuId);

        if(!response){
            return res.status(400).json({error: 'MenuItem not found'});
        }

        console.log('Record deleted Successfully');
        res.status(200).json({message: 'MenuItem deleted successfully'});
    }catch(error){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// commented
module.exports = router;