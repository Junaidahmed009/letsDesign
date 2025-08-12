import React, { useEffect, useState } from "react";
import { signUpUser, loginUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(false); // false = signup, true = login
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  //async
  async function submitData(e) {
    e.preventDefault();
    if (page === false) {
      if (formData.password !== formData.confirmPassword) {
        return alert("Both Passwords did not match");
      }
      const data = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      try {
        const res = await signUpUser(data);
        if (res.status === 201) {
          alert(res.data.message);
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          // navigate("/");
          setPage(true);
        }
      } catch (error) {
        if (error.status === 401) {
          alert("user Already exists");
        } else {
          alert("Some internal error" + error);
        }
      }
    } else {
      const data = {
        email: formData.email,
        password: formData.password,
      };
      try {
        const res = await loginUser(data);
        if (res.status === 200) {
          // alert(res.data.message);
          setFormData({
            email: "",
            password: "",
          });
          navigate("/");
          // setPage(true);
        }
      } catch (error) {
        if (error.status === 401) {
          alert("User not found.");
        } else if (error.status === 402) {
          alert("Invalid Password");
        } else {
          alert("Some internal error" + error);
        }
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {page ? "Login" : "Signup"}
        </h2>

        <form onSubmit={submitData} className="space-y-4">
          {!page && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {!page && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {page ? "Login" : "Signup"}
          </button>
        </form>

        <div className="text-center mt-4">
          {page ? (
            <p>
              Create account?{" "}
              <span
                onClick={() => setPage(false)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Signup
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setPage(true)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
