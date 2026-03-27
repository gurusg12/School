import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Trust = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("trusts")) || [];
    const foundUser = users.find(
      (u) =>
        u.username === form.username &&
        u.password === form.password
    );

    if (!foundUser) {
      alert("Invalid credentials");
      return;
    }

    // save current login (optional)
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    // redirect based on branch + role
    const { branch, role } = foundUser;

    navigate(`/${branch}/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Manager Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Trust;