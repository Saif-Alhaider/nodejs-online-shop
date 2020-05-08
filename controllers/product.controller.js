const productsModel = require('../model/products.model')
const authGuard = require('../routes/guards/auth.guard');
exports.getProduct = (req,res,next)=>{
    productsModel.getFirstProduct().then(product =>{
            res.render('product',{
                product:product,
                headstyle:'/css/bootstrap.min.css',
                isUser:req.session.userId
            })
            
        })
}
exports.getProductById = (req,res,next) => {
    let productId = req.params.id
    productsModel.getProductById(productId).then(product =>{
        res.render('product',{
            product:product,
            headstyle:'/css/bootstrap.min.css',
            isUser:req.session.userId
        })
        
    })
}