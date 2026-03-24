import React, { useState } from 'react';

const AdmissionForm = () => {
  const [student, setStudent] = useState({
    name: '',
    mobile: '',
    city: '',
    totalFee: 50000,
    paid: 0,
    paymentMethod: 'Cash'
  });

  const balance = student.totalFee - student.paid;

    localStorage.setItem("stdinfo" , JSON.stringify(student))


  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded-md">
      <h2 className="text-xl font-bold mb-4">New Student Admission</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Student Name" className="w-full p-2 border" />
        <input type="text" placeholder="Mobile" className="w-full p-2 border" />
        
        <div className="border-t pt-4">
          <label className="block text-sm font-medium">Fee Details</label>
          <input type="number" value={student.totalFee} readOnly className="w-full p-2 bg-gray-100 border" />
          
          <div className="flex gap-2 mt-2">
            <input 
              type="number" 
              placeholder="Paid Amount" 
              onChange={(e) => setStudent({...student, paid: e.target.value})}
              className="w-full p-2 border" 
            />
            <select className="p-2 border">
              <option>Cash</option>
              <option>Transfer</option>
            </select>
          </div>
        </div>

        <div className="p-3 bg-red-50 text-red-700 font-bold">
          Balance to Pay: {balance}
        </div>
        
        <button className="w-full bg-blue-600 text-white py-2 rounded">Register Student</button>
      </form>
    </div>
  );
};

export default AdmissionForm