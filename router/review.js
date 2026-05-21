const express = require("express");
const router = express.Router({mergeParams:true});
const WrapAsync = require("../utils/WrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview,isLogedIn,isReviewOwner}=require("../middalware.js");
const reviewController=require("../controllers/review.js");


//review rought
//post request
router.post("/",isLogedIn,validateReview, WrapAsync(reviewController.createReview));

//delete reviews rought
router.delete("/:reviewId",isLogedIn,isReviewOwner, WrapAsync(reviewController.destroyReview));

module.exports=router;