import {Router} from "express";
import {create, get_all, get_one, remove} from "../controllers/users.contoller";

const router = Router();

// Get All
router.get("/", get_all);

// Get one
router.get("/:id", get_one);

// Create
router.post("/", create);

// Delete
router.delete("/:id", remove)

// Hide

// Solve



export default router;