import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="create-blog" element={<CreateBlog />} />
          <Route path="my-blogs" element={<MyBlogs />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
