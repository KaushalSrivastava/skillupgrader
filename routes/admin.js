const express = require('express')
const path = require('path')
const User = require('../models/user')
const { requireAuth } = require('../middleware/requireAuth')
const router = express.Router()

router.use(express.static(path.join(__dirname, "../static")));


router.get('/pendingpayments', requireAuth, async (req,res) => {
    const filter = {amount: {$gte: 1000}};
    const pendingusers = await User.find(filter).lean()
    res.render('pendingpayment.ejs', {pendingusers:pendingusers})
})


module.exports = router