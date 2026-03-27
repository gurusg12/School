import React from "react";
import * as Icons from "lucide-react"; // Import all icons as an object
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const branches = [
    { name: 'PU Colleges', iconName: 'GraduationCap', count: 4, color: 'bg-blue-600', Page: "puc" },
    { name: 'Paramedical', iconName: 'Stethoscope', count: 2, color: 'bg-emerald-600', Page: "paramedical" },
    { name: 'Degree Colleges', iconName: 'Building2', count: 3, color: 'bg-purple-600', Page: "degreeColleges" },
    { name: 'Primary Schools', iconName: 'School', count: 6, color: 'bg-orange-500', Page: "primarySchools" },
    { name: 'High Schools', iconName: 'BookOpen', count: 5, color: 'bg-rose-600', Page: "highSchools" },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-50 font-sans pb-12">
      {/* Header */}
      <header className="bg-white border-b h-20 flex items-center justify-between px-10 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
            <Icons.ShieldCheck className="text-white" size={24} />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">EduTrust</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">Administrator</p>
            <p className="text-[11px] text-emerald-500 font-bold uppercase tracking-widest leading-none">System Online</p>
          </div>
          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">
            AD
          </div>
        </div>
      </header>

      <div className="p-10 max-w-[1600px] mx-auto">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Students" value="12,450" iconName="Users" color="text-blue-600" trend="+12%" />
          <StatCard title="Total Staff" value="840" iconName="UserCheck" color="text-emerald-600" trend="+3%" />
          <StatCard title="Institutions" value="20" iconName="Layout" color="text-purple-600" trend="Stable" />
          <StatCard title="Revenue" value="₹4.2Cr" iconName="TrendingUp" color="text-orange-600" trend="+8%" />
        </div>

        {/* Directory Section */}
        <h3 className="text-2xl font-black text-slate-900 mb-8 border-l-4 border-blue-600 pl-4">Branch Directory</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {branches.map((b) => {
            // Dynamically get the icon component
            const BranchIcon = Icons[b.iconName] || Icons.HelpCircle;

            return (
              <div 
                key={b.name}
                onClick={() => navigate(`/${b.Page}`)}
                className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden relative"
              >
                {/* Visual Decoration */}
                <div className={`${b.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl relative z-10`}>
                  <BranchIcon size={28} />
                </div>
                
                <div className="relative z-10">
                  <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                    {b.name}
                  </h4>
                  <p className="text-sm text-slate-400 mt-1 font-bold">
                    {b.count} Institutions
                  </p>

                  <div className="mt-8 flex items-center text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    Manage Branch 
                    <Icons.ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* Big Faded Background Icon */}
                <BranchIcon size={120} strokeWidth={0.5} className="absolute -right-4 -bottom-4 text-slate-50 group-hover:text-slate-100 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Sub-component for Stats
const StatCard = ({ title, value, iconName, color, trend }) => {
  const IconComponent = Icons[iconName] || Icons.Activity;
  
  return (
    <div className="bg-white p-7 rounded-[1.5rem] border border-slate-100 shadow-sm group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 bg-slate-50 rounded-xl ${color}`}>
          <IconComponent size={24} />
        </div>
        <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-1 rounded-md">
          {trend}
        </span>
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 mt-1">{value}</h3>
    </div>
  );
};

export default Dashboard;