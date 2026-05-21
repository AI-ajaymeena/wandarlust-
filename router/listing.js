const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js")
const Listing = require("../models/listing.js");
const {isLogedIn,isOwner,validateListing}=require("../middalware.js");
const { populate } = require("../models/review.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({storage});


// router.route("/")
//     .get(WrapAsync(listingController.index))  //index route
//     .post(isLogedIn,validateListing,upload.single("listing[image]"),WrapAsync(listingController.createListing));  //create route  

router.route("/")
    .get(WrapAsync(listingController.index))
    .post(
        isLogedIn,
        upload.single("listing[image]"),
        validateListing,
        WrapAsync(listingController.createListing)
    );

router.route("/new").get(isLogedIn,WrapAsync(listingController.renderNewForm)); //new route

router.route("/:id")
    .get(WrapAsync(listingController.showListing))     // show route
    .put(isLogedIn,isOwner,upload.single("listing[image]"),WrapAsync(listingController.updateListing))  //update route
    .delete(isLogedIn,isOwner,WrapAsync(listingController.destroyListing));  //destroy route


//edit route
router.get("/:id/edit",isLogedIn,isOwner,WrapAsync(listingController.editListing));

module.exports=router;