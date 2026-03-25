import React, { useEffect, useState } from "react";
import {
  Search,
  Phone,
  MapPin,
  Calendar,
  IndianRupee,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";

const DegreeColleges = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("degreeColleges")) || [];
    setData(stored);
  }, []);

  // 🔍 Search
  const filteredData = data.filter((item) =>
    Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  // 📊 Calculations
  const totalStudents = filteredData.length;

  const totalFee = filteredData.reduce(
    (sum, s) => sum + Number(s.Fee || 0),
    0
  );

  const totalPaid = filteredData.reduce(
    (sum, s) => sum + Number(s.Paid || 0),
    0
  );

  const totalPending = totalFee - totalPaid;

  const collectionRate = totalFee
    ? ((totalPaid / totalFee) * 100).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="text-blue-500" />
            Students Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage student fee records efficiently
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 📊 Stats */}
      <div className="grid sm:grid-cols-4 gap-4 mb-8">

        {/* Students */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <p className="text-gray-400 text-sm">Total Students</p>
          <h2 className="text-2xl font-bold">{totalStudents}</h2>
        </div>

        {/* Expected */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <p className="text-gray-400 text-sm">Total Expected Revenue</p>
          <h2 className="text-2xl font-bold text-blue-400">
            ₹{totalFee}
          </h2>
        </div>

        {/* Collected */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <p className="text-gray-400 text-sm">Collected Revenue</p>
          <h2 className="text-2xl font-bold text-green-400">
            ₹{totalPaid}
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            {collectionRate}% collected
          </p>
        </div>

        {/* Pending */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <p className="text-gray-400 text-sm">Pending Revenue</p>
          <h2 className="text-2xl font-bold text-red-400">
            ₹{totalPending}
          </h2>
        </div>
      </div>

      {/* 🧾 Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredData.map((e, i) => {
          const fee = Number(e.Fee || 0);
          const paid = Number(e.Paid || 0);
          const remaining = fee - paid;

          const percent = fee ? (paid / fee) * 100 : 0;

          return (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              {/* Top */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">{e.Name}</h2>

                {remaining === 0 ? (
                  <span className="flex items-center gap-1 text-green-400 text-xs">
                    <CheckCircle size={14} /> Paid
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-400 text-xs">
                    <AlertCircle size={14} /> Due
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="space-y-2 text-sm text-gray-300">
                <p className="flex items-center gap-2">
                  <Phone size={14} /> {e.Mobile}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin size={14} /> {e.City}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar size={14} /> {e.Date}
                </p>
              </div>

              {/* Fee */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span className="flex items-center gap-1">
                    <IndianRupee size={12} /> {paid}
                  </span>
                  <span>₹{fee}</span>
                </div>

                {/* Progress */}
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                <p className="text-xs text-red-400 mt-2">
                  Remaining: ₹{remaining}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Empty */}
      {filteredData.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No students found 🚫
        </p>
      )}
    </div>
  );
};
export default DegreeColleges;