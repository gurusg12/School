import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Wallet, AlertCircle, FileDown, Search,
  Filter, Building2, CheckCircle, Clock, ChevronRight
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const allBranches = JSON.parse(localStorage.getItem("branches")) || [];
    setStudents(allStudents);
    setBranches(allBranches);
  }, []);

  // 🔍 Filter Logic
  const filteredData = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.studentName.toLowerCase().includes(search.toLowerCase()) ||
        s.studentCode?.toLowerCase().includes(search.toLowerCase());

      const matchesBranch =
        filterBranch === "all" || s.branchCode === filterBranch;

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "paid" && s.remaining === 0) ||
        (filterStatus === "pending" && s.remaining > 0);

      return matchesSearch && matchesBranch && matchesStatus;
    });
  }, [search, filterBranch, filterStatus, students]);

  // 📊 Stats
  const stats = useMemo(() => {
    return filteredData.reduce(
      (acc, s) => ({
        revenue: acc.revenue + (s.paid || 0),
        pending: acc.pending + (s.remaining || 0),
        total: acc.total + (s.totalFee || 0),
        count: acc.count + 1,
      }),
      { revenue: 0, pending: 0, total: 0, count: 0 }
    );
  }, [filteredData]);

  // 📄 PDF Export
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Organization Academic Report", 14, 20);

    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

    const rows = filteredData.map((s) => [
      s.studentName,
      s.branchName,
      s.className,
      `₹${s.paid || 0}`,
      `₹${s.remaining || 0}`,
      s.remaining === 0 ? "PAID" : "PENDING",
    ]);

    autoTable(doc, {
      startY: 32,
      head: [["Student", "Branch", "Class", "Paid", "Pending", "Status"]],
      body: rows,
      theme: "grid",
      headStyles: { fillColor: [99, 102, 241] },
    });

    doc.save(`Report_${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 space-y-6 pb-20">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Overview across all branches
          </p>
        </div>

        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-semibold shadow transition"
        >
          <FileDown size={18} /> Export
        </button>
      </div>

      {/* ✅ Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {[
          { label: "Students", val: stats.count, icon: <Users />, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Target", val: `₹${stats.total}`, icon: <Building2 />, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Revenue", val: `₹${stats.revenue}`, icon: <Wallet />, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending", val: `₹${stats.pending}`, icon: <AlertCircle />, color: "text-rose-600", bg: "bg-rose-50" },
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
              <div className={`w-8 h-8 md:w-10 md:h-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-2`}>
                {item.icon}
              </div>

              <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase">
                {item.label}
              </p>

              <h2 className="text-lg md:text-2xl font-black text-slate-900">
                {item.val}
              </h2>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-2xl border flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-gray-50 rounded-lg outline-none"
          />
        </div>

        <select
          onChange={(e) => setFilterBranch(e.target.value)}
          className="p-2 bg-gray-50 rounded-lg"
        >
          <option value="all">All Branches</option>
          {branches.map((b) => (
            <option key={b.code} value={b.code}>
              {b.branchName}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 bg-gray-50 rounded-lg"
        >
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        <div className="p-4 border-b text-sm font-semibold flex items-center gap-2">
          <Filter size={16} /> Results ({filteredData.length})
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-400">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Branch</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Due</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence>
                {filteredData.map((s) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium">{s.studentName}</td>
                    <td className="p-3">{s.branchName}</td>

                    <td className="p-3">
                      {s.remaining === 0 ? "✅ Paid" : "⏳ Pending"}
                    </td>

                    <td className="p-3 text-right font-bold">
                      ₹{s.remaining}
                    </td>

                    <td className="p-3 text-right">
                      <ChevronRight size={16} />
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