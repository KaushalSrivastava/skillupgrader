const express = require('express')
const path = require('path')
const { requireAuth } = require('../middleware/requireAuth')
const User = require('../models/user')
const router = express.Router()

router.use(express.static(path.join(__dirname, "../static")));


router.get('/', requireAuth, (req,res) => {
    res.render('dashboard.ejs')
})
router.get('/terms', requireAuth, (req,res) => {
    res.render('terms.ejs')
})
router.get('/learn', requireAuth, (req,res) => {
    res.render('learn.ejs')
})
router.get('/report', requireAuth, (req,res) => {
    res.render('report.ejs')
})
router.get('/referral', requireAuth, (req,res) => {
    res.render('referral.ejs')
})
router.get('/profile', requireAuth, (req,res) => {
    res.render('profile.ejs')
})
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
    


router.get('/withdraw', requireAuth, (req,res) => {
    res.render('withdraw.ejs')
})
router.get('/logout',  requireAuth, (req,res) => {
    res.cookie('token', '', { maxAge: 1})
    res.cookie('user', '', { maxAge: 1})
    res.redirect('../')
})
router.get('/refresh',  requireAuth, async (req,res) => {
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
    console.log(sanitized_user)
    res.locals.user = sanitized_user
    res.cookie('user', sanitized_user, { httpOnly: true })
    res.redirect(req.get('referer'));
})

module.exports = router