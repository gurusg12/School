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

  // ✅ LOAD + PROCESS DATA
  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const allBranches = JSON.parse(localStorage.getItem("branches")) || [];

    const processed = allStudents.map((s) => {
      const fee = Number(s.admission?.fee) || 0;
      const admissionPaid = Number(s.admission?.paid) || 0;

      const extraPaid = (s.payments || []).reduce(
        (sum, p) => sum + (Number(p.amount) || 0),
        0
      );

      const totalPaid = admissionPaid + extraPaid;
      const remaining = fee - totalPaid;

      return {
        ...s,
        paid: totalPaid,
        remaining: remaining < 0 ? 0 : remaining,
        totalFee: fee,
      };
    });

    setStudents(processed);
    setBranches(allBranches);
  }, []);

  // ✅ FILTER LOGIC
  const filteredData = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.studentName?.toLowerCase().includes(search.toLowerCase()) ||
        s.studentId?.toLowerCase().includes(search.toLowerCase());

      const matchesBranch =
        filterBranch === "all" || s.branchCode === filterBranch;

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "paid" && s.remaining <= 0) ||
        (filterStatus === "pending" && s.remaining > 0);

      return matchesSearch && matchesBranch && matchesStatus;
    });
  }, [students, search, filterBranch, filterStatus]);

  // ✅ STATS CALCULATION
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

  // ✅ PDF EXPORT
  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Student Financial Report", 14, 20);

    const tableRows = filteredData.map((s) => [
      s.studentName,
      s.branchName,
      `₹${s.paid}`,
      `₹${s.remaining}`,
      s.remaining === 0 ? "PAID" : "PENDING",
    ]);

    autoTable(doc, {
      startY: 30,
      head: [["Name", "Branch", "Paid", "Pending", "Status"]],
      body: tableRows,
    });

    doc.save("report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleExportPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded flex gap-2"
        >
          <FileDown size={18} /> Export
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <Users /> Total Students: {stats.count}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Building2 /> Total Fee: ₹{stats.total}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <Wallet /> Revenue: ₹{stats.revenue}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <AlertCircle /> Pending: ₹{stats.pending}
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded flex gap-3">
        <input
          type="text"
          placeholder="Search name or ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select onChange={(e) => setFilterBranch(e.target.value)}>
          <option value="all">All Branch</option>
          {branches.map((b) => (
            <option key={b.code} value={b.code}>
              {b.branchName}
            </option>
          ))}
        </select>

        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-sm">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Balance</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {filteredData.map((s) => (
                <motion.tr key={s.id} className="border-t">
                  <td className="p-3">
                    <div>
                      <p className="font-bold">{s.studentName}</p>
                      <p className="text-xs">{s.studentId}</p>
                    </div>
                  </td>

                  <td className="p-3">{s.branchName}</td>

                  <td className="p-3">
                    {s.remaining === 0 ? (
                      <span className="text-green-600 flex gap-1">
                        <CheckCircle size={14} /> Paid
                      </span>
                    ) : (
                      <span className="text-red-600 flex gap-1">
                        <Clock size={14} /> Pending
                      </span>
                    )}
                  </td>

                  <td className="p-3 text-right">
                    ₹{s.remaining}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;