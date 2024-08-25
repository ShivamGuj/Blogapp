import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import BlogShow from "../components/BlogShow";
import { ImCross } from "react-icons/im";
import image4 from "../assets/image4.avif";
import Loading from "../components/Loading";
import { CiSearch } from "react-icons/ci";

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [showBlog, setShowBlog] = useState(null);
  const [showFull, setShowFull] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const itemsPerPage = 6;

  const truncateContent = (content, wordLimit = 40) => {
    const words = content.split(" ");
    if (words.length <= wordLimit) return content;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + itemsPerPage);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => prev - itemsPerPage);
  };

  const id = useSelector((state) => state.user._id);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/blogs/getblog/${id}`
        );
        if (Array.isArray(response.data)) {
          setMyBlogs(response.data);
        } else if (response.data) {
          setMyBlogs([response.data]);
        } else {
          setMyBlogs([]);
        }
      } catch (error) {
        alert("Failed to fetch blogs. Please try again.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchMyBlogs();
    }
  }, [id]);

  const handleShowBlog = (blog) => {
    setShowBlog(blog);
    setShowFull(true);
  };

  const slicedBlogs = useMemo(() => {
    return myBlogs.slice(currentIndex, currentIndex + itemsPerPage);
  }, [myBlogs, currentIndex, itemsPerPage]);

  const filteredBlogs = useMemo(() => {
    return slicedBlogs.filter((blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search , slicedBlogs]);

  return (
    <div className="overflow-hidden flex flex-col justify-center items-center min-h-screen relative">
      <img
        src={image4}
        alt=""
        className="object-cover absolute inset-0 w-full h-full z-0 opacity-50 brightness-50"
      />
      {!showFull && (
        <div className="flex flex-col items-center z-50 p-2 rounded-lg w-min mt-12 lg:mt-0 lg:absolute lg:top-0" >
          <div className="flex items-center border rounded-lg overflow-hidden">
            <CiSearch color="black" className="ml-2 mr-2 text-xl" />
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder="Search Blogs"
              className="flex-grow px-2 py-1 border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      )}
      {loading ? (
        <Loading />
      ) : showFull ? (
        <div className="relative w-full max-w-4xl md:max-w-5xl lg:max-w-4xl p-2 z-10 mt-20 bg-white h-fit rounded">
          <button
            onClick={() => setShowFull(false)}
            className="bg-red-700 hover:bg-red-600 px-2 py-1 shadow border rounded text-white absolute top-2 right-2 z-30"
          >
            <ImCross />
          </button>
          <BlogShow blog={showBlog} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 z-10 mt-7 w-full px-4">
          <h1 className="text-2xl font-bold underline text-center">My Blogs</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 p-3 bg-white w-full max-w-6xl border rounded-lg shadow-lg overflow-auto h-[100vw] sm:h-[60vw] lg:h-[30vw]">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-2 rounded shadow-lg border flex flex-col justify-center h-min"
              >
                <h2 className="text-base lg:text-lg font-bold">{blog.title}</h2>
                <p className="text-gray-700 text-sm lg:text-base">
                  {truncateContent(blog.content)}
                </p>
                <div>
                  <button
                    onClick={() => handleShowBlog(blog)}
                    className="text-blue-500 hover:text-blue-700 hover:underline text-sm lg:text-base"
                  >
                    Show Full
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 w-full max-w-4xl gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="rounded border px-4 py-2 shadow bg-stone-600 hover:bg-stone-500 text-white w-full max-w-xs"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex + itemsPerPage >= myBlogs.length}
              className="rounded border px-4 py-2 shadow bg-stone-600 hover:bg-stone-500 text-white w-full max-w-xs"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
