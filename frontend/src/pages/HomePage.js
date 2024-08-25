import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { logoutRedux } from "../redux/userSlice";
import image1 from "../assets/image1.webp";
import Header from "../components/Header";

const HomePage = () => {
  const { _id, name } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutRedux());
  };

  const isHome = location.pathname === "/";

  return (
    <div>
      <Header />
      <Outlet />
      {isHome && (
        <div className="flex justify-center">
          <div className="overflow-hidden fixed h-full w-full z-0">
            <img src={image1} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="z-10 bg-white border rounded-lg flex flex-col justify-center mt-20 sm:mt-[10vw] px-6 py-8 sm:px-12 sm:py-12 gap-5 shadow-xl w-[90%] sm:w-[40%] lg:w-[25%] mx-auto">
            {_id ? (
              <div className="font-semibold flex justify-center">
                <span className="text-xl text-black">Welcome, {name}</span>
              </div>
            ) : (
              <div className="font-semibold flex justify-center">
                <span className="text-xl text-black">Welcome, Guest</span>
              </div>
            )}
            {_id && (
              <div className="border p-2 rounded-lg bg-blue-700 text-white font-semibold flex justify-center shadow-lg hover:bg-blue-500 cursor-pointer">
                <Link to="/create-blog">Create a Blog</Link>
              </div>
            )}
            <div className="border p-4 rounded-lg bg-blue-700 text-white font-semibold flex justify-center shadow-lg hover:bg-blue-500 cursor-pointer">
              <Link to="/blogs">See All Available Blogs</Link>
            </div>
            {_id && (
              <div className="border p-2 rounded-lg bg-blue-700 text-white font-semibold flex justify-center shadow-lg hover:bg-blue-500 cursor-pointer">
                <Link to="/my-blogs">My Blogs</Link>
              </div>
            )}
            {_id && (
              <div className="text-white font-semibold flex justify-center cursor-pointer">
                <button
                  className="bg-green-700 border p-1 rounded-md shadow-lg hover:bg-green-600"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
