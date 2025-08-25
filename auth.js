const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const Person = require('./models/person');

passport.use(new localStrategy(async (username, password, done)=>{
    //authentication logic impl start
    try{
        const user = await Person.findOne({username});
        if(!user){
            return done(null, false, {message: 'Incorrect UserName'});
            
        }
        // const isPasswordMatch = user.password === password ? true : false;
        const isPasswordMatch = await user.comparePassword(password) // it is using for comparing with hashed password
        if(isPasswordMatch){
            return done(null, user);
        }else{
            return done(null, false, {message: 'Incorrect Password'});
        }
    }catch(error){
        return done(error);
    }
}));

module.exports = passport;