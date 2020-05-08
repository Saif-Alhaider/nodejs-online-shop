const authModel = require('../../model/authentication.models/auth.model')
const validationResult = require('express-validator').validationResult
exports.getSignup = (req, res, next) => {
    res.render('signup', {
        headstyle: '/css/signupStylesheet.css',
        validationErrors:req.flash('validationErrors'),
    })
}
exports.postSignup = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        authModel.CreateNewUser(req.body.username, req.body.email, req.body.password)
            .then(() =>
                res.redirect('/login'))
            .catch(err => console.log(err))
    }else{
        req.flash('validationErrors',validationResult(req).array())
        res.redirect('/signup')
    }

}
exports.getLogin = (req, res, next) => {
    res.render('login', {
        headstyle: '/css/bootstrap.min.css',
        loginError: req.flash('loginError')[0],
        LoginValidationErrors:req.flash('LoginValidationErrors')
    })
}
exports.postLogin = (req, res, next) => {
    if(validationResult(req).isEmpty()){
    authModel.login(req.body.email, req.body.password).then((id) => {
        req.session.userId = id;
        res.redirect('/')
    })
}else{
    req.flash('LoginValidationErrors',validationResult(req).array())
    res.redirect('/login')
}
}
exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}