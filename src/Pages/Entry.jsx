import React, { useState } from 'react';
import {
    School,
    Building2,
    Stethoscope,
    BookOpen,
    Users,
    GraduationCap,
    LayoutDashboard,
    Settings
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Entry = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const navigate = useNavigate()

    const branches = [
        { name: 'PU Colleges', icon: <GraduationCap size={20} />, count: 4, color: 'bg-blue-500', Page: "puc" },
        { name: 'Paramedical', icon: <Stethoscope size={20} />, count: 2, color: 'bg-emerald-500', Page: "paramedical" },
        { name: 'DegreeColleges', icon: <Building2 size={20} />, count: 3, color: 'bg-purple-500', Page: "degreeColleges" },
        { name: 'Primary Schools', icon: <School size={20} />, count: 6, color: 'bg-orange-500', Page: "primarySchools" },
        { name: 'High Schools', icon: <BookOpen size={20} />, count: 5, color: 'bg-rose-500', Page: "highSchools" },
    ];
    return (
        <div className="flex h-screen bg-gray-500 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold tracking-tight">EduTrust Admin</h1>
                    <p className="text-xs text-slate-400 mt-1">Central Management System</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-blue-600 rounded-lg cursor-pointer">
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Global Overview</span>
                    </div>

                    <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase px-3">
                        Institutions
                    </div>
                    {branches.map((branch) => (
                        <div key={branch.name} >
                            <Link to={`/${branch.Page}`} className="flex items-center justify-between p-3 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                                <div className="flex items-center gap-3">
                                    {branch.icon}
                                 <span className="text-sm">{branch.name}</span>
                                </div>
                                <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full">{branch.count}</span>
                            </Link>
                        </div>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 p-3 text-slate-400 hover:text-white cursor-pointer">
                        <Settings size={20} />
                        <span>Settings</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Top Header */}
                <header className="bg-white border-b h-16 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-lg font-semibold text-gray-800">Trust Dashboard</h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium">Administrator</p>
                            <p className="text-xs text-gray-500">Super User</p>
                        </div>
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                            AD
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8">
                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard title="Total Students" value="12,450" icon={<Users className="text-blue-600" />} trend="+12%" />
                        <StatCard title="Total Staff" value="840" icon={<Users className="text-emerald-600" />} trend="+3%" />
                        <StatCard title="Active Branches" value="20" icon={<Building2 className="text-purple-600" />} trend="Stable" />
                        <StatCard title="Annual Revenue" value="₹4.2Cr" icon={<BookOpen className="text-orange-600" />} trend="+8%" />
                    </div>

                    {/* Quick Access Branch Grid */}
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Branch Directory</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {branches.map((branch) => (
                            <div key={branch.name} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <div className={`${branch.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
                                    {branch.icon}
                                </div>
                                <h4 className="font-bold text-gray-800">{branch.name}</h4>
                                <p className="text-sm text-gray-500">{branch.count} Institutions Registered</p>
                                <button onClick={() => navigate(`/${branch.Page}`)} className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800">
                                    Manage Branch →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

const StatCard = ({ title, value, icon, trend }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start">
            <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">{trend}</span>
        </div>
        <div className="mt-4">
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
    </div>
);

export default Entry;