const User = require('../models/user')

const requireActivate = async (req, res, next) => {
   
                const user = await User.findById(req.cookies.user._id);
                
                if(!user.isActive){
                    console.log('User InActive');
                    res.redirect('../user/activate');
                }
                
                next();
    
}

module.exports = { requireActivate }