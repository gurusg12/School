import React, { useState, useEffect } from 'react';
import { UserPlus, Users, MapPin, BookOpen, Phone } from 'lucide-react';

const Registration = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    city: '',
    course: ''
  });

  // Load data on initial mount
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem('student_records')) || [];
    setStudents(savedStudents);
  }, []);

  // Update localStorage whenever students list changes
  useEffect(() => {
    localStorage.setItem('student_records', JSON.stringify(students));
  }, [students]);

  const generateStudentId = () => {
    if (students.length === 0) return 'STU-1001';
    const lastId = students[students.length - 1].id;
    const lastNum = parseInt(lastId.split('-')[1]);
    return `STU-${lastNum + 1}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newStudent = {
      ...formData,
      id: generateStudentId(),
      dateAdded: new Date().toLocaleDateString()
    };

    setStudents([...students, newStudent]);
    
    // Reset Form
    setFormData({ name: '', mobile: '', city: '', course: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Registration Header */}
        <div className="flex items-center gap-3 mb-8">
          <UserPlus className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Student Registration</h1>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                required
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter 10-digit mobile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                required
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Bangalore"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <select
                required
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Select Course</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Information Science">Information Science</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg active:transform active:scale-95"
            >
              Register Student
            </button>
          </form>
        </div>

        {/* Display List / Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">Course</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">City</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((stu) => (
                  <tr key={stu.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-blue-600">{stu.id}</td>
                    <td className="px-6 py-4 text-gray-800">{stu.name}</td>
                    <td className="px-6 py-4 text-gray-600">{stu.course}</td>
                    <td className="px-6 py-4 text-gray-600">{stu.city}</td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400 italic">
                      No student records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="mt-6 flex items-center justify-between bg-blue-50 border border-blue-100 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-blue-800">
            <Users size={20} />
            <span className="font-medium">Total Registered Students:</span>
          </div>
          <span className="text-2xl font-bold text-blue-700">{students.length}</span>
        </div>
      </div>
    </div>
  );
};

export default Registration;