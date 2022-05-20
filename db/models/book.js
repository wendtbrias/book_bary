const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type:String,
        required:[true, 'title field is required']
    } ,
    publishDate: {
        type:Date,
        required:true
    },
    pageCount: {
        type:Number,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'authors',
        required:true
    },
    description: {
        type:String
    },
    coverImage:{
        type:Buffer
    },
    coverImageType:{
        type:String
    }
});

bookSchema.virtual("coverImagePath").get(function() {
    if(this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`;
    }
})

const bookModel = mongoose.model('books' , bookSchema);

module.exports = bookModel;