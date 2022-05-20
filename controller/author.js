const authorModel = require("../db/models/author");
const bookModel = require("../db/models/book");

module.exports = {
    getAuthorAdd: async (req,res) => {
        try {
            const authorFind = await authorModel.find();
            res.render("layouts/main" , {
                content:"../author/add",
                data:authorFind,
            });
        } catch(err) {
            console.log(err);
        }
    },
    getAuthorUpdate: async (req,res) => {
        try {
           const authorFind = await authorModel.findOne({_id:req.params.id});
           console.log(authorFind);
           res.render("layouts/main" , {
               content:"../author/update",
               data:authorFind
           });
        } catch(err) {
            console.log(err);
        }
    },
    getAuthorPage: async (req,res) => {
        let query = authorModel.find();
        if(req.query.name != null && req.query.name != '') {
            query = query.regex('name' , new RegExp(req.query.name , 'i'));
        }
         try {
             const authorFind = await query.exec();
             res.render("layouts/main" , {
                 content:"../author/index",
                 data:authorFind
             });
         } catch(err) {
             console.log(err);
         }
    },

    getViewAuthor: async (req,res) => {
        try {
            const authorFind = await authorModel.findOne({ _id:req.params.id });
            const bookFind = await bookModel.find({ author:authorFind._id });
            res.render("layouts/main" , {
                content:"../author/authorView",
                book:bookFind,
                author:authorFind
            });
        } catch(err) {
            console.log(err);
        }
    },

    postAuthor: async (req,res) => {
        const init = new authorModel(req.body);
       try {
           await init.save();
           res.redirect("/author");
       }  catch(err) {
           console.log(err);
       }
    },
    deleteAuthor: async (req,res) => {
        try {
            await authorModel.deleteOne({ _id:req.body.id });
            res.redirect("/author");
        } catch(err) {
            console.log(err);
        }
    },
    updateAuthor: async (req,res) => {
         try {
             authorModel.updateOne({ _id:req.body.id } ,{ $set:{ name:req.body.name ,penName:req.body.penName } })
                 .then(() => res.redirect("/author"));
         } catch(err) {
             console.log(err);
         }
    }
}