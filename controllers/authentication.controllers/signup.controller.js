const authModel = require('../../model/authentication.models/auth.model')
const validationResult = require('express-validator').validationResult
exports.getSignup = (req,res,next)=>{
    res.render('signup',{
        headstyle:'/css/signupStylesheet.css'
    })
}
exports.postSignup = (req,res,next) => {
    return console.log(validationResult(req));
    authModel.CreateNewUser(req.body.username,req.body.email,req.body.password)
    .then(() =>
     res.redirect('/login'))
     .catch(err => console.log(err))
}
exports.getLogin = (req,res,next)=>{
    res.render('login',{
        headstyle:'/css/bootstrap.min.css',
        loginError:req.flash('loginError')[0]
    })
}
exports.postLogin = (req,res,next)=>{
    authModel.login(req.body.email , req.body.password).then((id)=>{
        req.session.userId = id;
        res.redirect('/')
    }).catch((err)=>{
        req.flash('loginError',err)
        res.redirect('/login')
    })
}
exports.logout = (req,res,next) =>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}