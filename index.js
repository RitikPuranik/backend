let express=   require('express');
const connectDB = require('./config/db');
let signUpRoute=require('./router/user')
let loginUpRoute=require('./router/login')
let forgetRouter=require('./router/forget')
let resetRouter=require('./router/reset')
let uploadRouter=require('./router/upload')
let likeRouter=require('./router/likecount')
let followRouter = require("./router/follow");



let cors=   require('cors');



let app=  express()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB()
app.use('/api',signUpRoute)
app.use('/api',loginUpRoute)
app.use('/api',forgetRouter) 
app.use('/api',resetRouter) 
app.use('/api',uploadRouter)
app.use('/api',likeRouter)
app.use('/api', followRouter);




app.listen(3000,()=>{
    console.log('server running 3000');
    
})