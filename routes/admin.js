const express = require('express')
const path = require('path')
const User = require('../models/user')
const { requireAdmin } = require('../middleware/requireAdmin')
const router = express.Router()

router.use(express.static(path.join(__dirname, "../static")));

router.get('/', requireAdmin, (req, res) => {
    res.render('admin/admindashboard.ejs')
})

router.get('/earnadmin', requireAdmin, (req, res) => {
    res.render('admin/earnadmin.ejs')
})

router.get('/learnadmin', requireAdmin, (req, res) => {
    res.render('admin/learnadmin.ejs')
})

router.get('/pendingpayment', requireAdmin, async (req,res) => {
    const filter = {amount: {$gte: 1000}};
    const pendingusers = await User.find(filter).lean()
    res.render('admin/pendingpayment.ejs', {pendingusers:pendingusers})
})


module.exports = router