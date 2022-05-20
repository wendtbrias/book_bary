const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema({
    name:{
        type:String,
        required:[true , 'name is required']
    },
    penName: {
        type:String,
        required:false
    }
});

const authorModel = mongoose.model("authors" , authorSchema);

module.exports = authorModel;