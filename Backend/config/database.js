// ...........Importing NPM Packages............

const mongoose=require("mongoose")
require("dotenv").config()

// Defining Connection with MongoDB Atlas
const connection=mongoose.connect(process.env.MongoURL)


module.exports={
    connection
}