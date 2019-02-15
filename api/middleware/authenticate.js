const jwt=require('jsonwebtoken');

const authenticate=function(request,response,next){
  try {
    console.log('I am in tyr catch block');
    //console.log(request.headers);
    const tkn=request.headers.authorization.split(' ')[1];
    console.log(tkn);
    const decode=jwt.varify(tkn, 'SECRET');
    request.user=decode;
    next();
  } catch (e)
  {
    response.json({
      message:"Authentication failed"
    });
  }
};


module.exports=authenticate;
