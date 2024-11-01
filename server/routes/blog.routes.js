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

//protected routes
router.post("/addblog", verifyJWT, addBlog);
router.post("/removeblog", verifyJWT, removeBlog);
router.post("/updateblog", verifyJWT, updateBlog);
router.post("/retrieveblogs", verifyJWT, retrieveBlogs);
router.post("/retrieveAllBlogs", retrieveAllBlogs);
router.post("/retrieveLatestBlogs", retrieveLatestBlogs);

export default router;
