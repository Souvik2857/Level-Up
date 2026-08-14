const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    email: { type: String, required: true },
    subject: { type: String,default:null},
    tasks: {type:Array,default:[]},
    rank:{type:String,required:true,default:"E"},
    XP:{type:Number,default:0},
    isDone: {type:Boolean,default:false}
})

module.exports = mongoose.model('Task', taskSchema);