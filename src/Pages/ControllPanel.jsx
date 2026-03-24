import React, { useState } from 'react';
import AdmissionForm from './AdmissionForm';
import ReceiptModule from './ReceiptModule';

const ControlPanel = () => {
  const [selectedBranch, setSelectedBranch] = useState('PUCollege');

  const branches = [
    "PUCollege", "DegreeCollege", "Primary", "HighSchool", "Hostal"
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">School Accounting System</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Branch Selection */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Institution Branch</h2>
          <select 
            value={selectedBranch} 
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          <p className="mt-2 text-sm text-blue-600">Currently Managing: {selectedBranch}</p>
        </div>

        {/* Quick Stats Placeholder */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Financial Summary</h2>
          <div className="flex justify-between">
            <span>Total Fees Due:</span>
            <span className="font-bold text-red-500">35,000</span>
          </div>
        </div>
      </div>

     <div className='flex'> <AdmissionForm/>
      <ReceiptModule/></div>
    </div>
  );
};

export default ControlPanel;