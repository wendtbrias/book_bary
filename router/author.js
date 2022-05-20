const express = require('express');
const router = express.Router();
const { getAuthorAdd,getAuthorPage,getAuthorUpdate,deleteAuthor,postAuthor,updateAuthor,getViewAuthor } = require("../controller/author");

router.route("/").get(getAuthorPage).post(postAuthor).delete(deleteAuthor).put(updateAuthor);
router.get("/add" ,getAuthorAdd);
router.get("/update/:id",getAuthorUpdate);
router.get("/view/:id",getViewAuthor);

module.exports = router;