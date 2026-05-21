
require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const { cloudinary } = require("../cloudConfig.js");

main()
    .then(() => console.log("connected successfully"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wandarlust');
}

let initDb = async () => {

    // delete old data
    await Listing.deleteMany({});

    // add owner
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "69faa5714e43f75f13a59be2"
    }));


    // upload images to cloudinary
    for (let listing of initData.data) {

        const result = await cloudinary.uploader.upload(
            listing.image.url
        );

        listing.image = {
            url: result.secure_url,
            filename: result.public_id
        };

        console.log("image uploaded");
    }

    // insert data
    await Listing.insertMany(initData.data);

    console.log("data was initialized");
};

initDb();