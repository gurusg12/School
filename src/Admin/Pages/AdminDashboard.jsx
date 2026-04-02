import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, CartesianGrid 
} from "recharts";
import { 
  Users, Wallet, AlertCircle, FileDown, Search, 
  Filter, Building2, CheckCircle, Clock, ChevronRight
} from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const COLORS = ["#6366f1", "#f43f5e"];

  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const allBranches = JSON.parse(localStorage.getItem("branches")) || [];
    setStudents(allStudents);
    setBranches(allBranches);
  }, []);

  // 🧠 Advanced Multi-Filter Logic
  const filteredData = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch = s.studentName.toLowerCase().includes(search.toLowerCase()) || 
                            s.studentCode?.toLowerCase().includes(search.toLowerCase());
      const matchesBranch = filterBranch === "all" || s.branchCode === filterBranch;
      const matchesStatus = filterStatus === "all" || 
                            (filterStatus === "paid" && s.remaining === 0) || 
                            (filterStatus === "pending" && s.remaining > 0);
      
      return matchesSearch && matchesBranch && matchesStatus;
    });
  }, [search, filterBranch, filterStatus, students]);

  // 📊 Calculated Stats based on Filtered Results
  const stats = useMemo(() => {
    return filteredData.reduce((acc, s) => ({
      revenue: acc.revenue + (s.paid || 0),
      pending: acc.pending + (s.remaining || 0),
      total: acc.total + (s.totalFee || 0),
      count: acc.count + 1
    }), { revenue: 0, pending: 0, total: 0, count: 0 });
  }, [filteredData]);

  // 📑 PDF Export Logic
const handleExportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Organization Academic Report", 14, 22);

  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

  const tableRows = filteredData.map((s) => [
    s.studentName,
    s.branchName,
    s.className,
    `INR ${s.paid || 0}`,
    `INR ${s.remaining || 0}`,
    s.remaining === 0 ? "PAID" : "PENDING",
  ]);

  // ✅ use autoTable like this
  autoTable(doc, {
    startY: 35,
    head: [["Student Name", "Branch", "Class", "Paid", "Pending", "Status"]],
    body: tableRows,
    theme: "grid",
    headStyles: { fillColor: [99, 102, 241] },
  });

  doc.save(`Report_${Date.now()}.pdf`);
};

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 space-y-8 pb-20">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Oversight</h1>
          <p className="text-slate-500 font-medium italic">Consolidated view across all branches</p>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          <FileDown size={20} /> Export PDF Report
        </button>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
                    { label: "Total Students", val: stats.count, icon: <Users />, color: "text-blue-600", bg: "bg-blue-50" },

          { label: "Gross Target", val: `₹${stats.total}`, icon: <Building2 />, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Total Revenue", val: `₹${stats.revenue}`, icon: <Wallet />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Total Pending", val: `₹${stats.pending}`, icon: <AlertCircle />, color: "text-rose-600", bg: "bg-rose-50" },
        ].map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
          >
            <div className={`w-10 h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-4`}>
              {item.icon}
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
            <h2 className="text-2xl font-black text-slate-900">{item.val}</h2>
          </motion.div>
        ))}
      </div>

      {/* Filter Dock */}
      <div className="bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search student name or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
          />
        </div>
        
        <div className="flex gap-2 w-full lg:w-auto">
          <select 
            onChange={(e) => setFilterBranch(e.target.value)}
            className="flex-1 lg:w-48 p-3 bg-slate-50 border-none rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Branches</option>
            {branches.map(b => <option key={b.code} value={b.code}>{b.branchName}</option>)}
          </select>

          <select 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex-1 lg:w-40 p-3 bg-slate-50 border-none rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Status</option>
            <option value="paid">Fully Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Main Student Ledger */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Filter size={18} className="text-indigo-600" /> 
            Filtered Results ({filteredData.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] uppercase tracking-widest font-black bg-slate-50/50">
                <th className="px-6 py-4">Student Info</th>
                <th className="px-6 py-4">Branch</th>
                <th className="px-6 py-4">Financial Status</th>
                <th className="px-6 py-4 text-right">Balance Due</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {filteredData.map((s) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={s.id} 
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          {s.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{s.studentName}</p>
                          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{s.studentCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                        <Building2 size={14} className="text-slate-400" /> {s.branchName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {s.remaining === 0 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg w-fit">
                          <CheckCircle size={12} /> CLEAR
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg w-fit">
                          <Clock size={12} /> PENDING
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-sm font-black text-slate-900">₹{s.remaining || 0}</p>
                      <p className="text-[10px] text-slate-400">Total: ₹{s.totalFee}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-300 group-hover:text-indigo-600 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;