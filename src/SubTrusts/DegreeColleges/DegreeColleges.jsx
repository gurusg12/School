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
  TrendingUp,
  Wallet,
  Clock,
} from "lucide-react";

const DegreeColleges = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("degreeColleges")) || [];
    setData(stored);
  }, []);

  const filteredData = data.filter((item) =>
    Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const totalStudents = filteredData.length;
  const totalFee = filteredData.reduce((sum, s) => sum + Number(s.Fee || 0), 0);
  const totalPaid = filteredData.reduce((sum, s) => sum + Number(s.Paid || 0), 0);
  const totalPending = totalFee - totalPaid;
  const collectionRate = totalFee ? ((totalPaid / totalFee) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 md:p-8 font-sans">
      
      {/* --- Header Section --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Users className="text-indigo-400" size={28} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Student Ledger
            </h1>
          </div>
          <p className="text-zinc-500 text-sm font-medium ml-12">
            Institutional Fee Management System
          </p>
        </div>

        {/* Enhanced Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search name, city or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 pl-10 pr-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-zinc-600"
          />
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard title="Total Students" value={totalStudents} icon={<Users size={20}/>} color="zinc" />
        <StatCard title="Expected Revenue" value={`₹${totalFee.toLocaleString()}`} icon={<TrendingUp size={20}/>} color="indigo" />
        <StatCard title="Collected" value={`₹${totalPaid.toLocaleString()}`} icon={<Wallet size={20}/>} color="emerald" subText={`${collectionRate}% Achieved`} />
        <StatCard title="Pending Balance" value={`₹${totalPending.toLocaleString()}`} icon={<Clock size={20}/>} color="rose" />
      </div>

      {/* --- Student Cards Grid --- */}
      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredData.map((e, i) => {
          const fee = Number(e.Fee || 0);
          const paid = Number(e.Paid || 0);
          const remaining = fee - paid;
          const percent = fee ? (paid / fee) * 100 : 0;

          return (
            <div
              key={i}
              className="group relative bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:bg-zinc-900/60 transition-all duration-300 hover:border-zinc-700 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors truncate pr-2">{e.Name}</h2>
                {remaining === 0 ? (
                  <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle size={12} /> Paid
                  </span>
                ) : (
                  <span className="px-2 py-1 rounded-md bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <AlertCircle size={12} /> Pending
                  </span>
                )}
              </div>

              <div className="space-y-3 text-sm text-zinc-400 mb-6">
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-zinc-600" /> <span>{e.Mobile}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-zinc-600" /> <span>{e.City}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={14} className="text-zinc-600" /> <span>{e.Date}</span>
                </div>
              </div>

              {/* Progress Section */}
              <div className="pt-4 border-t border-zinc-800/50">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-zinc-500">Paid: <span className="text-zinc-200">₹{paid}</span></span>
                  <span className="text-zinc-500">Goal: ₹{fee}</span>
                </div>
                
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-700 ${remaining === 0 ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>

                {remaining > 0 && (
                  <p className="text-[11px] font-semibold text-rose-400 mt-3 flex items-center gap-1">
                    Outstanding: ₹{remaining.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Empty State --- */}
      {filteredData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 opacity-50">
          <div className="p-4 bg-zinc-900 rounded-full mb-4">
             <Search size={40} className="text-zinc-700" />
          </div>
          <p className="text-zinc-500 font-medium">No student records match your search</p>
        </div>
      )}
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, color, subText }) => {
  const colors = {
    zinc: "text-zinc-400 bg-zinc-500/10 border-zinc-800",
    indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    rose: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  };

  return (
    <div className={`p-5 rounded-2xl border ${colors[color]} backdrop-blur-sm`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="p-1.5 rounded-lg bg-black/20">{icon}</div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{title}</p>
      </div>
      <h2 className="text-2xl font-bold text-zinc-100">{value}</h2>
      {subText && <p className="text-[10px] font-bold mt-1 opacity-80 uppercase tracking-tighter">{subText}</p>}
    </div>
  );
};

export default DegreeColleges;