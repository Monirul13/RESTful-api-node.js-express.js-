const mongoose=require('mongoose');
const validator=require('validator');
const Schema=mongoose.Schema;

const UserSchema= new Schema({
  email:{
    type:String,
    trim:true,
    validate:{
      validator:function(v){
        return validator.isEmail(v)
      }
    }
  },
  password:String
});


const User=mongoose.model('User',UserSchema);
module.exports=User;
