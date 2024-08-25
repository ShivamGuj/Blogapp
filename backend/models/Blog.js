const pool = require("../config/db");

// Get all blogs
const getBlogs = async () => {
    const result = await pool.query("SELECT * FROM blogs");
    return result.rows;
};

// Create a new blog
const createBlog = async (title, content, userId, username) => {
    const result = await pool.query(
        "INSERT INTO blogs (title, content, user_id, username) VALUES ($1, $2 , $3, $4) RETURNING *",
        [title, content, userId, username]
    );
    return result.rows[0];
};

// Get a blog by ID
const getBlogById = async (id) => {
    const result = await pool.query("SELECT * FROM blogs WHERE user_id = $1", [id]);
    return result.rows;
};

// Update a blog by ID
const updateBlog = async (id, title, content) => {
    const result = await pool.query(
        "UPDATE blogs SET title = $1, content = $2 WHERE id = $3 RETURNING *",
        [title, content, id]
    );
    console.log(result);
    return result.rows[0];
};

// Delete a blog by ID
const deleteBlog = async (id) => {
    const result = await pool.query("DELETE FROM blogs WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

const addComment = async (blogId, comment, userId, username) => {
    const result = await pool.query(
        "INSERT INTO comments (comment, blog_id, user_id, username) VALUES ($1, $2, $3, $4) RETURNING *",
        [comment, blogId, userId, username]
    );
    return result.rows[0];
};

const getComments = async (id) => {
    const result = await pool.query("SELECT * FROM comments WHERE blog_id = $1", [id]);
    return result.rows;
}

module.exports = {
    getBlogs,
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    addComment,
    getComments,
};
