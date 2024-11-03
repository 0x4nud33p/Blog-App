import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import {
  addBlog,
  removeBlog,
  updateBlog,
  retrieveBlogs,
  retrieveAllBlogs,
  retrieveLatestBlogs,
} from "../controllers/blog.controller.js";

const router = Router();

// Protected blog routes
router.post("/add", verifyJWT, addBlog);
router.delete("/remove/:id", verifyJWT, removeBlog);
router.put("/update/:id", verifyJWT, updateBlog);
router.get("/user/:userid", verifyJWT, retrieveBlogs);

// Public blog routes
router.get("/all", retrieveAllBlogs);
router.get("/latest", retrieveLatestBlogs);

export default router;
