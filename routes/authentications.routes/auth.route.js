const router = require('express').Router();
const bodyParser = require('body-parser').urlencoded({ extended: true })

const authController = require('../../controllers/authentication.controllers/signup.controller')
const authCheck = require('./auth.check').authCheck
const authCheckLogin = require('./auth.check').authCheckLogin
const authGuard = require('../guards/auth.guard')
router.get('/signup', authGuard.notAuth, authController.getSignup)

router.post(
    '/signup',
    bodyParser,
    authCheck,
    authController.postSignup,

)
router.get('/login', authGuard.notAuth, authController.getLogin)
router.post('/login', authGuard.notAuth, bodyParser, authCheckLogin, authController.postLogin)

router.all('/logout', authController.logout)
module.exports = router;