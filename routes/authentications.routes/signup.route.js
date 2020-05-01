const router = require('express').Router();
const bodyParser = require('body-parser').urlencoded({extended:true})

const authController = require('../../controllers/authentication.controllers/signup.controller')
const check = require('express-validator').check
router.get('/signup',authController.getSignup)

router.post(
'/signup',
bodyParser,
check('username').not().isEmpty().withMessage('Username is Required'),
check('email').not().isEmpty().withMessage('Email is Required').isEmail().withMessage('not correct format for email'),
check('password').isLength({min:6}),
check('Confirmpassword').custom((value,{req})=>{
    if(value === req.body.password) return true
    else throw 'passwords do not match'
}),
authController.postSignup
)

router.get('/login',authController.getLogin)
router.post('/login',bodyParser,authController.postLogin)

router.all('/logout',authController.logout)
module.exports = router;