
const {create, get_all, get_one, remove,update,login,signin,changepass,admin_login,reset} = require("../controllers/users.controller") ;
const express = require('express');
const router = express.Router();

// Get All
router.get("/", get_all);

// Get by email and password
router.post("/login", login);
router.post("/login_admin", admin_login);
router.put("/changepass", changepass);

// Reset
router.post("/reset", reset);


router.get("/signin", signin);
// Get one
router.get("/:id", get_one);

// Create
router.post("/", create);

// Delete
router.delete("/:id", remove)

// Update
router.put("/:id", update)




module.exports = router;
