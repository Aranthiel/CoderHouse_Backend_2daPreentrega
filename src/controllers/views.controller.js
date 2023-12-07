import config from '../config/config.js'

const baseURL= config.baseURL;

async function renderHome(req,res){
    console.log('ejecutando renderHome en views.controller.js');
    const { email, first_name }= req.session || "";
    res.render("home", {baseURL, email, first_name });
};

async function renderSignup(req,res){
    console.log('ejecutando renderSignup en views.controller.js'); 
    res.render("signup");
};

async function renderLogin(req,res){
    console.log('ejecutando renderLogin en views.controller.js'); 
    res.render("login");
};

async function renderChat(req,res){
    console.log('ejecutando renderChat en views.controller.js');
    res.render("chat");
};

async function renderRealTimeProducts(req,res){
    console.log('ejecutando getRealTimeProductsC en views.controller.js');
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;   
    
    try {
        const products = await productsManagerMongoose.mongooseGetProducts(+limit);
        if (!products.length){
            res.status(404).json({ success: false, message: 'No se encontraron productos' , data:[]})
        } else {
            res.status(200).render("realTimeProducts", { products});
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
};

async function renderCartDetail(req,res){
    console.log('ejecutando renderCartDetail en views.controller.js');
    res.render("cartDetail");

};

async function renderProductDetail(req,res){    
    console.log('ejecutando renderProductDetail en views.controller.js');
    res.render("productDetail");

};

async function renderError(req,res){
    //res.status(200).render("error");
    res.status(404).render('error', {
        status: 'error',
        message: 'Route not found.',
        data: {}
    });

};


export {
    renderHome,
    renderSignup,
    renderLogin,
    renderChat,
    renderRealTimeProducts,
    renderCartDetail,
    renderProductDetail,
    renderError,
}

