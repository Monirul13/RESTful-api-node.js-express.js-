const express=require('express');
const contactRoute=require('./api/routes/contacts');
const userRoute=require('./api/routes/user');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const port=process.env.PORT||3000;


mongoose.connect('mongodb://localhost:27017/conteact-db',{ useNewUrlParser: true });

const db=mongoose.connection;

db.on('error',function(error){
  console.log(error);
});

db.once('open',function(){
  console.log(`Database connected successfully`);
});



const app=express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/contacts',contactRoute);
app.use('/api/users',userRoute);

// app.get('/',function(request,response){
// response.send(`Hello World`);
// });

app.listen(port,function(){
  console.log(`Server is running at port number ${port}`);
});


// const contacts=[
//   {name:'Monirul Islam',email:'monirul@gmail.com'},
//   {name:'Kamrul Islam',email:'kamrul@gamil.com'},
//   {name:'Mustak Ahmed',email:'mustal@gamil.com'}
// ];

//console.log(express);
