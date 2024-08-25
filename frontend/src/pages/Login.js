import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRedux } from "../redux/userSlice";
import { Link } from "react-router-dom";
import image2 from "../assets/image2.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://blogapp-9ngc.onrender.com/auth/login", {
        email,
        password,
      });
      console.log(response);
      if (!response) {
        console.log("Login failed");
        alert("Login failed");
        return;
      }
      dispatch(loginRedux(response.data));
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative overflow-hidden">
      <img
        src={image2}
        alt="Background"
        className="absolute inset-0 object-cover z-0 w-full h-full"
      />
      <div className="relative z-10 w-[90%] max-w-md bg-yellow-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center underline mb-4 text-black">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg px-2 py-2 mt-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Password :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg px-2 py-2 mt-1"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 rounded-lg shadow-md px-4 py-2 text-white hover:bg-blue-500"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="rounded-lg bg-yellow-800 hover:bg-yellow-700 text-white px-2 py-1"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
