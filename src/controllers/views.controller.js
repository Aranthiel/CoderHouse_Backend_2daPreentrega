import config from '../config/config.js'

const baseURL= config.baseURL;

async function renderHome(req,res){
    console.log('ejecutando renderHome en views.controller.js');
    const { email, first_name, cart }= req.session || "";
    res.render("home", {baseURL, email, first_name, cart });
};

async function renderSignup(req,res){
    console.log('ejecutando renderSignup en views.controller.js'); 
    const { email, first_name, cart }= req.session || "";
    res.render("signup", {baseURL, email, first_name, cart });
};

async function renderLogin(req,res){
    console.log('ejecutando renderLogin en views.controller.js'); 
    const { email, first_name, cart }= req.session || "";
    res.render("login", {baseURL, email, first_name, cart });
};

async function renderCartDetail(req,res){
    console.log('ejecutando renderCartDetail en views.controller.js');
    const { email, first_name, cart }= req.session || "";
    res.render("cartDetail", {baseURL, email, first_name, cart });

};

async function renderProductDetail(req,res){    
    console.log('ejecutando renderProductDetail en views.controller.js');
    const { email, first_name, cart }= req.session || "";
    res.render("productDetail", {baseURL, email, first_name, cart });

};

async function renderChat(req,res){
    console.log('ejecutando renderChat en views.controller.js');
    const { email, first_name, cart }= req.session || "";
    res.render("chat", {baseURL, email, first_name, cart });
};

async function renderRealTimeProducts(req,res){
    console.log('ejecutando getRealTimeProductsC en views.controller.js');
    const { email, first_name, cart }= req.session || "";
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;   
    
    try {
        const products = await productsManagerMongoose.mongooseGetProducts(+limit);
        if (!products.length){
            res.status(404).json({ success: false, message: 'No se encontraron productos' , data:[]})
        } else {
            res.status(200).render("realTimeProducts", {baseURL, email, first_name, cart, products});
        }
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
};






export {
    renderHome,
    renderSignup,
    renderLogin,
    renderChat,
    renderRealTimeProducts,
    renderCartDetail,
    renderProductDetail,
}

