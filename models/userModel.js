let mongoose=     require('mongoose')
 let userSchema=   mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },passWord:{
        type:String,

    },
    role:{
        type:String,
        enum:['admin','student','user'],
        default:'student'
    },
    resetToken: String,
  resetTokenExpiry: Date,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
})

let User=  mongoose.model('user',userSchema)
module.exports=User