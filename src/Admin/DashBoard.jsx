import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  MapPin, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Search
} from 'lucide-react';

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('student_records')) || [];
    setStudents(savedData);
  }, []);

  // Summary Metrics
  const totalStudents = students.length;
  
  const uniqueCities = [...new Set(students.map(s => s.city))].length;
  
  const courseCounts = students.reduce((acc, curr) => {
    acc[curr.course] = (acc[curr.course] || 0) + 1;
    return acc;
  }, {});

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-2">
              <LayoutDashboard className="text-indigo-600" />
              Student Analytics
            </h1>
            <p className="text-slate-500 mt-1">Overview of all registered students and enrollment data.</p>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by ID or Name..."
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard 
            icon={<Users className="text-blue-600" />} 
            label="Total Students" 
            value={totalStudents} 
            color="bg-blue-50"
          />
          <StatCard 
            icon={<MapPin className="text-emerald-600" />} 
            label="Active Cities" 
            value={uniqueCities} 
            color="bg-emerald-50"
          />
          <StatCard 
            icon={<BookOpen className="text-amber-600" />} 
            label="Active Courses" 
            value={Object.keys(courseCounts).length} 
            color="bg-amber-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Table Area */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">Recent Enrollments</h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
                Live Data
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Student</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Contact</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Course</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800">{s.name}</p>
                          <p className="text-xs text-indigo-500 font-mono uppercase">{s.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col text-sm text-slate-600">
                            <span>{s.mobile}</span>
                            <span className="text-xs text-slate-400">{s.city}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-700">
                          {s.course}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center text-slate-400">No students found matching your search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar Analytics */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-indigo-500" />
                Course Popularity
              </h2>
              <div className="space-y-4">
                {Object.entries(courseCounts).map(([name, count]) => (
                  <div key={name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-600">{name}</span>
                      <span className="font-bold text-slate-900">{count}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${(count / totalStudents) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
                {totalStudents === 0 && <p className="text-sm text-slate-400 italic">No data to display.</p>}
              </div>
            </div>

            <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
              <Calendar className="absolute -right-4 -bottom-4 opacity-20" size={100} />
              <p className="text-indigo-100 text-sm font-medium">Quick Tip</p>
              <h3 className="text-xl font-bold mt-1">Manage Records</h3>
              <p className="text-indigo-100 text-sm mt-2 opacity-90 leading-relaxed">
                You can search by Student ID or Name to quickly find specific records in your database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
    <div className={`p-4 rounded-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

export default Dashboard;