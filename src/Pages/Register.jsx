import React, { useState, useEffect } from "react";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    trusts : "",
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("trusts")) || [];
    setUsers(storedUsers);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.password || !form.branch || !form.role) {
      alert("All fields required");
      return;
    }

    const updatedUsers = [...users, form];
    setUsers(updatedUsers);
    localStorage.setItem("trusts", JSON.stringify(updatedUsers));

    setForm({
      username: "",
      password: "",
      branch: "",
      role: "",
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-6">

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Register User
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

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

            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={form.branch}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />

           <input
              type="text"
              name="role"
              placeholder="Role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <option value="">

            </option>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Add User
            </button>
          </form>
        </div>

        {/* USERS LIST */}
        <div className="bg-white rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[500px]">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Users List
          </h2>

          {users.length === 0 ? (
            <p className="text-gray-500">No users added yet</p>
          ) : (
            <div className="space-y-3">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <p className="font-semibold text-gray-700">
                      {user.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user.branch} • {user.role}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default Register;