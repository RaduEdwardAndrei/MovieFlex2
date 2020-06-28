const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
 
// conectare la baza de date
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('MongoDB database connection established succesfully');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};
 
module.exports = connectDB;