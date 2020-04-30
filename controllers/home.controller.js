const productsModel = require('../model/products.model')
exports.getHome = (req,res,next)=>{


    let category = req.query.category;
    let productsPromise;
    let validCategories = ['cloths','phones','laptops','test'];
    if(category && validCategories.includes(category)){
        productsPromise = productsModel.getProductsByCategory(category)
    }else{
        productsPromise = productsModel.getAllProducts()
    }
    productsPromise.then((products)=>{
        res.render('index',{
            products:products,
            headstyle:'/css/bootstrap.min.css'
        })
    })
}