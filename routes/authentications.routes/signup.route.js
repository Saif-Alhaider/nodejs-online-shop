const router = require('express').Router();
const bodyParser = require('body-parser').urlencoded({extended:true})
const authController = require('../../controllers/authentication.controllers/signup.controller')
router.get('/signup',authController.getSignup)

router.post('/signup',bodyParser,authController.postSignup)

router.get('/login',authController.getLogin)
router.post('/login',bodyParser,authController.postLogin)

router.all('/logout',authController.logout)
module.exports = router;