const mongoose = require('mongoose');

const database = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
       console.log('Connected to the Database')
    }
    catch(error){
        console.log('Error', error)
    }
}

module.exports = database;