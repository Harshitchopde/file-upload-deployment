const express = require("express");
const { models } = require("mongoose");
const router = express.Router();
const {localfileupload,fileUpload} = require("../controllers/fileUpload.js")

router.post("/localfileupload/",localfileupload)
router.post("/fileUpload/",fileUpload)

module.exports = router;