import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserPlus, 
  MapPin, 
  Phone, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Building2
} from "lucide-react";

const Registerstd = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    mobile: "",
    city: "",
  });

  const [branch, setBranch] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [registeredStudents, setRegisteredStudents] = useState([]);

  // Load branch & students
  useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedBranch"));
    if (logged) {
      setBranch(logged);
      const allStudents = JSON.parse(localStorage.getItem("students")) || [];
      const branchStudents = allStudents.filter(s => s.branchCode === logged.code);
      setRegisteredStudents(branchStudents);
    }
  }, []);

  // Generate Student ID
  const generateStudentCode = (name) => {
    const namePart = name.slice(0, 3).toUpperCase() || "STD";
    const random = Math.floor(1000 + Math.random() * 9000);
    return `STD-${namePart}-${random}`;
  };

  // Input handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { studentName, mobile, city } = formData;

    if (!studentName || !mobile || !city) {
      setMessage({ type: "error", text: "Please fill all fields" });
      return;
    }

    if (!branch) {
      setMessage({ type: "error", text: "Authentication Error: No branch found" });
      return;
    }

    const newStudent = {
      id: Date.now(),
      studentId: generateStudentCode(studentName),
      studentName,
      mobile,
      city,
      branchName: branch.branchName,
      branchCode: branch.code,
      registeredBy: branch.personName,
      regDate: new Date().toLocaleDateString(),
    };

    const existing = JSON.parse(localStorage.getItem("students")) || [];
    const updated = [newStudent, ...existing];

    localStorage.setItem("students", JSON.stringify(updated));

    setRegisteredStudents(updated.filter(s => s.branchCode === branch.code));
    setMessage({ type: "success", text: "Student Registered Successfully!" });

    setFormData({ studentName: "", mobile: "", city: "" });

    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="text-indigo-600" /> Registration Desk
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Enroll new students into the system
          </p>
        </div>

        {branch && (
          <div className="flex items-center gap-3 px-4 py-2 bg-indigo-50 rounded-2xl border border-indigo-100">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Building2 size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-indigo-400">
                Current Branch
              </p>
              <p className="text-sm font-semibold text-indigo-900">
                {branch.branchName}
              </p>
            </div>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* FORM */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 sticky top-24"
          >
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Inputs */}
              <div className="space-y-4">
                {[
                  { name: "studentName", placeholder: "Student Full Name", icon: <Users size={18} />, type: "text" },
                  { name: "mobile", placeholder: "Mobile Number", icon: <Phone size={18} />, type: "tel" },
                  { name: "city", placeholder: "City", icon: <MapPin size={18} />, type: "text" },
                ].map((field) => (
                  <div key={field.name} className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600">
                      {field.icon}
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    />
                  </div>
                ))}
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-slate-900 hover:bg-indigo-600 text-white py-4 rounded-2xl font-bold"
              >
                Register Student
              </motion.button>

              {/* Message */}
              <AnimatePresence>
                {message.text && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-center gap-2 p-4 rounded-2xl text-sm ${
                      message.type === "success"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {message.type === "success" ? <CheckCircle2 /> : <AlertCircle />}
                    {message.text}
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </motion.div>
        </div>

        {/* STUDENT LIST */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold text-slate-800">
            Recent Registrations ({registeredStudents.length})
          </h2>

          <div className="grid gap-4">
            <AnimatePresence>
              {registeredStudents.length > 0 ? (
                registeredStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white p-5 rounded-2xl border flex justify-between"
                  >
                    <div className="flex gap-4">
                      <div className="h-12 w-12 bg-indigo-500 text-white flex items-center justify-center rounded-xl font-bold">
                        {student.studentName.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-bold">{student.studentName}</h3>

                        <div className="text-xs text-slate-500 mt-1 flex gap-3">
                          <span className="text-indigo-600">
                            {student.studentId}
                          </span>

                          <span className="flex items-center gap-1">
                            <Phone size={12} /> {student.mobile}
                          </span>

                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {student.city}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-right">
                      <p>Registered</p>
                      <p className="font-semibold">{student.regDate}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20 text-slate-400">
                  No students yet
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