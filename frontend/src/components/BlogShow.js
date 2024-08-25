import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogShow = ({ blog }) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for submitting or deleting
  const userId = useSelector((state) => state.user._id);
  const username = useSelector((state) => state.user.name);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();

      if (!title || !content) {
        alert("Both title and content are required.");
        return;
      }

      setLoading(true);

      try {
        const response = await axios.put(
          `https://blogapp-9ngc.onrender.com/blogs/update/${blog.id}`,
          { title, content },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);
        setEdit(false);
      } catch (error) {
        alert("Failed to update blog. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [title, content, blog.id, token]
  );

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    setLoading(true);

    try {
      await axios.delete(`https://blogapp-9ngc.onrender.com/blogs/delete/${blog.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (error) {
      alert("Failed to delete blog. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment) {
      alert("Comment cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `https://blogapp-9ngc.onrender.com/blogs/add-comment`,
        { comment, blogId: blog.id, userId, username },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComment("");
      setComments((prevComments) => [...prevComments, response.data]); // Optimistically update comments
    } catch (error) {
      alert("Failed to add comment. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://blogapp-9ngc.onrender.com/blogs/get-comments/${blog.id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [blog.id]);

  return (
    <div className="flex justify-center">
      {edit ? (
        <div className="w-screen md:w-[80vw] border p-3 rounded shadow-lg mt-[9vw] md:mt-[3vw] z-10 max-h-[140vw] sm: lg:max-h-[42vw] overflow-y-auto bg-stone-200">
          <form
            onSubmit={submitHandler}
            className="mt-5 flex flex-col justify-center w-full"
          >
            <div>
              <label className="font-semibold text-lg">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="rounded-lg px-2 ml-2 border"
              />
            </div>
            <div className="flex flex-col mt-3">
              <label className="font-semibold text-base lg:text-lg">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="rounded-lg px-2 mt-2 w-full h-[50vh] md:w-[55vw] md:h-[50vh] border"
              />
            </div>
            <div className="flex justify-between mt-5">
              <button
                type="submit"
                className="border rounded-lg bg-green-400 hover:bg-green-300 py-1 px-2 shadow"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => setEdit(false)}
                className="border rounded-lg bg-red-400 hover:bg-red-300 py-1 px-2 shadow"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-screen md:w-[80vw] border p-3 rounded shadow-lg mt-[9vw] md:mt-[3vw] bg-white z-10 max-h-[140vw] sm:max-h-[] lg:max-h-[38vw] overflow-y-auto">
          <h2 className="font-bold text-lg lg:text-xl underline">
            {blog.title}
          </h2>
          <p className="mt-4 text-base lg:text-lg">{blog.content}</p>
          <p className="mt-1 font-semibold">- by {blog.username}</p>
          {userId === blog.user_id && (
            <div className="mt-7 flex justify-between">
              <button
                onClick={() => setEdit(true)}
                className="border rounded-lg bg-yellow-400 hover:bg-yellow-300 py-1 px-2 shadow"
                disabled={loading}
              >
                {loading ? "Loading..." : "Edit"}
              </button>
              <button
                onClick={handleDelete}
                className="border rounded-lg bg-red-400 hover:bg-red-300 py-1 px-2 shadow"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
          <div className="mt-7">
            <p className="font-bold underline">Comments</p>
            {userId && (
              <form onSubmit={handleComment} className="flex flex-col">
                <input
                  type="text"
                  placeholder="Add a comment"
                  className="border rounded-lg p-1 mt-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div>
                  <button
                    type="submit"
                    className="border rounded-lg bg-blue-400 hover:bg-blue-300 py-1 px-2 shadow mt-2"
                    disabled={loading}
                  >
                    {loading ? "Adding..." : "Add Comment"}
                  </button>
                </div>
              </form>
            )}
            <div className="mt-3 flex flex-col gap-2">
              {comments.length > 0 ? (
                comments.map((cmt) => (
                  <div key={cmt.id} className="border rounded-lg p-2 mt-2">
                    <p className="font-semibold underline">{cmt.username}</p>
                    <p>{cmt.comment}</p>
                  </div>
                ))
              ) : (
                <p>No comments yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogShow;
