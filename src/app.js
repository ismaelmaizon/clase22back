import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { initializePassport } from "./passport/jwt.passport.js";
import passport from "passport";




const app = express()




app.use(express.json())
app.use(express.static('./src/public'))
app.use(cookieParser())

initializePassport();
app.use(passport.initialize());




// esto hay que usarlo con router
app.post('/login', (req, res)=>{
    const {email, password} = req.body
    if(email=='coder@coder.com' && password == 'coderpass') {
        let token = jwt.sign({email, password}, 'coderSecret', {expiresIn: '24h'});

        //al cambiar {httpOnly:false} a true el Token deja de ser visible
        res.cookie('coderCookie', token,  {httpOnly:false}).send( {status: "success"} );
    }else{
        res.status(400).send({status: 'error'})
    }
})

//devuelve la informacion del token
app.get('/current', passport.authenticate('jwt', { session:false }) , (req, res) => {
    res.send(req.user)
})


app.listen(8080, ()=> {
    console.log('server listening');
})

