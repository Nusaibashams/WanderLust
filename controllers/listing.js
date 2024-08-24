// call back functions
const Listing = require("../Model/listing");

//index
module.exports.index=(async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//renderNewform 
module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs")
}

//show the list based on id
module.exports.showListings=(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author"
    }
  })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested does not exist!..");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
    });

//create new list
module.exports.createListing=async(req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
     const newListing=new Listing(req.body.listing);
     newListing.owner =req.user._id;
     newListing.image ={url,filename};
     await newListing.save();
     req.flash("success","New Listing Was Created");
     res.redirect("/listings");
    };

//edit list
module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested does not exist!..");
        res.redirect("/listings");
    }
    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250")
    res.render("\listings/edit.ejs",{listing,originalImageUrl});
    };
// update list
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image ={url,filename};
        await listing.save();    
    }
    req.flash('success', 'Listing was updated successfully!');
    res.redirect(`/listings/${id}`);
  };
  //delete listing
module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Was deleted");
    res.redirect("/listings")
};