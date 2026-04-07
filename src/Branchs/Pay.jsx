import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Wallet,
  Receipt,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const Pay = () => {
  const [code, setCode] = useState("");
  const [student, setStudent] = useState(null);

  const [payment, setPayment] = useState({
    date: "",
    amount: "",
    narration: "",
    previousBalance: 0,
    balance: 0,
  });

  const [message, setMessage] = useState({ type: "", text: "" });

  // 🔍 SEARCH
  const handleSearch = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];

    const found = students.find(
      (s) => s.studentId?.toUpperCase() === code.toUpperCase()
    );

    if (!found) {
      setStudent(null);
      setMessage({ type: "error", text: "Student not found" });
      return;
    }

    const prevBalance =
      found.admission?.balance ??
      (Number(found.totalFee) || 0) - (Number(found.paid) || 0);

    setStudent(found);
    setPayment({
      date: "",
      amount: "",
      narration: "",
      previousBalance: prevBalance,
      balance: prevBalance,
    });

    setMessage({ type: "", text: "" });
  };

  // 📝 INPUT + AUTO BALANCE
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = { ...payment, [name]: value };

    const amount = Number(updated.amount) || 0;
    const prev = Number(updated.previousBalance) || 0;

    updated.balance = prev - amount;

    setPayment(updated);
  };

  // 💾 SAVE PAYMENT (WITH HISTORY)
  const handlePayment = () => {
    if (!student) return;

    const { date, amount, narration, previousBalance, balance } = payment;

    if (!date || !amount) {
      setMessage({ type: "error", text: "Fill required fields" });
      return;
    }

    const students = JSON.parse(localStorage.getItem("students")) || [];

    const updatedStudents = students.map((s) => {
      if (s.studentId === student.studentId) {
        const history = s.payments || [];

        return {
          ...s,

          // Update main balance
          admission: {
            ...s.admission,
            balance: balance,
          },

          // Add payment history
          payments: [
            {
              date,
              previousBalance,
              amount,
              balance,
              narration,
            },
            ...history,
          ],
        };
      }
      return s;
    });

    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setMessage({
      type: "success",
      text: `₹${amount} received successfully`,
    });

    setTimeout(() => {
      setStudent(null);
      setCode("");
      setPayment({
        date: "",
        amount: "",
        narration: "",
        previousBalance: 0,
        balance: 0,
      });
      setMessage({ type: "", text: "" });
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Wallet /> Fee Payment
      </h1>

      {/* SEARCH */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Student ID"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-3 rounded w-full"
        />
        <button onClick={handleSearch} className="bg-black text-white px-4 rounded">
          <Search />
        </button>
      </div>

      {/* MESSAGE */}
      {message.text && (
        <div
          className={`p-3 rounded ${
            message.type === "success" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* STUDENT INFO */}
      {student && (
        <div className="border p-4 rounded bg-gray-50">
          <h2 className="font-bold text-lg">{student.studentName}</h2>
          <p>ID: {student.studentId}</p>
          <p>Mobile: {student.mobile}</p>
          <p>City: {student.city}</p>
        </div>
      )}

      {/* PAYMENT FORM */}
      {student && (
        <div className="space-y-4 border p-4 rounded">

          <input
            type="date"
            name="date"
            value={payment.date}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />

          <input
            type="number"
            value={payment.previousBalance}
            readOnly
            className="border p-3 w-full rounded bg-gray-100"
            placeholder="Previous Balance"
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={payment.amount}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />

          <input
            type="number"
            value={payment.balance}
            readOnly
            className="border p-3 w-full rounded bg-gray-100"
            placeholder="Balance"
          />

          <input
            type="text"
            name="narration"
            placeholder="Narration"
            value={payment.narration}
            onChange={handleChange}
            className="border p-3 w-full rounded"
          />

          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-6 py-3 rounded w-full"
          >
            Save Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Pay;