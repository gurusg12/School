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

const COLORS = ["#6366f1", "#f43f5e"];

const BDash = () => {
  const [branch, setBranch] = useState(null);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, pending: 0, total: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedBranch"));
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];

    if (!logged) {
      navigate("/branch/blogin");
      return;
    }

    setBranch(logged);

    const branchStudents = allStudents.filter(
      (s) => s.branchCode === logged.code
    );

    // 🔥 CORRECT CALCULATION BASED ON YOUR STRUCTURE
    const processedStudents = branchStudents.map((s) => {

      const admissionFee = Number(s.admission?.fee) || 0;
      const admissionPaid = Number(s.admission?.paid) || 0;

      // ✅ Sum of all extra payments
      const extraPaid = (s.payments || []).reduce(
        (sum, p) => sum + (Number(p.amount) || 0),
        0
      );

      const totalPaid = admissionPaid + extraPaid;

      const remaining = admissionFee - totalPaid;

      return {
        ...s,
        paid: totalPaid,
        remaining: remaining,
        totalFee: admissionFee,
      };
    });

    console.log("RAW:", branchStudents);
    console.log("PROCESSED:", processedStudents);

    setStudents(processedStudents);

    // 🔥 GLOBAL STATS
    const totals = processedStudents.reduce(
      (acc, s) => ({
        revenue: acc.revenue + s.paid,
        pending: acc.pending + s.remaining,
        total: acc.total + s.totalFee,
      }),
      { revenue: 0, pending: 0, total: 0 }
    );

    setStats(totals);

  }, [navigate]);

  // 📊 CHART DATA
  const chartData = students.map((s) => ({
    name: s.studentName?.split(" ")[0] || "Student",
    paid: s.paid,
    remaining: s.remaining,
  }));

  const pieData = [
    { name: "Collected", value: stats.revenue },
    { name: "Pending", value: stats.pending },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 space-y-8">

      {/* HEADER */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black">Analytics Dashboard</h1>
          <p className="text-slate-500">Branch performance overview</p>
        </div>

        {branch && (
          <div className="flex items-center gap-3 bg-white p-3 rounded-xl shadow">
            <Building2 />
            <div>
              <p className="text-xs text-gray-400">Branch</p>
              <h3 className="font-bold">{branch.branchName}</h3>
            </div>
          </div>
        )}
      </header>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Total Fee", val: stats.total, icon: <Wallet /> },
          { label: "Revenue", val: stats.revenue, icon: <TrendingUp /> },
          { label: "Pending", val: stats.pending, icon: <AlertCircle /> },
          
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between">
              {item.icon}
            </div>
            <p className="text-gray-500">{item.label}</p>
            <h2 className="text-2xl font-bold">₹{item.val}</h2>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="mb-4 font-bold flex gap-2 items-center">
            <Users size={18} /> Student Fees
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="paid" fill="#6366f1" />
              <Bar dataKey="remaining" fill="#e2e8f0" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="mb-4 font-bold">Revenue Split</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={100}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 flex justify-between">
          <h3 className="font-bold">Student Ledger</h3>
          <button className="text-indigo-600 flex items-center gap-1">
            View All <ArrowUpRight size={16} />
          </button>
        </div>

        <table className="w-full">
          <thead className="text-xs text-gray-400">
            <tr>
              <th className="p-4 text-left">Student</th>
              <th>Status</th>
              <th>Paid</th>
              <th>Remaining</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-4 flex items-center gap-2">
                  <User size={18} />
                  {s.studentName}
                </td>

                <td>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      s.remaining < 0
                        ? "bg-blue-100 text-blue-600"
                        : s.remaining === 0
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {s.remaining < 0
                      ? "Overpaid"
                      : s.remaining === 0
                      ? "Fully Paid"
                      : "Partial"}
                  </span>
                </td>

                <td>₹{s.paid}</td>
                <td className="text-red-500">₹{s.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BDash;