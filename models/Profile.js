const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const ProfileSchema=new Schema({
  type:{
    type:String,
  },
  describe:{
    type:String,
  },
  income:{
    type:String,
    required:true
  },
  expend:{
    type:String,
    required:true
  },
  cash:{
    type:String,
    required:true
  },
  remark:{
    type:String,
    required:true
  },
  time:{
    type:Date,
    default:Date.now
  }
});

module.exports=Profile=mongoose.model("profiles.js",ProfileSchema);




