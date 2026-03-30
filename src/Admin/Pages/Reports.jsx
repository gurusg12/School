import React, { useState, useEffect } from 'react';
import { Search, Download, Wallet, CreditCard, Calendar, PieChart as PieIcon, BarChart3, TrendingUp, User, ChevronRight } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Reports = () => {
  const [students, setStudents] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('All');
  const [dates, setDates] = useState({ start: '', end: '' });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('students') || '[]');
    setStudents(data);
    setFilteredData(data);
  }, []);

  useEffect(() => {
    let filtered = students;
    if (search) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (mode !== 'All') filtered = filtered.filter(s => s.mode === mode);
    if (dates.start && dates.end) {
      filtered = filtered.filter(s => s.lastPaymentDate >= dates.start && s.lastPaymentDate <= dates.end);
    }
    setFilteredData(filtered);
  }, [search, mode, dates, students]);

  const totalPayable = filteredData.reduce((acc, s) => acc + (Number(s.totalFee) || 0), 0);
  const totalPaid = filteredData.reduce((acc, s) => acc + (Number(s.paid) || 0), 0);
  const totalDue = totalPayable - totalPaid;

  const modeData = [
    { name: 'Cash', value: filteredData.filter(s => s.mode === 'Cash').reduce((acc, s) => acc + (Number(s.paid) || 0), 0) },
    { name: 'UPI', value: filteredData.filter(s => s.mode === 'UPI / PhonePe').reduce((acc, s) => acc + (Number(s.paid) || 0), 0) },
    { name: 'Bank', value: filteredData.filter(s => s.mode === 'Bank Transfer').reduce((acc, s) => acc + (Number(s.paid) || 0), 0) },
  ].filter(d => d.value > 0);

  const barData = [{ name: 'Paid', amt: totalPaid }, { name: 'Due', amt: totalDue }];
  const COLORS = ['#F97316', '#A855F7', '#3B82F6'];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen pb-24">
      
      {/* Header - Stacked on Mobile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={28} /> Analytics
          </h1>
          <p className="text-sm text-gray-500 font-medium">Real-time collection insights</p>
        </div>
        <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg">
          <Download size={18} /> Export PDF
        </button>
      </div>

      {/* Stats - Grid adjusts 1 to 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Collected</p>
          <p className="text-2xl font-black text-green-600">₹{totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Outstanding</p>
          <p className="text-2xl font-black text-red-500">₹{totalDue.toLocaleString()}</p>
        </div>
        <div className="bg-blue-600 p-5 rounded-2xl shadow-lg hidden lg:block text-white">
          <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest">Active Filters</p>
          <p className="text-2xl font-black">{filteredData.length} Students</p>
        </div>
      </div>

      {/* Charts - Stacked on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 md:p-6 rounded-2xl border shadow-sm h-[350px]">
          <h3 className="text-xs font-black text-gray-400 uppercase mb-4">Paid vs Due</h3>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={barData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="amt" radius={[8, 8, 0, 0]}>
                {barData.map((e, i) => <Cell key={i} fill={i === 0 ? '#22c55e' : '#ef4444'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl border shadow-sm h-[350px]">
          <h3 className="text-xs font-black text-gray-400 uppercase mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie data={modeData} innerRadius={50} outerRadius={70} dataKey="value">
                {modeData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sticky Mobile Filters - Horizontal Scroll */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl outline-none text-sm" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Cash', 'UPI / PhonePe', 'Bank Transfer'].map(m => (
            <button 
              key={m}
              onClick={() => setMode(m)}
              className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold transition-all ${mode === m ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}
            >
              {m === 'UPI / PhonePe' ? 'UPI' : m}
            </button>
          ))}
        </div>
      </div>

      {/* DATA LIST (Mobile) vs TABLE (Desktop) */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-gray-400 uppercase px-1">Student Wise Collection</h3>
        
        {/* Desktop Table View */}
        <div className="hidden md:block bg-white rounded-2xl border overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b text-[10px] font-black text-gray-400 uppercase">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Mode</th>
                <th className="p-4">Paid</th>
                <th className="p-4 text-right">Outstanding</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredData.map(s => (
                <tr key={s.id} className="text-sm font-medium">
                  <td className="p-4">
                    <div className="font-bold">{s.name}</div>
                    <div className="text-[10px] text-gray-400 uppercase">{s.id}</div>
                  </td>
                  <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-[10px]">{s.mode || 'N/A'}</span></td>
                  <td className="p-4 text-green-600">₹{s.paid}</td>
                  <td className="p-4 text-right text-red-500 font-bold">₹{s.totalFee - s.paid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredData.map(s => (
            <div key={s.id} className="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{s.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase font-mono">{s.id} • {s.mode || 'Cash'}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-red-500">₹{s.totalFee - s.paid}</div>
                <div className="text-[10px] text-green-600 font-bold">Paid: ₹{s.paid}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;