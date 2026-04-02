import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Wallet, 
  Receipt, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  TrendingDown
} from "lucide-react";

const Pay = () => {
  const [code, setCode] = useState("");
  const [student, setStudent] = useState(null);
  const [totalFee, setTotalFee] = useState("");
  const [paying, setPaying] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSearch = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const found = students.find((s) => s.studentCode.toUpperCase() === code.toUpperCase());

    if (found) {
      setStudent(found);
      setTotalFee(found.totalFee || "");
      setPaying("");
      setMessage({ type: "", text: "" });
    } else {
      setStudent(null);
      setMessage({ type: "error", text: "Student code not found" });
    }
  };

  const handlePayment = () => {
    if (!student) return;

    const students = JSON.parse(localStorage.getItem("students")) || [];
    const payNow = Number(paying) || 0;
    const newTotal = Number(totalFee) || 0;

    const updatedStudents = students.map((s) => {
      if (s.studentCode === student.studentCode) {
        const prevPaid = Number(s.paid) || 0;
        const updatedPaid = prevPaid + payNow;
        
        return {
          ...s,
          totalFee: newTotal,
          paid: updatedPaid,
          remaining: Math.max(0, newTotal - updatedPaid),
          lastPaymentDate: new Date().toLocaleDateString(),
        };
      }
      return s;
    });

    localStorage.setItem("students", JSON.stringify(updatedStudents));
    setMessage({ type: "success", text: `Success! Received payment of ₹${payNow}` });
    
    // Reset after success
    setTimeout(() => {
      setStudent(null);
      setCode("");
      setMessage({ type: "", text: "" });
    }, 2500);
  };

  // Calculations for UI
  const currentPaid = student ? (Number(student.paid) || 0) : 0;
  const newPaying = Number(paying) || 0;
  const projectedPaid = currentPaid + newPaying;
  const remaining = Math.max(0, (Number(totalFee) || 0) - projectedPaid);
  const percent = totalFee > 0 ? Math.min(100, (projectedPaid / totalFee) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 min-h-[80vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Side: Search & Input */}
        <section className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Wallet className="text-indigo-600" /> Fee Collection
            </h2>

            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Student ID (e.g. STD-RAJ-1234)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full pl-5 pr-14 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl transition-all outline-none font-mono text-sm uppercase"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-2 p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>

            <AnimatePresence>
              {student && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 overflow-hidden"
                >
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Configure Fees</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] ml-2 text-slate-500">Total Course Fee</span>
                        <input
                          type="number"
                          value={totalFee}
                          onChange={(e) => setTotalFee(e.target.value)}
                          className="w-full p-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-indigo-500/10 text-sm font-bold"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] ml-2 text-indigo-600 font-bold">Collect Amount</span>
                        <input
                          type="number"
                          value={paying}
                          onChange={(e) => setPaying(e.target.value)}
                          className="w-full p-3 bg-indigo-50 rounded-xl outline-none ring-2 ring-indigo-500/20 text-sm font-bold text-indigo-700"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayment}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all mt-4"
                  >
                    Confirm Transaction <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-xl flex items-center gap-2 text-sm font-medium ${
                    message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                  }`}
                >
                  {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  {message.text}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Right Side: Visual Ledger */}
        <section>
          <AnimatePresence>
            {student ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 h-full relative overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50" />

                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600">
                      <User size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{student.studentName}</h3>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{student.studentCode}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase">
                      Class: {student.className}
                    </span>
                  </div>
                </div>

                {/* Progress Card */}
                <div className="bg-slate-900 rounded-[2rem] p-6 text-white mb-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-slate-400 text-xs font-medium">Payment Progress</p>
                      <p className="text-2xl font-bold">{Math.round(percent)}%</p>
                    </div>
                    <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        className="h-full bg-indigo-500" 
                      />
                    </div>
                    <div className="grid grid-cols-2 mt-6 gap-4">
                      <div>
                        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">Already Paid</p>
                        <p className="text-lg font-bold">₹{currentPaid}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-indigo-400 text-[10px] uppercase font-bold tracking-tighter">Pending Due</p>
                        <p className="text-lg font-bold text-indigo-300">₹{remaining}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini Receipt Preview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
                    <Receipt size={14} /> Settlement Details
                  </h4>
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Current Balance</span>
                      <span className="font-semibold">₹{totalFee - currentPaid}</span>
                    </div>
                    <div className="flex justify-between text-sm text-indigo-600">
                      <span className="font-medium">New Payment</span>
                      <span className="font-bold">- ₹{newPaying}</span>
                    </div>
                    <div className="border-t border-slate-200 pt-2 flex justify-between text-base">
                      <span className="font-bold text-slate-900">Closing Balance</span>
                      <span className="font-black text-slate-900 tracking-tight">₹{remaining}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[400px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 space-y-4">
                <div className="p-6 bg-white rounded-3xl shadow-sm">
                  <TrendingDown size={40} className="opacity-20" />
                </div>
                <p className="text-sm font-medium">Search for a student to view their ledger</p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default Pay;