const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/online-shop';
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
})

const User = mongoose.model('user',userSchema)

exports.CreateNewUser = (username,email,password) =>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne({email : email})
        }).then(user =>{
            if(user){
                mongoose.disconnect()
                reject('this user is already exsisted')
            }
            else{
                return bcrypt.hash(password,10)
            }
        }).then(hashedpassword =>{
            let user = new User({
                username:username,
                email:email,
                password:hashedpassword
            })
            return user.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve()
        }).catch(err =>{
            mongoose.disconnect()
            reject(err)
        })
        
    })
}
exports.login = (email,password) => {
    return new Promise((resolve,reject) =>{
        mongoose.connect(DB_URL).then(()=>{
            return User.findOne({email:email})
        }).then((user)=>{
            if(!user){
                mongoose.disconnect()
                reject('there is no account with this email')
            }else{
                bcrypt.compare(password , user.password).then(same =>{
                    if(!same){
                        mongoose.disconnect();
                        reject('password is incorrect')
                    }else{
                        mongoose.disconnect()
                        resolve(user._id)
                    }
                })
            }
        }).catch(err =>{
            mongoose.disconnect();
            reject(err)
        })
    });
}