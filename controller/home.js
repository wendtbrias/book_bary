const bookModel = require("../db/models/book");

module.exports = {
  getHomePage: async (req, res) => {
    try {
      const BookFind = await bookModel.find();
      res.render("layouts/main", {
        content: "../home/home",
        book: BookFind,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
