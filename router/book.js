const express = require("express");
const router = express.Router();

const {
  getBookpage,
  getBookAdd,
  postBook,
  deleteBook,
  getBookDetail,
    updateBook,
    getBookUpdate
} = require("../controller/book");

router.route("/").get(getBookpage).post(postBook).delete(deleteBook).put(updateBook);
router.get("/add", getBookAdd);
router.get("/:id",getBookDetail);
router.get("/update/:id" ,getBookUpdate);

module.exports = router;
