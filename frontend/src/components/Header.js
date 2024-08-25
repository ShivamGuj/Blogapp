import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const id = useSelector((state) => state.user._id);
  return (
    <header className="fixed z-40 w-full bg-stone-100 py-2 px-4 sm:px-6 lg:px-8 border">
      <div className="flex justify-between items-center">
        <NavLink
          to="/"
          className="border rounded-lg p-2 font-semibold text-black hover:underline"
        >
          <span className="text-lg sm:text-xl">Blog App</span>
        </NavLink>
        {!id && (
          <div className="flex gap-3">
            <NavLink to="login">
              <button className="p-2 text-blue-700 hover:text-blue-600 hover:underline">
                Login
              </button>
            </NavLink>
            <NavLink to="register">
              <button className="p-2 text-blue-700 hover:text-blue-600 hover:underline">
                Register
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
