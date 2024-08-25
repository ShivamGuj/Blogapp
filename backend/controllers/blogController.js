const Blog = require("../models/Blog");

// Get all blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.getBlogs();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const { title, content, userId, username } = req.body;
        const newBlog = await Blog.createBlog(title, content, userId, username);
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
};

// Get a blog by ID
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.getBlogById(id);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a blog by ID
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedBlog = await Blog.updateBlog(id, title, content);
        if (updatedBlog) {
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a blog by ID
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.deleteBlog(id);
        if (deletedBlog) {
            res.json({ message: "Blog deleted successfully", blog: deletedBlog });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addComment = async (req, res) => {
    try {
        const { comment,blogId, userId, username } = req.body;
        const newComment = await Blog.addComment(blogId, comment, userId, username);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getComments = async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await Blog.getComments(id);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getBlogs,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    addComment,
    getComments,
};
