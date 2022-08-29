var express = require('express')

const router=express.Router();
var UserController= require('../controllers/userController')
var auth=require('../middleware/auth');



// Public Routes
router.post('/register', UserController.userRegistration)
router.post('/login',UserController.userLogin)



//protected Routes

router.post('/changepassword',auth, UserController.changeUserPassword)

 router.post('/userprofile',auth, UserController.userProfile)





module.exports = router

// export default router