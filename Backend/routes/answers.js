const {create, accept, get_answers, remove} = require("../controllers/answers.controller") ;
const express = require('express');
const router = express.Router();

// Get one
router.get("/:qid", get_answers);

// accept
router.put("/:aid", accept);

// Create
router.post("/", create);

// Delete
router.delete("/:id", remove)


module.exports = router;
