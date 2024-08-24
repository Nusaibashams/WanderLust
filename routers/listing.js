const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync");
const {isloggedIn,isOwner,validateListing}=require("../middleware");
const listingController=require("../controllers/listing");
const multer=require("multer");
const {storage}=require("../cloudinary")
const upload=multer({storage});


//index and create
router.route("/")
.get(wrapAsync(listingController.index))
.post(isloggedIn, 
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
);

//new route
router.get("/new",isloggedIn,listingController.renderNewForm);

//show,update,delete
router.route("/:id")
.get(wrapAsync(listingController.showListings))
.put(isloggedIn,isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing))
.delete(isloggedIn,isOwner,
    wrapAsync(listingController.destroyListing));

//edit route
router.get("/:id/edit",isloggedIn,isOwner,
    wrapAsync(listingController.renderEditForm));

module.exports=router;
