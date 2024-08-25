import React, { useState } from "react";
import image2 from "../assets/image2.webp";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password }),
      });

      if (!response) {
        console.log("Register failed");
        alert("Register failed");
        return;
      }
      console.log(response);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Register failed", error);
    } finally {
      setLoading(false);
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
        <h1 className="text-xl font-semibold text-center underline mb-4 text-black">
          Register
        </h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Full Name:</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="rounded-lg px-2 py-2 mt-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-lg px-2 py-2 mt-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Password:</label>
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
              disabled={loading}
              className="bg-blue-600 rounded-lg shadow-md px-4 py-2 text-white hover:bg-blue-500"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="rounded-lg bg-yellow-800 hover:bg-yellow-700 text-white px-2 py-1"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
