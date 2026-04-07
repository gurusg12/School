import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import {
  TrendingUp, Users, Wallet, AlertCircle,
  ArrowUpRight, Building2, User
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const COLORS = ["#6366f1", "#f43f5e", "#10b981"];

const BDash = () => {
  const [branch, setBranch] = useState(null);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, pending: 0, total: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedBranch"));
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];

    if (logged) {
      setBranch(logged);

      const branchStudents = allStudents.filter(
        (s) => s.branchCode === logged.code
      );

      setStudents(branchStudents);

      const totals = branchStudents.reduce(
        (acc, s) => ({
          revenue: acc.revenue + (Number(s.paid) || 0),
          pending: acc.pending + (Number(s.remaining) || 0),
          total: acc.total + (Number(s.totalFee) || 0),
        }),
        { revenue: 0, pending: 0, total: 0 }
      );

      setStats(totals);
    } else {
      navigate("/branch/blogin");
    }
  }, []);

  const chartData = students.map((s) => ({
    name: s.studentName.split(" ")[0],
    paid: s.paid || 0,
    remaining: s.remaining || 0,
  }));

  const pieData = [
    { name: "Collected", value: stats.revenue },
    { name: "Pending", value: stats.pending },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 space-y-5 md:space-y-6 pb-28 md:pb-10">

      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">
            Analytics Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Real-time branch performance
          </p>
        </motion.div>

        {branch && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-white p-3 pr-5 rounded-2xl shadow-sm border"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
              <Building2 size={20} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">
                Branch
              </p>
              <h3 className="text-sm font-bold">{branch.branchName}</h3>
            </div>
          </motion.div>
        )}
      </header>

      {/* ✅ Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-3">
        {[
          { label: "Target", val: stats.total, icon: <Wallet />, color: "text-emerald-600", bg: "bg-emerald-50", trend: "Session" },
          { label: "Revenue", val: stats.revenue, icon: <TrendingUp />, color: "text-indigo-600", bg: "bg-indigo-50", trend: "+12%" },
          { label: "Students", val: students.length, icon: <Users />, color: "text-blue-600", bg: "bg-blue-50", trend: "Active" },
          { label: "Pending", val: stats.pending, icon: <AlertCircle />, color: "text-rose-600", bg: "bg-rose-50", trend: "Important" },
        ].map((item, i) => {
          const isBig = item.label === "Pending";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white border p-3 md:p-4 rounded-2xl shadow-sm hover:shadow-md transition
              ${isBig ? "col-span-2 sm:col-span-3 lg:col-span-1" : ""}`}
            >
              <div className="flex justify-between mb-2">
                <div className={`w-8 h-8 md:w-10 md:h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center`}>
                  {item.icon}
                </div>
                <span className={`text-[9px] font-bold px-2 py-1 rounded-lg ${item.bg} ${item.color}`}>
                  {item.trend}
                </span>
              </div>

              <p className="text-[10px] text-gray-400 font-bold uppercase">
                {item.label}
              </p>

              <h2 className="text-lg md:text-2xl font-black text-slate-900">
                ₹{Number(item.val).toLocaleString()}
              </h2>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">

        {/* Bar Chart */}
        <div className="bg-white p-4 md:p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold mb-4 text-sm flex items-center gap-2">
            <Users size={16} /> Fee Distribution
          </h3>

          <div className="h-[260px]">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="paid" fill="#6366f1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="remaining" fill="#e5e7eb" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 md:p-6 rounded-2xl border shadow-sm flex flex-col items-center">
          <h3 className="font-bold mb-2 text-sm">Revenue Split</h3>

          <div className="h-[260px] w-full">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} innerRadius={70} outerRadius={100} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="font-bold">Student Ledger</h3>
          <button className="text-indigo-600 text-sm flex items-center gap-1">
            View <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs text-gray-400">
              <tr>
                <th className="p-3">Student</th>
                <th>Status</th>
                <th className="text-right">Paid</th>
                <th className="text-right">Remaining</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 flex items-center gap-2">
                    <User size={16} />
                    {s.studentName}
                  </td>

                  <td>
                    {s.remaining === 0 ? "✅ Paid" : "⏳ Pending"}
                  </td>

                  <td className="text-right">₹{s.paid}</td>
                  <td className="text-right text-red-500">₹{s.remaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default BDash;