const express = require('express');
const router = express.Router();
const Person = require('./../models/person');
const {jwtAuthMiddleWare, generateToken} = require('./../jwt');

// router.post('/', async(req,res)=>{
    router.post('/signup', async(req,res)=>{
    try{
        const data = req.body; //req.body contains person data
        //create a new person using mongoose model
            const newPerson = new Person(data);

        // save the new person to the DB
        const response = await newPerson.save();
        console.log('Data Saved Successfully');

        const payload = {
            id: response.id,
            username: response.username
        }
        //adding generate token func
        const token = generateToken(payload);
        // const token = generateToken(response.username); // generateToken will
        //  take parameter as payload anything can pass in payload iam passing
        //  username
        console.log('Token is :', token);
        

        res.status(200).json({Response: response, Token: token});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//login route impl start
router.post('/login', async(req,res) => {
    try{
        //extract username and password from req
        const {username, password} = req.body;

        //find user by username
        const user = await Person.findOne({username: username});

        //if user not exist or password not matched then show error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generate Token
        const payload={
            id: user.id,
            username: user.username
        }

        const token = generateToken(payload);
        //return token as response
        res.json({token});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

//profile route
router.get('/profile', jwtAuthMiddleWare, async (req, res) => {
    try{
        const userData = req.user;
        console.log(userData);
        
        const userId = userData.id;

        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
});

router.get('/', jwtAuthMiddleWare, async(req,res)=>{
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