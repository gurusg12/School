import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  MapPin, // Changed icon to MapPin for branches
  Eye, 
  EyeOff, 
  UserPlus 
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  // ✅ 1. MANUAL BRANCHES LIST
  const manualBranches = [
    "Main Campus",
    "North Wing",
    "South Campus",
    "City Center",
    "International Branch"
  ];
  
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    branch: "" // Changed 'role' to 'branch'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (Object.values(form).some(val => val === "")) {
      setError("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users-list")) || [];
    
    if (existingUsers.some(u => u.username === form.username)) {
        setError("Username already taken");
        return;
    }

    const newUser = {
      username: form.username,
      email: form.email,
      password: form.password, 
      branch: form.branch, // Saving branch instead of role
      createdAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem("users-list", JSON.stringify(existingUsers));
    
    // Save the branch selection for immediate session use if needed
    localStorage.setItem("user-branch", JSON.stringify(form.branch));

    alert("Registration Successful! 🎉");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-zinc-100 p-6 font-sans">
      <div className="absolute inset-0 bg-indigo-500/5 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <form
        onSubmit={handleRegister}
        className="relative w-full max-w-lg bg-zinc-900/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-2xl mb-4">
            <UserPlus className="text-indigo-400" size={28} />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">Create Account</h2>
          <p className="text-zinc-500 text-sm mt-2">Register for your specific branch</p>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Username</label>
            <Input icon={<User size={16}/>} name="username" placeholder="johndoe" value={form.username} onChange={handleChange} />
          </div>

          {/* ✅ 2. BRANCH SELECTOR */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Select Branch</label>
            <div className="flex items-center gap-3 bg-zinc-950/50 border border-zinc-800 px-4 py-2.5 rounded-2xl focus-within:border-indigo-500/50 transition-all group">
              <MapPin size={16} className="text-zinc-600 group-focus-within:text-indigo-400" />
              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-sm text-zinc-300 cursor-pointer appearance-none"
                required
              >
                <option value="" className="bg-zinc-900">Select Branch...</option>
                {manualBranches.map((branch) => (
                  <option key={branch} value={branch} className="bg-zinc-900">
                    {branch}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-4 space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
          <Input icon={<Mail size={16}/>} name="email" type="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Password</label>
            <div className="relative flex items-center gap-3 bg-zinc-950/50 border border-zinc-800 px-4 py-2.5 rounded-2xl focus-within:border-indigo-500/50 transition-all group">
              <Lock size={16} className="text-zinc-600 group-focus-within:text-indigo-400" />
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••"
                className="bg-transparent w-full outline-none text-sm"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="text-zinc-600 hover:text-zinc-300">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Confirm</label>
            <Input icon={<Lock size={16}/>} name="confirmPassword" type="password" placeholder="••••••" value={form.confirmPassword} onChange={handleChange} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
        >
          Create Account
        </button>

        <p className="text-sm text-center mt-8 text-zinc-500">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-indigo-400 font-semibold cursor-pointer hover:underline underline-offset-4">
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

// Reusable Input
const Input = ({ icon, ...props }) => (
  <div className="flex items-center gap-3 bg-zinc-950/50 border border-zinc-800 px-4 py-2.5 rounded-2xl focus-within:border-indigo-500/50 transition-all group">
    <span className="text-zinc-600 group-focus-within:text-indigo-400 transition-colors">{icon}</span>
    <input {...props} className="bg-transparent w-full outline-none placeholder-zinc-700 text-sm text-zinc-200" />
  </div>
);

export default Register;