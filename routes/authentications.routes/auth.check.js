const check = require('express-validator').check
exports.authCheck = [
    check('username').not().isEmpty().withMessage('Username is Required'),
    check('email').not().isEmpty().withMessage('Email is Required').isEmail().withMessage('not correct format for email'),
    check('password').isLength({min:6}),
    check('Confirmpassword').custom((value,{req})=>{
        if(value === req.body.password) return true
        else throw 'passwords do not match'
})
]
console.log(typeof(this.authCheck))