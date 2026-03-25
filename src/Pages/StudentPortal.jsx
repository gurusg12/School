import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Phone, MapPin } from 'lucide-react';

const StudentPortal = () => {
  useEffect(()=>{
    localStorage.removeItem("student-info")
  },[])
  const [info, setinfo] = useState({
    Name: "",
    Mobile: "",
    City: ""
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setinfo((prev) => ({ ...prev, [name]: value }));
  };

  const Id = info.City.slice(0 , 3)+info.Name.slice(0 , 3) +info.Mobile.slice(0 , 5)
  const submit = (e) => {
    e.preventDefault();    
    const updatedData = {...info, Date: new Date(Date.now()).toLocaleString(), StdId : Id.toLocaleLowerCase()};    
    localStorage.setItem("student-info", JSON.stringify(updatedData));
    navigate('/admission');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">Student Portal</h2>
          <p className="text-slate-400 text-sm mt-1">Enter details to start registration</p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-8 flex flex-col gap-5">
          <div className="relative">
            <UserPlus className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-800"
              type="text" name='Name' placeholder='Full Name' 
              value={info.Name} onChange={change} required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-800"
              type="text" name='Mobile' placeholder='Mobile Number' 
              value={info.Mobile} onChange={change} required
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-800"
              type="text" name='City' placeholder='City' 
              value={info.City} onChange={change} required
            />
          </div>

          <button 
            type="submit" 
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentPortal;