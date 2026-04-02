import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BLogin = () => {
  const [personName, setPersonName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const Navigate = useNavigate()
useEffect(()=>{
localStorage.removeItem("loggedBranch")
}, [])
  const handleLogin = (e) => {
    e.preventDefault();

    if (!personName || !branchName || !code) {
      setMessage("⚠️ Please fill all fields");
      return;
    }

    const branches = JSON.parse(localStorage.getItem("branches")) || [];

    const found = branches.find(
      (b) =>
        b.branchName.toLowerCase() === branchName.toLowerCase() &&
        b.code === code
    );

    if (found) {
      const loginData = {
        personName,
        branchName: found.branchName,
        address: found.address,
        code: found.code,
        loginTime: new Date().toLocaleString(),
      };

      localStorage.setItem("loggedBranch", JSON.stringify(loginData));

      setMessage("✅ Login Successful");
      Navigate('/branch')
    } else {
      setMessage("❌ Invalid Branch Name or Code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-center mb-6">
          Branch Login
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Your Name"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Branch Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BLogin;