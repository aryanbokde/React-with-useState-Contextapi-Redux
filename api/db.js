const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;

const connectToMongo = () => {
    mongoose.connect(mongoUrl, () => {
        console.log("Mango DB connected sucessfully");
    });
}

module.exports = connectToMongo;