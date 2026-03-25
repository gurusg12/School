import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  MapPin,
  IndianRupee,
  Building2,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const AdmissionForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Name: "",
    Mobile: "",
    City: "",
    Fee: "",
    Paid: "",
    Branch: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("student-info"));
    if (!stored) {
      navigate("/studentportal");
    } else {
      setForm((prev) => ({
        ...prev,
        ...stored,
      }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const balance = Number(form.Fee || 0) - Number(form.Paid || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...form,
      Balance: balance,
      Date: new Date().toLocaleString(),
    };

    localStorage.setItem(
      "student-info",
      JSON.stringify({
        Name: form.Name,
        Mobile: form.Mobile,
        City: form.City,
      })
    );

    const all = JSON.parse(localStorage.getItem("adm-info")) || [];
    localStorage.setItem("adm-info", JSON.stringify([...all, finalData]));

    if (form.Branch) {
      const branchData = JSON.parse(localStorage.getItem(form.Branch)) || [];
      branchData.push(finalData);
      localStorage.setItem(form.Branch, JSON.stringify(branchData));
      navigate(`/${form.Branch}`);
    }

    setForm((prev) => ({
      ...prev,
      Fee: "",
      Paid: "",
      Branch: "",
    }));
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6 text-zinc-100 font-sans">
      <div className="absolute inset-0 bg-indigo-500/5 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-lg bg-zinc-900/40 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-zinc-800 shadow-2xl overflow-hidden"
      >
        {/* Decorative Top Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600"></div>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <GraduationCap className="text-indigo-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Admission Entry</h2>
        </div>

        <p className="text-zinc-500 text-sm mb-8">
          Verify student details and allocate branch fees.
        </p>

        {/* --- Student Info Section --- */}
        <div className="grid grid-cols-1 gap-4 mb-8">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Personal Details</label>
          <Input
            icon={<User size={18} />}
            name="Name"
            value={form.Name}
            onChange={handleChange}
            placeholder="Student Name"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              icon={<Phone size={18} />}
              name="Mobile"
              value={form.Mobile}
              onChange={handleChange}
              placeholder="Mobile"
            />
            <Input
              icon={<MapPin size={18} />}
              name="City"
              value={form.City}
              onChange={handleChange}
              placeholder="City"
            />
          </div>
        </div>

        {/* --- Fee & Branch Section --- */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Fee Allocation</label>
          
          <div className="flex items-center gap-3 bg-zinc-950/50 border border-zinc-800 px-4 py-3 rounded-2xl focus-within:border-indigo-500/50 transition-all">
            <Building2 size={18} className="text-zinc-500" />
            <select
              name="Branch"
              value={form.Branch}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-sm text-zinc-200 cursor-pointer appearance-none"
              required
            >
              <option value="" className="bg-zinc-900">Select Branch</option>
              <option value="primarySchools" className="bg-zinc-900">Primary School</option>
              <option value="highSchools" className="bg-zinc-900">High School</option>
              <option value="puc" className="bg-zinc-900">PUC College</option>
              <option value="paramedical" className="bg-zinc-900">Paramedical</option>
              <option value="degreeColleges" className="bg-zinc-900">Degree College</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              icon={<IndianRupee size={18} />}
              name="Fee"
              value={form.Fee}
              onChange={handleChange}
              placeholder="Total Fee"
              type="number"
            />
            <Input
              icon={<IndianRupee size={18} />}
              name="Paid"
              value={form.Paid}
              onChange={handleChange}
              placeholder="Paid Now"
              type="number"
            />
          </div>

          {/* Balance Display */}
          <div className="flex items-center justify-between bg-indigo-500/5 border border-indigo-500/10 px-5 py-4 rounded-2xl mt-2">
            <div>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter">Current Balance</p>
                <p className="text-xl font-bold text-zinc-100">₹{balance.toLocaleString()}</p>
            </div>
            <ArrowRight className="text-indigo-500/30" />
          </div>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-2">
          Confirm Admission
        </button>
      </form>
    </div>
  );
};

/* --- Refined Reusable Input --- */
const Input = ({ icon, ...props }) => (
  <div className="flex items-center gap-3 bg-zinc-950/50 border border-zinc-800 px-4 py-3 rounded-2xl focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/20 transition-all group">
    <span className="text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
        {icon}
    </span>
    <input
      {...props}
      className="bg-transparent w-full outline-none placeholder-zinc-600 text-sm text-zinc-200"
    />
  </div>
);

export default AdmissionForm;