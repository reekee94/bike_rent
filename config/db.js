require('dotenv').config();
const mongoose = require('mongoose');

//const db = process.env.MONGO_URL || "mongodb+srv://admin:112358@cluster0-b2x5p.mongodb.net/test?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:112358@cluster0-b2x5p.mongodb.net/test?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;
