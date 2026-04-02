import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  MapPin, 
  Phone, 
  GraduationCap, 
  Search, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Building2
} from "lucide-react";

const Registerstd = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    className: "",
    mobile: "",
    address: "",
  });
  const [branch, setBranch] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [registeredStudents, setRegisteredStudents] = useState([]);

  // Fetch branch and filter students on load
  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedBranch"));
    if (logged) {
      setBranch(logged);
      const allStudents = JSON.parse(localStorage.getItem("students")) || [];
      // Filter: Show only students registered by THIS branch code
      const branchStudents = allStudents.filter(s => s.branchCode === logged.code);
      setRegisteredStudents(branchStudents);
    }
  }, []);

  const generateStudentCode = (name) => {
    const namePart = name.slice(0, 3).toUpperCase() || "STD";
    const random = Math.floor(1000 + Math.random() * 9000);
    return `STD-${namePart}-${random}`;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { studentName, className, mobile, address } = formData;

    if (!studentName || !className || !mobile || !address) {
      setMessage({ type: "error", text: "Please fill all fields" });
      return;
    }

    if (!branch) {
      setMessage({ type: "error", text: "Authentication Error: No branch found" });
      return;
    }

    const newStudent = {
      id: Date.now(),
      ...formData,
      studentCode: generateStudentCode(studentName),
      branchName: branch.branchName,
      branchCode: branch.code,
      registeredBy: branch.personName,
      regDate: new Date().toLocaleDateString(),
    };

    const existing = JSON.parse(localStorage.getItem("students")) || [];
    const updated = [newStudent, ...existing]; // Newest first

    localStorage.setItem("students", JSON.stringify(updated));
    
    // Update local state for immediate UI refresh
    setRegisteredStudents(updated.filter(s => s.branchCode === branch.code));
    setMessage({ type: "success", text: "Student Registered Successfully!" });
    setFormData({ studentName: "", className: "", mobile: "", address: "" });

    // Clear message after 3s
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="text-indigo-600" /> Registration Desk
          </h1>
          <p className="text-slate-500 text-sm mt-1">Enroll new students into the system</p>
        </div>
        
        {branch && (
          <div className="flex items-center gap-3 px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Building2 size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-indigo-400">Current Branch</p>
              <p className="text-sm font-semibold text-indigo-900">{branch.branchName}</p>
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Registration Form */}
        <div className="lg:col-span-5">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                {[
                  { name: "studentName", placeholder: "Student Full Name", icon: <Users size={18} />, type: "text" },
                  { name: "className", placeholder: "Assigned Class", icon: <GraduationCap size={18} />, type: "text" },
                  { name: "mobile", placeholder: "Mobile Number", icon: <Phone size={18} />, type: "number" },
                  { name: "address", placeholder: "Residential Address", icon: <MapPin size={18} />, type: "text" },
                  { name: "totalFee", placeholder: "totalFee", icon: <MapPin size={18} />, type: "number" },

                ].map((field) => (
                  <div key={field.name} className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all outline-none text-slate-700 font-medium"
                    />
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                Complete Registration
              </motion.button>

              <AnimatePresence>
                {message.text && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`flex items-center gap-2 p-4 rounded-2xl text-sm font-medium ${
                      message.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    }`}
                  >
                    {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Registered Students List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              Recent Registrations 
              <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full">
                {registeredStudents.length}
              </span>
            </h2>
          </div>

          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {registeredStudents.length > 0 ? (
                registeredStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white p-5 rounded-[2rem] border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {student.studentName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{student.studentName}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                            {student.studentCode}
                          </span>
                          <span className="flex items-center gap-1">
                            <GraduationCap size={14} /> {student.className}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block text-right">
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Registered On</p>
                       <p className="text-sm font-semibold text-slate-700">{student.regDate}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200 text-slate-400">
                  <Users size={48} strokeWidth={1} className="mb-4 opacity-20" />
                  <p className="font-medium">No students registered yet in this branch.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerstd;