import axios from "axios";
import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import image3 from "../assets/image3.avif";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.user._id);
  const username = useSelector((state) => state.user.name);

  const submitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      if (!title || !content) {
        setError("Title and content are required!");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.post(
          "http://localhost:5000/blogs/create-blog",
          {
            title,
            content,
            userId,
            username,
          }
        );
        console.log(response);
        alert("Blog created successfully!");
        setTitle("");
        setContent("");
      } catch (error) {
        setError("Failed to create blog. Please try again.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [title, content, userId, username]
  );

  return (
    <div className="flex justify-center items-center overflow-hidden min-h-screen relative">
      <img
        src={image3}
        alt="blog"
        className="absolute object-cover w-full h-full z-0 opacity-50 brightness-50"
      />
      <div className="relative z-10 border mt-10  flex justify-center items-center flex-col p-6 rounded-lg shadow-lg bg-blue-300 max-w-lg md:max-w-3xl w-full">
        <h1 className="font-semibold p-3 rounded-lg bg-white text-xl shadow-md">
          Create Blog
        </h1>
        <form
          onSubmit={submitHandler}
          className="mt-5 flex flex-col w-full gap-4"
        >
          {error && (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          )}
          <div className="flex flex-col">
            <label className="font-semibold text-lg">Title :</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-lg px-3 py-2 mt-1 border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-lg">Content :</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="rounded-lg px-3 py-2 mt-1 border h-40 focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-y-auto md:max-h-[20vw]"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`rounded-lg shadow-md mt-4 px-6 py-2 bg-blue-700 text-white ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
