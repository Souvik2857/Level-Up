const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({ 
    email:{type:String,required:true}, //ROD
    password:{type:String,required:true},
    securityKey:{type:Number},  //rod
    username:{type:String},
    // to be dode exp  as fixed
    //leaderboard to be done
    //gemini key for questions
    createdAt:{type:Date,default: Date.now}
})

module.exports=mongoose.model('User',userSchema);