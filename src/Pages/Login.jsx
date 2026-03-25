import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, User, ShieldCheck } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [availableRoles, setAvailableRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const [form, setForm] = useState({
    username: "",
    password: "",
    roles: "" 
  });

  // ✅ Fetch unique roles from registered users on mount
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users-list")) || [];
    const rolesInSystem = [...new Set(users.map((user) => user.role))];
    setAvailableRoles(rolesInSystem);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users-list")) || [];

    // ✅ Match Username + Password + Role
    const validUser = users.find(
      (u) => 
        u.username === form.username && 
        u.password === form.password && 
        u.role === form.roles
    );

    if (!validUser) {
      setError("Invalid credentials or role mismatch");
      return;
    }

    // ✅ Save Session Info
    localStorage.setItem("active-session", JSON.stringify({
      username: validUser.username,
      role: validUser.role,
      loginTime: new Date().toISOString()
    }));
    
    localStorage.setItem("roles", JSON.stringify(validUser.role));
    localStorage.setItem("isLoggedIn", "true");

    setError("");
    alert(`Access Granted: ${validUser.username} (${validUser.role})`);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-zinc-100 p-6 font-sans">
      <div className="absolute inset-0 bg-indigo-500/5 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-zinc-900/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Secure Login
          </h2>
          <p className="text-zinc-500 text-sm mt-2">Identify yourself to enter the portal</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] text-center font-bold uppercase tracking-wider">
            {error}
          </div>
        )}

        {/* Username Field */}
        <div className="mb-5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Username</label>
          <div className="flex items-center gap-3 bg-zinc-950/50 border border-zinc-800 px-4 py-3 rounded-2xl focus-within:border-indigo-500/50 transition-all group">
            <User size={18} className="text-zinc-600 group-focus-within:text-indigo-400" />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="e.g. admin_user"
              className="bg-transparent w-full outline-none text-sm placeholder-zinc-700"
              required
            />
          </div>
        </div>

        {/* Role Selection (Populated from LocalStorage) */}
        <div className="mb-5">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Assigned Role</label>
          <div className="flex items-center gap-3 bg-zinc-950/50 border border-zinc-800 px-4 py-3 rounded-2xl focus-within:border-indigo-500/50 transition-all group">
            <ShieldCheck size={18} className="text-zinc-600 group-focus-within:text-indigo-400" />
            <select
              name="roles"
              value={form.roles}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-sm text-zinc-300 cursor-pointer appearance-none"
              required
            >
              <option value="" className="bg-zinc-900">Choose your role...</option>
              {availableRoles.map((role) => (
                <option key={role} value={role} className="bg-zinc-900">
                  {role.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-8">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Secret Key</label>
          <div className="relative flex items-center gap-3 bg-zinc-950/50 border border-zinc-800 px-4 py-3 rounded-2xl focus-within:border-indigo-500/50 transition-all group">
            <Lock size={18} className="text-zinc-600 group-focus-within:text-indigo-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-transparent w-full outline-none text-sm placeholder-zinc-700"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
        >
          Sign In
        </button>

        <p className="text-xs text-center mt-8 text-zinc-500">
          Accessing authorized system.{" "}
          <span 
            onClick={() => navigate("/register")}
            className="text-indigo-400 font-semibold cursor-pointer hover:underline underline-offset-4"
          >
            Create account
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;