const User=require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


const userRegistration=function(request,response,next){
  bcrypt.hash(request.body.password,10,function(err,hash){

    if(err)
    {
      response.json({
        error:err
      });
    }

    let user=new User({
      email:request.body.email,
      password:hash
    });

    user.save()
         .then(function(result){
           response.status(201).json({
             message:"User Created successfully",
             UserInfo:result
           });
         })
         .catch(function(err){
           response.json({
             error:err
           });
         })

  });
};



const getAllUsers=function(request,response,next){
  User.find()
      .then(function(users){
        response.status(201).json({
          message:"All Users",
          UserList:users
        })
      })
      .catch(function(error){
        response.json({
          error:error
        })
      })
};


const userLogIn=function(request,response,next)
{
  let email=request.body.email;
  let password=request.body.password;

  User.findOne({email:email})
      .then(function(user){
        if(user)
        {
          bcrypt.compare(password,user.password,function(error,result){
            if (error) {
              response.json({
                message:"Error Occured"
              });
            }
            if (result) {

            // let token=jwt.sign({email:user.email, _id:user._id},'SECRET',
            // {expiredAt:'2h'});

            let token=jwt.sign({email:user.email, _id:user._id},'SECRET',
            {expiresIn:"2h"});

              response.json({
                message:"Login successful",
                Token:token
              });
            }
            else {
              response.json({
                message:"Lonin failed,password dont match"
              });
            }
          });
        }
        else {
          response.json({
            message:"User Not Found"
          });
        }
      })

};

module.exports={
  userRegistration,
  getAllUsers,
  userLogIn
}
