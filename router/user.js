 let express=    require('express')
const User = require('../models/userModel')
 let bcrypt=require('bcryptjs')
 let router=   express.Router()
 router.use(express.json())
router.post('/create', async(req,res)=>{
    let user=req.body
    console.log(user,"helllo");
    let   data=   await  User.findOne({email:user.email})
    // console.log(data,"hehehe");
    if(data){
        res.send('user jinda haii')
    }
   //  123 
    else{
       let updatedPass=    await  bcrypt.hash(user.passWord,10)
    //  let dbUser=   new User(req.body)
    console.log(updatedPass,"hejhejej");
     let dbUser=  new User({
    userName:user.userName,
        email:user.email,
        role:user.role ||'user',
        passWord:updatedPass
    })
       await  dbUser.save()
       res.send('createddddddd')
    }
    



})





module.exports=router

