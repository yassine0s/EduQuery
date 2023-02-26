const {create, get_all, get_answers, remove} = require("../controllers/answers.controller") ;
const express = require('express');
const router = express.Router();

// Get All
// router.get("/", get_all);

// Get one
router.get("/:qid", get_answers);

// Create
router.post("/", create);

// Delete
router.delete("/:id", remove)

// Hide

// Solve



module.exports = router;
