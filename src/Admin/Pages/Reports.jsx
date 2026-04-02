import React, { useState, useEffect } from 'react';
import { Search, Download, Wallet, CreditCard, Calendar, BarChart3, User, IndianRupee } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, 
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
    // Ensure all numeric fields are actual numbers to prevent calculation bugs
    const sanitizedData = data.map(s => ({
      ...s,
      totalFee: Number(s.totalFee) || 0,
      paid: Number(s.paid) || 0,
      due: (Number(s.totalFee) || 0) - (Number(s.paid) || 0)
    }));
    setStudents(sanitizedData);
    setFilteredData(sanitizedData);
  }, []);

  useEffect(() => {
    let filtered = students;
    if (search) {
      filtered = filtered.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) || 
        s.id.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (mode !== 'All') filtered = filtered.filter(s => s.mode === mode);
    if (dates.start && dates.end) {
      filtered = filtered.filter(s => s.lastPaymentDate >= dates.start && s.lastPaymentDate <= dates.end);
    }
    setFilteredData(filtered);
  }, [search, mode, dates, students]);

  // Totals
  const totalPotential = filteredData.reduce((acc, s) => acc + s.totalFee, 0);
  const totalPaid = filteredData.reduce((acc, s) => acc + s.paid, 0);
  const totalDue = totalPotential - totalPaid;

  const modeData = [
    { name: 'Cash', value: filteredData.filter(s => s.mode === 'Cash').reduce((acc, s) => acc + s.paid, 0) },
    { name: 'UPI', value: filteredData.filter(s => s.mode === 'UPI / PhonePe').reduce((acc, s) => acc + s.paid, 0) },
    { name: 'Bank', value: filteredData.filter(s => s.mode === 'Bank Transfer').reduce((acc, s) => acc + s.paid, 0) },
  ].filter(d => d.value > 0);

  const barData = [
    { name: 'Paid', amt: totalPaid }, 
    { name: 'Outstanding', amt: totalDue }
  ];

  const COLORS = ['#F97316', '#A855F7', '#3B82F6'];

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("EduTrust Admin - Collection Report", 14, 15);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);
    doc.text(`Total Collected: Rs. ${totalPaid} | Total Due: Rs. ${totalDue}`, 14, 28);

    const tableData = filteredData.map(s => [
      s.id,
      s.name,
      s.mode || 'N/A',
      `Rs. ${s.totalFee}`,
      `Rs. ${s.paid}`,
      `Rs. ${s.due}`
    ]);

    autoTable(doc, {
      head: [['ID', 'Student Name', 'Mode', 'Total Fee', 'Paid', 'Due']],
      body: tableData,
      startY: 35,
      theme: 'grid',
      headStyles: { fillStyle: '#2563eb' }
    });

    doc.save(`Report_${new Date().getTime()}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 bg-gray-50 min-h-screen pb-24">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
            <BarChart3 className="text-blue-600" size={28} /> Analytics
          </h1>
          <p className="text-sm text-gray-500 font-medium">Financial health overview</p>
        </div>
        <button 
          onClick={exportToPDF}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
        >
          <Download size={18} /> Export PDF
        </button>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border shadow-sm border-l-4 border-l-blue-500">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Revenue</p>
          <p className="text-2xl font-black text-gray-900">₹{totalPotential.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border shadow-sm border-l-4 border-l-green-500">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Collected</p>
          <p className="text-2xl font-black text-green-600">₹{totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border shadow-sm border-l-4 border-l-red-500">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pending (Due)</p>
          <p className="text-2xl font-black text-red-500">₹{totalDue.toLocaleString()}</p>
        </div>
        <div className="bg-blue-600 p-5 rounded-2xl shadow-lg text-white">
          <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest">Filtered List</p>
          <p className="text-2xl font-black">{filteredData.length} Students</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 md:p-6 rounded-2xl border shadow-sm h-[350px]">
          <h3 className="text-xs font-black text-gray-400 uppercase mb-4">Collection Status</h3>
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
              <Pie data={modeData} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={5}>
                {modeData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl outline-none text-sm border focus:border-blue-400 transition-all" 
                    placeholder="Search by name or ID..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
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
      </div>

      {/* Data Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-black text-gray-400 uppercase px-1">Detailed Breakdown</h3>
        
        <div className="hidden md:block bg-white rounded-2xl border overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b text-[10px] font-black text-gray-400 uppercase">
              <tr>
                <th className="p-4">Student Info</th>
                <th className="p-4">Payment Mode</th>
                <th className="p-4">Total Fee</th>
                <th className="p-4">Paid</th>
                <th className="p-4 text-right">Outstanding</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredData.map(s => (
                <tr key={s.id} className="text-sm font-medium hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{s.name}</div>
                    <div className="text-[10px] text-gray-400 uppercase">{s.id}</div>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-[10px] font-bold">
                        {s.mode || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">₹{s.totalFee.toLocaleString()}</td>
                  <td className="p-4 text-green-600 font-bold">₹{s.paid.toLocaleString()}</td>
                  <td className="p-4 text-right text-red-500 font-bold">₹{(s.totalFee - s.paid).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {filteredData.map(s => (
            <div key={s.id} className="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <div className="bg-blue-50 p-2.5 rounded-lg text-blue-600">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{s.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase font-mono">{s.id} • {s.mode || 'N/A'}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-red-500">₹{(s.totalFee - s.paid).toLocaleString()}</div>
                <div className="text-[10px] text-green-600 font-bold">Paid: ₹{s.paid.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;