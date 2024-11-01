import { Blog } from "../models/blog.model.js";

const addBlog = async (req, res) => {
  const { image, title, content } = req.body;
  const { userid } = req.params;

  try {
    const newBlog = await Blog.create({
      title,
      content,
      image,
      blogid: userid,
    });

    res.status(201).json({
      message: "Blog created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};

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
    res.status(500).json({ message: "Error deleting blog", error });
  }
};

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
    res.status(500).json({ message: "Error updating blog", error });
  }
};

const retrieveBlogs = async (req, res) => {
  const { userid } = req.params;

  try {
    const blogs = await Blog.find({ owner: userid });
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
    res.status(500).json({ message: "Server Error", error });
  }
};
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
    res.status(500).json({ message: "Server Error", error });
  }
};

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
    res.status(500).json({ message: "Server Error", error });
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
