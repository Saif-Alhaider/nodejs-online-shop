const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/online-shop';
const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    image:String
})

const Product = mongoose.model('product',productSchema)

exports.getAllProducts = ()=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find({})
        }).then((product)=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })

}

exports.getProductsByCategory = (category)=>{

    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.find({category:category})
        }).then((product)=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })

}

exports.getProductById = (id)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.findById(id)
        }).then((product)=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
exports.getFirstProduct = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(DB_URL).then(()=>{
            return Product.findOne({})
        }).then((product)=>{
            mongoose.disconnect()
            resolve(product)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}