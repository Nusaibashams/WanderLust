const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const Review = require("../Model/reviews");
const Listing = require("../Model/listing");
const {validateReview, isloggedIn, isreviewAuthor}=require("../middleware");
const reviewController=require("../controllers/review")


//post route (create review)
router.post("/",validateReview,isloggedIn,wrapAsync(reviewController.CreateReview));

//delete review route
router.delete("/:reviewId",isloggedIn ,isreviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;
