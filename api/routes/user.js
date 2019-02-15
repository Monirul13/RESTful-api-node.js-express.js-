const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');
const authenticate=require('../middleware/authenticate');

router.post('/login',userController.userLogIn);

router.post('/register',userController.userRegistration);

router.get('/' ,authenticate, userController.getAllUsers);

module.exports=router;
