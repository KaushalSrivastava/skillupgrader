const express = require('express')
const path = require('path')
const { requireAuth } = require('../middleware/requireAuth')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcryptjs')
const { requireActivate } = require('../middleware/requireActivate')
const Razorpay = require('razorpay');
router.use(express.static(path.join(__dirname, "../static")));

// GET ROUTES


router.get('/', requireAuth, (req,res) => {
    res.render('dashboard.ejs')
})
router.get('/activate', requireAuth, (req,res) => {
    res.render('activate.ejs')
})
router.get('/terms', requireAuth, (req,res) => {
    res.render('terms.ejs')
})
router.get('/learn', requireAuth, requireActivate, (req,res) => {
    res.render('learn.ejs')
})
router.get('/report', requireAuth, (req,res) => {
    res.render('report.ejs')
})
router.get('/earn', requireAuth, requireActivate, (req,res) => {
    res.render('earn.ejs')
})
router.get('/profile', requireAuth, (req,res) => {
    res.render('profile.ejs')
})


// UPDATE UPI

router.post('/profile', requireAuth, async (req,res) => {
    const user = await User.findById(req.cookies.user._id)
    const {newUPI} = req.body
    const upiUpdate = await User.findOneAndUpdate({ _id: user }, { upi: newUPI }, {new: true }) 
    if(!upiUpdate){
        return res.json({status: 'error', error: 'UPI Update Failed'})
    }

    console.log('UPI details Updated') 
    res.json({status: 'ok', message: 'UPI Updated Successfully'})
})

//CREATE RAZORPAY ORDER


router.post('/create/orderId', requireAuth, async(req,res) => {
    
            // CREATING PAYMENT ORDER

            let rzp = new Razorpay({
              key_id: 'rzp_test_exOd4sbFEzD8T7',
              key_secret: 'k2diJ3EJ9HLTctWUpKQluxzP',
             });

            let options = {
                amount: 50000,  // amount in the smallest currency unit
                currency: "INR",
                receipt: "rcp1"
                };
            rzp.orders.create(options, function(err, order) {
            console.log(order);
            res.send({orderId: order.id})
            });

})

//UPDATE PASSWORD
    
router.post('/updatepass', requireAuth, async (req,res) => {
    const user = await User.findById(req.cookies.user._id)
    const {oldPass, newPass} = req.body
    if(await bcrypt.compare(oldPass, user.passhash)){
       
        if(!newPass || newPass == '' || typeof newPass !== 'string')
        return res.json({status: 'error', error: 'Invalid New Password'})

        if(newPass.length < 6)
        return res.json({status: 'error', error: 'Your password must be atleast 6 characters long.'})

        const newpasshash = await bcrypt.hash(newPass, 10)
        const passUpdate = await User.findOneAndUpdate({ _id: user }, { passhash: newpasshash }, {new: true }) 
        if(!passUpdate){
            return res.json({status: 'error', error: 'Password Update Failed'})
        }
        res.json({status: 'ok', message: 'Password Updated Successfully'})
    }
    else
    {
        res.json({status: 'error', error: 'Old Password you entered is incorrect !'})
    }
   
})

// ACTIVATE ACCOUNT

// LOGOUT
   
router.post('/activate/success',  requireAuth, (req,res) => {
    res.cookie('token', '', { maxAge: 1})
    res.cookie('user', '', { maxAge: 1})
    res.redirect('../')
})

// LOGOUT
   
router.get('/logout',  requireAuth, (req,res) => {
    res.cookie('token', '', { maxAge: 1})
    res.cookie('user', '', { maxAge: 1})
    res.redirect('../')
})

//REFRESH 

router.get('/refresh', async (req,res) => {
    const user = await User.findById(req.cookies.user._id)
    const sanitized_user = {
        _id: user.id,
        email: user.email,
        username: user.username,
        name: user.name,
        totalrefs: user.totalrefs,
        amount: user.amount,
        withdrawn: user.withdrawn,
        totalamount: user.totalamount,
        upi: user.upi
      }
    console.log('Database Called');
    res.locals.user = sanitized_user;
    res.cookie('user', sanitized_user, { httpOnly: true });
    res.redirect(req.get('referer'));
})

module.exports = router