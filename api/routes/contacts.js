const express=require('express');
const route=express.Router();
const contactController=require('../controllers/contactController');

//get
 route.get('/',contactController.getAllContacts);

 //post
 route.post('/',contactController.saveNewContact);

//get a single record
 route.get('/:id',contactController.getContect);

//delete a single reord
 route.delete('/:id',contactController.deleteContact);

// upadate a single record
 route.put('/:id',contactController.updateContact);

 module.exports=route;
