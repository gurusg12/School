import React, { useState } from 'react';

const ReceiptModule = () => {
  const [payment, setPayment] = useState({
    studentId: '',
    prevBalance: 35000,
    amountPaid: 0,
    narration: ''
  });

  const currentBalance = payment.prevBalance - payment.amountPaid;

  localStorage.setItem("stdinfo" , JSON.stringify(payment))

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-xl border-t-4 border-green-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Fee Receipt</h2>
        <span className="text-sm text-gray-500">Date: 25/03/2026</span>
      </div>

      <div className="space-y-4">
        <input type="text" placeholder="Enter Student ID" className="w-full p-2 border rounded" />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-500">Previous Balance</label>
            <div className="p-2 bg-gray-100 rounded font-mono">{payment.prevBalance}</div>
          </div>
          <div>
            <label className="text-xs text-gray-500">Current Balance</label>
            <div className="p-2 bg-green-100 text-green-700 rounded font-bold">{currentBalance}</div>
          </div>
        </div>

        <input 
          type="number" 
          placeholder="Amount Paying Now" 
          className="w-full p-3 border-2 border-blue-200 rounded text-lg"
          onChange={(e) => setPayment({...payment, amountPaid: e.target.value})}
        />

        <textarea 
          placeholder="Narration (e.g., Paid by Father via GPay)" 
          className="w-full p-2 border rounded"
          rows="2"
        />

        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded transition">
          Generate Receipt & Update Ledger
        </button>
      </div>
    </div>
  );
};

export default ReceiptModule