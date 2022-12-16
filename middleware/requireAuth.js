const jwt = require('jsonwebtoken')
const User = require('../models/user')


const JWT_SECRET = 'JWT_SECRET_TEST';
const requireAuth = (req, res, next) => {
    const token = req.cookies.token;
   
    if(token){
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if(err){
                console.log(err)
                res.locals.user = null
                res.redirect('../login')
            }
            else{
                // console.log(decodedToken)
                const userInCookie = req.cookies.user;
                if(!userInCookie){
                console.log('Database called')
                const user = await User.findById(decodedToken.id)
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
                }
                else{
                    res.locals.user = userInCookie;
                    console.log('Cookie Called')
                }
                next()
            }
        })
    }
    else{
        res.locals.user = null
        res.redirect('../login')
    }
}

module.exports = { requireAuth }