import React, { useState, useEffect } from 'react';
import { UserPlus, Trash2, Edit3, Save, X, Search } from 'lucide-react';

const Registration = () => {
  // 1. State Management
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: '', name: '', number: '', city: '', course: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // 2. Load data from LocalStorage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  // 3. Save to LocalStorage whenever students list changes
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or Update Student
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setStudents(students.map(s => s.id === formData.id ? formData : s));
      setIsEditing(false);
    } else {
      const newStudent = { ...formData, id: `STU-${Date.now()}` };
      setStudents([...students, newStudent]);
    }
    setFormData({ id: '', name: '', number: '', city: '', course: '' });
  };

  // Delete Student
  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  // Load into Edit Mode
  const editStudent = (student) => {
    setFormData(student);
    setIsEditing(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* --- INPUT FORM CARD --- */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <UserPlus className="text-blue-600" />
          {isEditing ? 'Update Student' : 'Student Registration'}
        </h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" disabled placeholder="ID Auto-generated" value={formData.id}
            className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm italic" />
          
          <input type="text" name="name" required placeholder="Student Name" value={formData.name} onChange={handleChange}
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          
          <input type="text" name="number" required placeholder="Phone Number" value={formData.number} onChange={handleChange}
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          
          <input type="text" name="city" required placeholder="City" value={formData.city} onChange={handleChange}
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          
          <input type="text" name="course" required placeholder="Course & Class" value={formData.course} onChange={handleChange}
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none md:col-span-2" />

          <div className="md:col-span-2 flex gap-2 pt-2">
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
              {isEditing ? <><Save size={18}/> Update</> : <><UserPlus size={18}/> Register Student</>}
            </button>
            {isEditing && (
              <button type="button" onClick={() => {setIsEditing(false); setFormData({id:'',name:'',number:'',city:'',course:''})}} 
                className="px-6 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200">
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* --- STUDENT LIST TABLE --- */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Student Directory</h2>
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold">
            {students.length} Total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Student ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-10 text-center text-gray-400">No students registered yet.</td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr key={s.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 text-sm font-mono text-gray-400">{s.id.slice(-6)}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-800">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.city} • {s.number}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{s.course}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => editStudent(s)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => deleteStudent(s.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Registration;