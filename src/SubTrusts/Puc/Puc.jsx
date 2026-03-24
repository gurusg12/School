import React, { useState } from "react";

const Puc = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    id: "",
    name: "",
    stream: "",
    year: "",
    combination: "",
    phone: "",
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
    if (!form.id || !form.name) {
      return alert("Student ID and Name required");
    }

    // Prevent duplicate ID
    const exists = students.find((s) => s.id === form.id);
    if (exists) return alert("Student ID already exists");

    setStudents([...students, form]);

    setForm({
      id: "",
      name: "",
      stream: "",
      year: "",
      combination: "",
      phone: "",
      file: null,
      preview: null,
    });
  };

  // Delete student
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Filter
  const filtered = students.filter((s) =>
    `${s.name} ${s.stream} ${s.year} ${s.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        PU College Admin Panel
      </h1>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name, stream, ID..."
        className="border p-2 w-full mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🧾 Form */}
      <div className="border p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">Add Student</h2>

        <input
          type="text"
          name="id"
          placeholder="Student ID"
          value={form.id}
          onChange={handleChange}
          className="border p-2 m-1"
        />

        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 m-1"
        />

        <input
          type="text"
          name="stream"
          placeholder="Stream (Science/Commerce/Arts)"
          value={form.stream}
          onChange={handleChange}
          className="border p-2 m-1"
        />

        <input
          type="text"
          name="year"
          placeholder="Year (1st PUC / 2nd PUC)"
          value={form.year}
          onChange={handleChange}
          className="border p-2 m-1"
        />

        <input
          type="text"
          name="combination"
          placeholder="Combination (PCMB/CEBA...)"
          value={form.combination}
          onChange={handleChange}
          className="border p-2 m-1"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
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
          className="bg-indigo-600 text-white px-4 py-2 mt-2"
        >
          Add Student
        </button>
      </div>

      {/* 📋 Student List */}
      <div>
        <h2 className="font-semibold mb-2">Student Records</h2>

        {filtered.length === 0 && <p>No records found</p>}

        {filtered.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center border p-3 mb-2"
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
                <p className="font-medium">
                  {s.name} ({s.id})
                </p>
                <p className="text-sm text-gray-600">
                  {s.stream} - {s.year}
                </p>
                <p className="text-sm text-gray-500">
                  Combination: {s.combination}
                </p>
                <p className="text-sm text-gray-500">
                  📞 {s.phone}
                </p>
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

export default Puc;