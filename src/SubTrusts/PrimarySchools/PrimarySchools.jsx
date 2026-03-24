import React, { useState } from "react";

const PrimarySchools = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    className: "",
    file: null,
    preview: null,
  });

  // Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      const file = files[0];
      setForm({
        ...form,
        file,
        preview: URL.createObjectURL(file),
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add student
  const addStudent = () => {
    if (!form.name) return alert("Enter student name");


    setForm({ name: "", className: "", file: null, preview: null });
  };

  // Delete student
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Filter
  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">School Admin Panel</h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search student..."
        className="border p-2 w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🧾 Form */}
      <div className="border p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Add Student</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 m-1"
        />

        <input
          type="text"
          name="className"
          placeholder="Class"
          value={form.className}
          onChange={handleChange}
          className="border p-2 m-1"
        />

        <input type="file" name="file" onChange={handleChange} />

        {form.preview && (
          <img
            src={form.preview}
            alt="preview"
            className="w-20 mt-2 rounded"
          />
        )}

        <br />

        <button
          onClick={addStudent}
          className="bg-blue-600 text-white px-4 py-2 mt-2"
        >
          Add Student
        </button>
      </div>

      {/* 📋 Student List */}
      <div>
        <h2 className="font-semibold mb-2">Student List</h2>

        {filtered.length === 0 && <p>No students found</p>}

        {filtered.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center border p-2 mb-2"
          >
            <div className="flex items-center gap-3">
              {s.preview && (
                <img
                  src={s.preview}
                  alt="student"
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-sm text-gray-500">{s.className}</p>
              </div>
            </div>

            <button
              onClick={() => deleteStudent(s.id)}
              className="bg-red-500 text-white px-3 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrimarySchools;