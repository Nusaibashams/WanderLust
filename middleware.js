 const Listing=require("./Model/listing");
 const Review = require("./Model/reviews");
 const ExpressError=require("./utils/ExpressError");
 const {ListingSchema,reviewSchema}=require("./schema")

 // listing  schema validation middleware fun
module.exports.validateListing=(req,res,next)=>{
   let {error}= ListingSchema.validate(req.body);
   if(error){
       let errMsg=error.details.map((el)=>el.message).join(",");
       throw new ExpressError(400,errMsg);
   }
   else{
       next();
   }
};

//review schema validation middleware fun
module.exports.validateReview=(req,res,next)=>{
   let {error}= reviewSchema.validate(req.body);
   if(error){
       let errMsg=error.details.map((el)=>el.message).join(",");
       throw new ExpressError(400,errMsg);
   }
   else{
       next();
   }
};

//redirecturl 
 module.exports.isloggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl; 
        req.flash("error","please log in!");
       return res.redirect("/login");
    }
    next();
 };
//redirectUrl 
 module.exports.saveRedirectUrl=(req,res,next)=>{
   if(req.session.redirectUrl){
      res.locals.redirectUrl=req.session.redirectUrl;
   }
   next();
 }
//edit/delete only by owner
 module.exports.isOwner=async(req,res,next)=>{
   let {id}=req.params;
   let listing= await Listing.findById(id);
if(!listing.owner.equals(res.locals.currentUser._id))
{
    req.flash("error","you are not the owner of the listings");
    return res.redirect(`/listings/${id}`);
}
next();
 }
//delete only by author
 module.exports.isreviewAuthor=async(req,res,next)=>{
   let {id,reviewId}=req.params;
   let review= await Review.findById(reviewId);
if(!review.author.equals(res.locals.currentUser._id))
{
    req.flash("error","you are not the author of this review");
    return res.redirect(`/listings/${id}`);
}
next();
 }
