const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define person schema
const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type:String
    },
    salary:{
        type:Number,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

//these is hashing password imp start
personSchema.pre('save', async function(next){
    const person = this;
    // hash the password only if it is modified or adding new record
    if(!person.isModified('password')) return next();

    try{
        // hashing password generation start
        const salt = await bcrypt.genSalt(10); // in these it will create one
        //  salt number with 10 digits dont give big number it will take too
        //  much time to generate hashed password.

        const hashedPassword = await bcrypt.hash(person.password, salt); // in these line we are creating
        //  the hashed password it takes 2 parameters one is password and other is salt.

        //now overide the person.password with hashed password;
        person.password = hashedPassword;
        next(); // next is a callback func which says i have completed my work now you can move forward.
    }catch(err){
        return next(err);
    }
});
//these is hashing password imp end

//here it is comparing the enteredpassword and hashedpassword
// ex: hashedpassword ==>blshnsnhs now it will extract salt from these and
// now it will hash enteredpassword and add extracted salt and check is it same or not
personSchema.methods.comparePassword = async function(enteredPassword){
    try{
        // use bcrypt to compare the provide password with the hashed password
        const isMatch = await bcrypt.compare(enteredPassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
};

//create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;