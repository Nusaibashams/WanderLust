const User=require("../Model/user")

//signup form
module.exports.renderSignUpFrom=(req,res)=>{
    res.render("users/signup.ejs");
};

//signup
module.exports.SignUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
        const newUser=new User({email,username});
        let registerUser= await User.register(newUser,password);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to WanderLust!");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup")
    }
};

//login form
module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
};

//login

module.exports.LogIn=(req, res) => {
    req.flash("success", "Welcome back to WanderLust!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

//logout
module.exports.userLogOut=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","logged out successfully");
        res.redirect("/listings");
    });
};