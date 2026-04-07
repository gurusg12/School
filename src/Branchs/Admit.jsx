import React, { useState } from "react";

const Admit = () => {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState("");

  const [admission, setAdmission] = useState({
    date: "",
    fee: "",
    paid: "",
    balance: 0,
  });

  // 🔍 Search Student
  const handleSearch = () => {
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];

    const found = allStudents.find((s) => s.studentId === studentId);

    if (!found) {
      setMessage("❌ Student not found");
      setStudent(null);
      return;
    }

    setStudent(found);
    setMessage("✅ Student found");
  };

  // 📝 Handle Input + Auto Balance
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...admission, [name]: value };

    const fee = Number(updated.fee) || 0;
    const paid = Number(updated.paid) || 0;

    updated.balance = fee - paid;

    setAdmission(updated);
  };

  // 💾 Save Admission
  const handleSave = () => {
    if (!student) {
      setMessage("❌ Search student first");
      return;
    }

    const { date, fee, paid, balance } = admission;

    if (!date || !fee || !paid) {
      setMessage("❌ Fill all fields");
      return;
    }

    let allStudents = JSON.parse(localStorage.getItem("students")) || [];

    const updatedStudents = allStudents.map((s) => {
      if (s.studentId === student.studentId) {
        return {
          ...s,
          admission: {
            date,
            fee,
            paid,
            balance,
          },
        };
      }
      return s;
    });

    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setMessage("🎉 Admission added successfully");

    setStudent(null);
    setStudentId("");
    setAdmission({ date: "", fee: "", paid: "", balance: 0 });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold">Admission</h1>

      {/* 🔍 Search */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-3 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* Message */}
      {message && <p>{message}</p>}

      {/* 👤 Student Details */}
      {student && (
        <div className="border p-4 rounded bg-gray-50">
          <h2 className="font-bold text-lg">{student.studentName}</h2>
          <p>ID: {student.studentId}</p>
          <p>Mobile: {student.mobile}</p>
          <p>City: {student.city}</p>
        </div>
      )}

      {/* 🧾 Admission Form */}
      {student && (
        <div className="space-y-4 border p-4 rounded">

          <input
            type="date"
            name="date"
            value={admission.date}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />

          <input
            type="number"
            name="fee"
            placeholder="Total Fee"
            value={admission.fee}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />

          <input
            type="number"
            name="paid"
            placeholder="Paid Amount"
            value={admission.paid}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />

          {/* 🔥 Auto Balance */}
          <input
            type="number"
            value={admission.balance}
            placeholder="Balance (Auto)"
            readOnly
            className="border p-3 w-full rounded bg-gray-100"
          />

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-3 rounded w-full"
          >
            Save Admission
          </button>
        </div>
      )}

    </div>
  );
};

export default Admit;