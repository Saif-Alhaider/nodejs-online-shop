const express = require('express');
const path = require('path')

const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session)

const flash = require('connect-flash')

const homeRouter = require('./routes/home.route')
const productRouter = require('./routes/product.router')
const signupRouter = require('./routes/authentications.routes/signup.route')
const app = express();
// needed files images icons etc..
app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'images')));
//
const STORE = new SessionStore({
    uri:'mongodb://localhost:27017/online-shop',
    collection:'sessions'
})
app.use(session({
    secret:'super secret',
    saveUninitialized:false,
    store:STORE
}))
//
app.use(flash())
// the engine
app.set('view engine','ejs');
app.set('views','views')

app.use('/',homeRouter)
app.use('/product',productRouter)
app.use('/',signupRouter)

app.listen(3000,(err)=>{console.log('server is running on port http://localhost:3000')})
