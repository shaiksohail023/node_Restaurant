const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async(req,res)=>{
    try{
        const data = req.body; //req.body contains person data
        //create a new person using mongoose model
            const newPerson = new Person(data);

        // save the new person to the DB
        const response = await newPerson.save();
        console.log('Data Saved Successfully');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get('/', async(req,res)=>{
    try{
        const data = await Person.find();
        console.log('Data Fetched Successfully');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//parameterized call
router.get('/:workType', async(req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
            const response = await Person.find({work:workType});
            console.log('Data Fetched Successfully');
            res.status(200).json(response);
        }else{
            res.status(404).json({error: 'Invalid Work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//update person
router.put('/:id', async(req,res)=>{
    try{
        const personId = req.params.id; //Extract the id from URL Parameter
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData, {
            new: true, //return updated document
            runValidators: true //Run mongoose validation
        })

        //if the id is not present in person table then it will go in these 
        // if condition
        if(!response){
            return res.status(400).json({error: 'Person not found'});
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
        const personId = req.params.id; //Extract the id from URL Parameter
        const response = await Person.findByIdAndDelete(personId);

        if(!response){
            return res.status(400).json({error: 'Person not found'});
        }

        console.log('Record deleted Successfully');
        res.status(200).json({message: 'person deleted successfully'});
    }catch(error){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;