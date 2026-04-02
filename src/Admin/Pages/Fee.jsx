import React, { useState, useEffect } from 'react';
import { Search, Receipt, Printer, CheckCircle2, ArrowRight, User, Wallet } from 'lucide-react';

const Fee = () => {
  const [students, setStudents] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const [paymentData, setPaymentData] = useState({
    totalFee: '',
    amountToPay: '',
    payerName: '',
    mode: 'Cash',
    refNo: ''
  });
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('students') || '[]');
    setStudents(saved);
  }, []);

  const handleSearch = () => {
    const student = students.find(s => s.id === searchId || s.id.endsWith(searchId));
    if (student) {
      setSelectedStudent(student);
      setPaymentData({
        ...paymentData,
        totalFee: student.totalFee || '',
        payerName: student.name,
        amountToPay: ''
      });
      setReceipt(null);
    } else {
      alert("Student ID not found!");
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    const amount = parseFloat(paymentData.amountToPay);
    const manualTotal = parseFloat(paymentData.totalFee);
    const currentPaid = parseFloat(selectedStudent.paid || 0);
    const balanceBefore = manualTotal - currentPaid;

    if (amount <= 0 || amount > balanceBefore) {
      alert("Invalid amount. Cannot exceed balance.");
      return;
    }

    const newPaidTotal = currentPaid + amount;
    // We save date in YYYY-MM-DD for perfect filtering in the Report page
    const today = new Date().toISOString().split('T')[0];

    const updatedStudents = students.map(s => {
      if (s.id === selectedStudent.id) {
        return { 
          ...s, 
          totalFee: manualTotal, 
          paid: newPaidTotal,
          mode: paymentData.mode,
          lastPayer: paymentData.payerName,
          lastPaymentDate: today
        };
      }
      return s;
    });

    setStudents(updatedStudents);
    localStorage.setItem('students', JSON.stringify(updatedStudents));

    setReceipt({
      receiptNo: `REC-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString(),
      studentName: selectedStudent.name,
      studentId: selectedStudent.id,
      course: selectedStudent.course,
      payer: paymentData.payerName,
      amountPaid: amount,
      remainingBalance: manualTotal - newPaidTotal,
      mode: paymentData.mode
    });

    setSelectedStudent({ ...selectedStudent, totalFee: manualTotal, paid: newPaidTotal });
    setPaymentData({ ...paymentData, amountToPay: '', refNo: '' });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pb-20">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
            <Receipt size={28} />
        </div>
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Fee Portal</h1>
      </div>

      <div className="bg-white p-4 rounded-3xl shadow-sm border mb-8 flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" placeholder="Search Student ID (e.g. 001)..." 
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            value={searchId} onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <button onClick={handleSearch} className="bg-gray-900 text-white px-10 rounded-2xl font-bold hover:bg-black transition-all">Find</button>
      </div>

      {selectedStudent && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form onSubmit={handlePayment} className="lg:col-span-7 space-y-4">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border">
              <h3 className="font-black text-gray-800 mb-6 flex items-center gap-2 uppercase tracking-widest text-xs">
                <Wallet size={18} className="text-blue-500"/> Transaction Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Total Course Fee</label>
                  <input placeholder='total fee' type="number" required className="w-full p-4 bg-blue-50/50 border-none rounded-2xl font-bold text-blue-700 text-lg" value={paymentData.totalFee} onChange={(e) => setPaymentData({...paymentData, totalFee: e.target.value})} />
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Amount Paying Now</label>
                  <input placeholder='payable amount' type="number" required className="w-full p-4 bg-green-50 border-none rounded-2xl font-bold text-green-700 text-lg" value={paymentData.amountToPay} onChange={(e) => setPaymentData({...paymentData, amountToPay: e.target.value})} />
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Payment Mode</label>
                  <div className="flex gap-2">
                    {['Cash', 'UPI / PhonePe', 'Bank Transfer'].map(m => (
                        <button key={m} type="button" onClick={() => setPaymentData({...paymentData, mode: m})} className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${paymentData.mode === m ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{m}</button>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-blue-600 text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all">
                CONFIRM PAYMENT <ArrowRight size={24}/>
              </button>
            </div>
          </form>

          <div className="lg:col-span-5">
            {receipt ? (
              <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border-t-[12px] border-blue-600 sticky top-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-black text-gray-800">RECEIPT</h2>
                    <p className="text-xs text-gray-400 font-mono">{receipt.receiptNo}</p>
                  </div>
                  <CheckCircle2 className="text-green-500" size={40} />
                </div>
                <div className="space-y-4 border-b pb-8 mb-6">
                  <div className="flex justify-between text-sm"><span className="text-gray-400">Student</span><span className="font-bold">{receipt.studentName}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-400">Mode</span><span className="font-bold text-blue-600">{receipt.mode}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-400">Date</span><span className="font-medium">{receipt.date}</span></div>
                </div>
                <div className="bg-gray-50 p-6 rounded-3xl mb-6">
                  <div className="flex justify-between items-center mb-2"><span className="text-xs text-gray-500 font-bold uppercase">Paid</span><span className="text-2xl font-black text-green-600">₹{receipt.amountPaid}</span></div>
                  <div className="flex justify-between items-center"><span className="text-xs text-gray-500 font-bold uppercase">Balance</span><span className="text-lg font-bold text-red-500">₹{receipt.remainingBalance}</span></div>
                </div>
                <button onClick={() => window.print()} className="w-full bg-gray-900 text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-black transition-all"><Printer size={20} /> Print Receipt</button>
              </div>
            ) : (
                <div className="h-full border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center text-gray-300">
                    <Receipt size={64} className="mb-4 opacity-10" />
                    <p className="font-bold">Pending Transaction...</p>
                </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Fee;