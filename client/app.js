const express = require('express');
const { allRoutes } = require('./routes/index.routes');
const createHttpError = require('http-errors');
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(allRoutes)


app.use((req , res , next)=>{
    try {
        throw createHttpError.NotFound("couldn't find the router")
    } catch (error) {
        next(error)
    }
})

app.use((err , req , res, next)=>{
    const status = err.status || createHttpError.InternalServerError().status
    const message = err.message || createHttpError.InternalServerError().message

    return res.status(status).json({
        status , 
        data:{
            message
        }
    })
})
app.listen(4000 , ()=>{ 
    console.log('client is running on port 4000');
})


