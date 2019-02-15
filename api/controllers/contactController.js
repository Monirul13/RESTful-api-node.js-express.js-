const Contact=require('../models/Contact');

const getAllContacts=function(request,response,nest){
  Contact.find()
         .then(function(data){
           response.status(200).json({
             message:'All Contacts',
             Connect:data
           });
         })
         .catch(function(error){
           console.log(error);
           response.status(500).json({
             message:'Error Occured',
             Error:error
           });
         })
};



const saveNewContact=function(request,response,next){
  const contact=new Contact({
    name:request.body.name,
    phone:request.body.phone,
    email:request.body.email

  });

  contact.save()
         .then(function(data){
           response.status(201).json({
             message:'Contact Data Inserted successfully',
             contact:data
           })
         })
         .catch(function(err){
           console.log(err);
         })
}


const getContect=function(request,response,next){

  let id=request.params.id;

  Contact.findById(id)
         .then(function(data){
           response.status(200).json({
             message:'Single Contact',
             Contect:data,
             id:id
           });
         })
         .catch(function(error){
           console.log(error);
           response.status(500).json({
             message:'Error Occured',
             Error:error
           });
         })
};



const deleteContact=function(request,response,next)
{
  let id=request.params.id;
  Contact.findByIdAndRemove(id)
        .then(function(data){
          response.status(200).json({
            message:'Contact Deleted',
            DeletedContect:data
          });
        })
        .catch(function(error){
          console.log(error);
          response.status(500).json({
            message:'Error Occured',
            Error:error
          });
        })
};

const updateContact=function(request,response,nest){
  let id=request.params.id;

  const UpdateContact={
    name:request.body.name,
    phone:request.body.phone,
    email:request.body.email
  };


  Contact.findByIdAndUpdate(id,{$set:UpdateContact})
          .then(function(contact){
                Contact.findById(contact._id)
                   .then(function(updatedContect){

                     response.status(200).json({
                       message:'Contact Updated',
                       UpdatedContect:updatedContect
                     });

                   })
          })
          .catch(function(error){
            console.log(error);
            response.status(500).json({
              message:'Error Occured',
              Error:error
            });
          })
};

module.exports={
  getAllContacts,
  saveNewContact,
  getContect,
  deleteContact,
  updateContact
};
