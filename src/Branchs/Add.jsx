import React, { useState, useEffect } from "react";

const Add = () => {
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("branches")) || [];
    setBranches(saved);
  }, []);

  const generateCode = (name, addr) => {
    const namePart = name.slice(0, 3).toUpperCase();
    const addrPart = addr.slice(0, 3).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `BR-${namePart}-${addrPart}-${random}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!branchName || !address) return;

    const newBranch = {
      id: Date.now(),
      branchName,
      address,
      code: generateCode(branchName, address),
    };

    const updated = [...branches, newBranch];
    setBranches(updated);
    localStorage.setItem("branches", JSON.stringify(updated));

    setBranchName("");
    setAddress("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Form */}
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Add Branch
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition"
          >
            Add Branch
          </button>
        </form>
      </div>

      {/* Branch List */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Existing Branches
        </h2>

        {branches.length === 0 ? (
          <p className="text-gray-500">No branches added yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {branches.map((b) => (
              <div
                key={b.id}
                className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {b.branchName}
                </h3>

                <p className="text-gray-600 mt-2">{b.address}</p>

                <div className="mt-4">
                  <span className="text-sm text-gray-500">Code:</span>
                  <p className="font-mono text-blue-600">{b.code}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Add;