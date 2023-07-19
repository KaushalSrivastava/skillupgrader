const User = require('../models/user')

const requireAdmin = async (req, res, next) => {
   
                const user = await User.findById(req.cookies.user._id);
                
                if(!user.isAdmin){
                    console.log(user.isAdmin);
                    console.log('User Not an admin');
                    res.send('ERROR');
                    
                }
                next();
               
    
}

module.exports = { requireAdmin }