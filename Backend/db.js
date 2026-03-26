const mongoose = require('mongoose');

function DbConnection(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDb connected.."))
    .catch((error)=> console.log("error " , error))
}

module.exports = DbConnection;