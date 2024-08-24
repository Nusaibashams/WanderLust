const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware");
const userController=require("../controllers/user");

//sign 
router.route("/signup")
.get(userController.renderSignUpFrom)
.post(wrapAsync(userController.SignUp));

//login 
router.route("/login")
.get(userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),userController.LogIn);

//logout
router.get("/logout",userController.userLogOut);

module.exports=router;

