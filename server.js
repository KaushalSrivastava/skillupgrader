//SERVER FILE

//LIBRARIES & MODULES


const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bcrypt = require('bcryptjs')
const favicon = require('serve-favicon')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const jwt = require('jsonwebtoken')
const app = express()
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000;
const User = require('./models/user')
const username = encodeURIComponent("skillupgrader")
const password = encodeURIComponent("skillupgraderMDB")
const JWT_SECRET = 'jwtskillupgraderkey';

//CONNECTING TO DATABASE

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.azj4s.mongodb.net/skillupgrader?retryWrites=true&w=majority`)


//MIDDLEWARE & ROUTES
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(favicon(__dirname + '/static/favicon.ico'));
app.use('/user', userRouter)
app.use('/admin', adminRouter)
//REQUESTS


app.get('/', (req,res) =>{
    res.render('home.ejs')
})

//LOGIN 

app.get('/login', (req,res) =>{
    const status = req.query.status
    const userInCookie = req.cookies.user;
    if(userInCookie)
    res.redirect('/user/')
    else
    res.render('login.ejs', {status: status})
})

app.post('/login', async (req,res) => {
    const {username, password} = req.body
   
    const user = await User.findOne({ username }).lean()
    if(!user)
    return res.json({status: 'error', error: 'Invalid Username or Password'})
   
    if(await bcrypt.compare(password, user.passhash)){
            const token = jwt.sign({ id: user._id, username: user.username}, JWT_SECRET)
            res.cookie('token', token, { httpOnly: true })
            return res.json({status: 'ok', user: user})
    }
    res.json( {status: 'error', error: 'Invalid Username or Password'})
})



//SIGNUP

app.get('/signup', (req,res) =>{
    const userInCookie = req.cookies.user;
    const ref = req.query.ref;
    if(userInCookie)
    res.redirect('/user/')
    else
    res.render('signup.ejs', {ref:ref})
})

app.post('/signup', async (req, res) => {



//ADDING DATA TO DATABASE NOW
       
        const username_regex = /^[a-z0-9]{6,18}$/;  //SMALL CASE a-z & numbers allowed only between 6-18 characters
        let {email, username, name, password, ref, phone} = req.body
   
        ref = ref==undefined || ref == '' ? 'noreferrer' : ref;  //If no referrer then assign ref as norefferer string

        //VALIDATIONS
        if(!name || name == '' || typeof name !== 'string' || name.length > 25)
        return res.json({status: 'error', error: 'Invalid Name'})

        if(!username || username == '' || typeof username !== 'string')
        return res.json({status: 'error', error: 'Invalid Username'})

        if(!email || email == '' || typeof email !== 'string')
        return res.json({status: 'error', error: 'Invalid email'})

        if(!password || password == '' || typeof password !== 'string')
        return res.json({status: 'error', error: 'Invalid Password'})

        else if (!phone || phone == "" || phone.length != 10)
        return res.json("Invalid Phone Number");

        if(password.length < 6)
        return res.json({status: 'error', error: 'Your password must be atleast 6 characters long.'})

        if(!username_regex.test(username))
        return res.json({status: 'error', error: 'Username must be 6-18 characters long, in lower case and cannot contain special characters'})

        const passhash = await bcrypt.hash(password, 10)  //HASHING WITH 10 MIXES

        try{
            // CREATE USER DOCUMENT IN DATABASE
           const response = await User.create({
                email, username, name, passhash, ref, phone
            })
            console.log('User Created Successfully', response)

            const token = jwt.sign({ id: response._id, username: response.username}, JWT_SECRET) // GENERATE TOKEN
            res.cookie('token', token, { httpOnly: true }) // SET TOKEN IN COOKIES

            if(ref != 'noreferrer'){
                const refferer = await User.findOneAndUpdate({ username: ref }, { $inc: { totalrefs: 1, amount: 500, totalamount: 500 } }, {new: true }) 
                console.log('Referrer stats Updated')     
            }
          
            return res.json({status: 'ok', user: response._id});
           
        }  
        catch (error) {
                    if(error.code === 11000)
                    return res.json({status: 'error', error: 'Username or E-mail already in use'})
                    throw error
                }
       

})


app.listen(port, console.log(`App running at port : ${port}. Browse at http://localhost:5000`))