import { Blog } from "../models/blog.model.js";

/**
 * Adds a new blog post.
 * Requires: `heading`, `content`, `image` in body and `userid` in query parameters.
 */
const addBlog = async (req, res) => {
  const { image, heading, content } = req.body;
  const { userid } = req.query;

  if (!image || !heading || !content) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const newBlog = await Blog.create({
      title: heading,
      content,
      image,
      owner: userid,
    });
    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating blog", error: error.message });
  }
};

/**
 * Deletes an existing blog post by ID.
 */
const removeBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
      blog: deletedBlog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};

/**
 * Updates an existing blog post by ID.
 * Accepts updated `title`, `content`, and `image` in the request body.
 */
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, image },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating blog", error: error.message });
  }
};

/**
 * Retrieves all blogs for a specific user by their user ID.
 */
const retrieveBlogs = async (req, res) => {
  const { userid } = req.params; 

  try {
    const blogs = await Blog.find({ owner: userid })
      .populate("owner", "username")
      .exec();

    if (blogs.length === 0) {
      return res
        .status(404)
        .json({ message: "User has not posted any blogs yet" });
    }

    res.status(200).json({
      message: "Blogs retrieved successfully",
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


/**
 * Retrieves all blogs in the database.
 */
const retrieveAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs available." });
    }

    res.status(200).json({
      message: "Blogs retrieved successfully",
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

/**
 * Retrieves the latest blogs sorted by creation date.
 */
const retrieveLatestBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    if (blogs.length === 0) {
      return res.status(404).json({ message: "No blogs available." });
    }

    res.status(200).json({
      message: "Blogs retrieved successfully",
      blogs: blogs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {
  addBlog,
  removeBlog,
  updateBlog,
  retrieveBlogs,
  retrieveAllBlogs,
  retrieveLatestBlogs,
};
