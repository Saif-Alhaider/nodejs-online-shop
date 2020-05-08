const router = require('express').Router();
const bodyParser = require('body-parser').urlencoded({extended:true})

const authController = require('../../controllers/authentication.controllers/signup.controller')
const authCheck = require('./auth.check').authCheck
const authCheckLogin = require('./auth.check').authCheckLogin
router.get('/signup',authController.getSignup)

router.post(
'/signup',
bodyParser,
authCheck,
authController.postSignup,

)
router.get('/login',authController.getLogin)
router.post('/login',bodyParser,authCheckLogin,authController.postLogin)

router.all('/logout',authController.logout)
module.exports = router;