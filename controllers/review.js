const Review = require("../Model/reviews");
const Listing = require("../Model/listing");

//create review 

module.exports.CreateReview=async(req,res)=>{
    let listing =  await Listing.findById(req.params.id);
    let newReviews=new Review(req.body.review);
    newReviews.author =req.user._id;
    console.log(newReviews);
    listing.reviews.push(newReviews);
    await newReviews.save();
    await listing.save();
    req.flash("success","New Review Was Created");
    res.redirect(`/listings/${listing.id}`);
    };

//delete review
module.exports.destroyReview=async(req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Was deleted");

    res.redirect(`/listings/${id}`);
};    