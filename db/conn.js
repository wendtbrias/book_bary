const mongoose = require('mongoose');

let uri = `mongodb+srv://wendi:${process.env.PASSWORD}@cluster0.wecrb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const options  = {
    useNewUrlParser:true ,
    useUnifiedTopology:true
}

 async function conn(port = undefined) {
    try {
        await mongoose.connect(uri,options);
        console.log(`run on port : ${port}`)
    } catch(err) {
        console.log(err);
    }
}

module.exports = conn;