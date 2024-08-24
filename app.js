if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./Model/user");


//router
const listingsRouter=require("./routers/listing");
const reviewsRouter=require("./routers/review");
const userRouter=require("./routers/user");

//set view engine 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
//parsing
app.use(express.urlencoded({extended:true}));
//use method package
app.use(methodOverride("_method"));
//ejs-mate
app.engine("ejs",ejsMate);
//use static files
app.use(express.static(path.join(__dirname,"/public")));

const dbUrl=process.env.ATLASDB;
//conntion with mongodb
main().then(()=>{
    console.log("connection successful")
})
.catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dbUrl);
}

//mongosession
const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOptions ={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
app.use(flash());

passport.serializeUser(User.serializeUser());//session start
passport.deserializeUser(User.deserializeUser());//session end

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currentUser=req.user;
    next();
});

app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

//set an middleware to handle error
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});

});

//set listening port
app.listen(8080,()=>{
    console.log("listening to the port:8080");
});