const mongoose = require("mongoose");
const bookModel = require("../db/models/book");
const authorModel = require("../db/models/author");

const imageMimeTypes = ["image/jpeg", "image/png", "images/gif"];

function saveCoverImage(book, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    book.coverImage = new Buffer.from(cover.data, "base64");
    book.coverImageType = cover.type;

    return book;
  }
}

async function renderSuccessPage(res, hasMsg = false) {}

async function renderErrorPage(res, page, hasError = false, errorMsg) {
  const author = await authorModel.find();
  if (hasError) {
    res.render("layouts/main", {
      content: page,
      error: errorMsg,
      author,
    });
  }
}

module.exports = {
  getBookpage: async (req, res) => {
    let query = bookModel.find();


    if (req.query.title != null && req.query.title != "") {
      query = query.regex("title", new RegExp(req.query.title, "i"));
    }

    if (
      req.query.publishDatebefore != null &&
      req.query.publishDatebefore != ""
    ) {
      query = query.lte("publishDate", req.query.publishDatebefore);
    }

    if (req.query.publishDateafter != null && req.query.publishDatefter != "") {
      query = query.gte("publishDate", req.query.publishDateafter);
    }


    try {
      let bookFind = await query.exec();
      if(bookFind.length == 0) {
         bookFind = await bookModel.find();
         return res.render("layouts/main" , {
           content:"../book/index",
           error:"cannot found book",
           book:bookFind
         });
      }
      res.render("layouts/main", {
        content: "../book/index",
        book: bookFind,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getBookAdd: async (req, res) => {
    try {
      const author = await authorModel.find();
      const book = await bookModel.find();
      res.render("layouts/main", {
        content: "../book/add",
        book,
        author,
      });
    } catch (err) {
      console.log(err);
    }
  },

  getBookUpdate: async (req, res) => {
    try {
      const book = await bookModel.findOne({_id:req.params.id});
      const author = await authorModel.find();
      res.render("layouts/main" , {
        content:"../book/update",
        book:book ,
        author
      })
    } catch (err) {
      console.log(err);
    }
  },

  getBookDetail: async (req, res) => {
    try {
      const singleExecute = await bookModel
        .findById(req.params.id)
        .populate("author")
        .exec();

      res.render("layouts/main", {
        content: "../book/detail",
        book: singleExecute,
      });
    } catch (err) {
      renderErrorPage(
        res,
        "../book/detail",
        true,
        "cannot find author of the book"
      );
    }
  },

  postBook: async (req, res) => {
    const init = new bookModel({
      title: req.body.title,
      pageCount: req.body.pageCount,
      description: req.body.description,
      author: req.body.author,
      publishDate: req.body.publishDate,
    });

    saveCoverImage(init, req.body.cover);

    try {
      await init.save();
      res.redirect("/book");
    } catch (err) {
      console.log(err);
      renderErrorPage(res, "../book/add", true, "Cannot create the book");
    }
  },

  deleteBook: async (req, res) => {
    try {
      const bookDel = await bookModel.deleteOne({ _id: req.body.id });
      res.redirect("/book");
    } catch (err) {
      console.log(err);
    }
  },

  updateBook: async (req, res) => {
    const optionsSet = {
      title:req.body.title,
      pageCount:req.body.pageCount,
      description:req.body.description,
      publishDate:req.body.publishDate,
      author:req.body.author,
    }
     try {
       const updateBook = await bookModel.updateOne({ _id:req.body.id } , {$set:optionsSet});
       res.redirect("/book");
     }
    catch(err) {
       console.log(err);
    }
  },
};
