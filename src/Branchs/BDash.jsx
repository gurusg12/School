import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from "recharts";
import { 
  TrendingUp, Users, Wallet, AlertCircle, 
  ArrowUpRight, Building2, User
} from "lucide-react";

const COLORS = ["#6366f1", "#f43f5e", "#10b981"];

const BDash = () => {
  const [branch, setBranch] = useState(null);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, pending: 0, total: 0 });

  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedBranch"));
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];

    if (logged) {
      setBranch(logged);
      const branchStudents = allStudents.filter(s => s.branchCode === logged.code);
      setStudents(branchStudents);

      const totals = branchStudents.reduce((acc, s) => ({
        revenue: acc.revenue + (Number(s.paid) || 0),
        pending: acc.pending + (Number(s.remaining) || 0),
        total: acc.total + (Number(s.totalFee) || 0),
      }), { revenue: 0, pending: 0, total: 0 });

      setStats(totals);
    }
  }, []);

  const chartData = students.map(s => ({
    name: s.studentName.split(" ")[0],
    paid: s.paid || 0,
    remaining: s.remaining || 0,
  }));

  const pieData = [
    { name: "Collected", value: stats.revenue },
    { name: "Pending", value: stats.pending },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 space-y-8 pb-32 md:pb-10">
      
      {/* Header & Branch Info */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analytics Dashboard</h1>
          <p className="text-slate-500 font-medium">Real-time performance for your branch</p>
        </motion.div>

        {branch && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 bg-white p-3 pr-6 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Authorized Branch</p>
              <h3 className="text-sm font-bold text-slate-800">{branch.branchName}</h3>
            </div>
          </motion.div>
        )}
      </header>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Gross Target", val: stats.total, icon: <Wallet />, color: "text-emerald-600", bg: "bg-emerald-50", trend: "Current Session" },
          { label: "Total Revenue", val: stats.revenue, icon: <TrendingUp />, color: "text-indigo-600", bg: "bg-indigo-50", trend: "+12%" },
          { label: "Pending Dues", val: stats.pending, icon: <AlertCircle />, color: "text-rose-600", bg: "bg-rose-50", trend: "Action Required" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${item.bg} ${item.color}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${item.bg} ${item.color}`}>
                {item.trend}
              </span>
            </div>
            <p className="text-slate-500 font-semibold text-sm">{item.label}</p>
            <h2 className="text-3xl font-black text-slate-900 mt-1">₹{item.val.toLocaleString()}</h2>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Main Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Users size={18} className="text-indigo-600" /> Student Fee Distribution
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#F1F5F9'}}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-2xl border border-slate-800 text-xs">
                          <p className="font-bold mb-1">{payload[0].payload.name}</p>
                          <p className="text-emerald-400">Paid: ₹{payload[0].value}</p>
                          <p className="text-rose-400">Due: ₹{payload[1].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="paid" fill="url(#barGrad)" radius={[6, 6, 0, 0]} barSize={30} />
                <Bar dataKey="remaining" fill="#E2E8F0" radius={[6, 6, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Circular Collection Info */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-8 left-8 text-left">
            <h3 className="font-bold text-slate-800">Revenue Split</h3>
            <p className="text-xs text-slate-400">Overall collection status</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-xs font-bold text-slate-600">Collected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-xs font-bold text-slate-600">Pending</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modern Student Table */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-800">Student Ledger</h3>
          <button className="text-indigo-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Paid</th>
                <th className="px-6 py-4 text-right">Remaining</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{s.studentName}</p>
                      <p className="text-[10px] text-slate-400 font-medium">Class {s.className}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      s.remaining === 0 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                    }`}>
                      {s.remaining === 0 ? "Fully Paid" : "Partial"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-700 text-sm">₹{s.paid || 0}</td>
                  <td className="px-6 py-4 text-right font-black text-rose-500 text-sm">₹{s.remaining || 0}</td>
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