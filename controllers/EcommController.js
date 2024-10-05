
const m = {
    index:(req, res) =>{
        res.render('index');
    },  
    shop:(req, res) =>{
        res.render('shop');
    },  
    aboutUs:(req, res) =>{
        res.render('aboutUs');
    },  
    services:(req, res) =>{
        res.render('services');
    },  
    blog:(req, res) =>{
        res.render('blog');
    },  
    contactUs:(req, res) =>{
        res.render('contactUs');
    } 
    
    
};
module.exports = m;

