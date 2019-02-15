const mongoose=require('mongoose');
const validator=require('validator');

const Schema=mongoose.Schema;

const ContactSchema=new Schema({
  name:{
    type:String,
    trim:true,
    required:true,
    minlength:4
  },
  phone:{
    type:String,
    trim:true,
    required:true,
    unique:true
  },
  email:{
    type:String,
    trim:true,
    validate:{
      validator:function(v){
        return validator.isEmail(v)
      }
    }

  }
});

const Contact=mongoose.model('Contact',ContactSchema);
module.exports=Contact;
