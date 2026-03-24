import React, { useEffect, useState } from 'react';

const AdmissionForm = () => {
  const [formData , setFormData] = useState({ Name: '',Mobile : "", City: '' });
  const[data , setdata] = useState({})

  function hell(){
  const Data = JSON.parse(localStorage.getItem("student-info"))
  setdata(Data)
  }
  useEffect(()=>{

    
    hell()
      console.log(data)

  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    localStorage.setItem("student-info" , JSON.stringify(data))
    setdata({ Name: '',Mobile : "", City: '' })
  };


const [Adminfo , setAdminfo] = useState({Fee : "" , Paid : "" })
const AdmChange = (q)=>{
  // setbalance((Adminfo.Fee - Adminfo.Paid))
  const {name , value } = q.target
  setAdminfo((prev)=>(
    {...prev , [name] : value}
  ))
 
}
// const Balance = (Number(Adminfo.Fee)- Number(Adminfo.Paid))
const Balance = Adminfo.Fee-Adminfo.Paid 
const AdmSubmit = (q)=>{
  q.preventDefault()
  const finaldata = {...Adminfo , Balance : Balance, Date : new Date(Date.now()).toLocaleString()}

  localStorage.setItem("adm-info" , JSON.stringify(finaldata))
  setAdminfo({Fee : "" , Paid : "" , Balance : "" })
}

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 border border-slate-100">
        
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Admission Form
          </h2>
       
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
  <div className="group gap-3 flex flex-col">
            <input
              type="text"
              name="Name"
              required
              placeholder="e.g. Alex Rivera"
              value={data.Name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
              <input
              type="number"
              name="Mobile"
              required
              placeholder="e.g. Alex Rivera"
              value={data.Mobile}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
             <input
              type="text"
              name="City"
              required
              placeholder="e.g. Alex Rivera"
              value={data.City}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] focus:ring-4 focus:ring-blue-300"
          >  Submit Application
          </button>
        </form>


        <div className='mt-5 p-1 '>
            <form onSubmit={AdmSubmit} className="space-y-6">
  <div className="group gap-3 flex flex-col">
            <input
              type='number'
              name="Fee"
              required
              placeholder="Feee"
              value={Adminfo.Fee}
              onChange={AdmChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
              <input
              type="number"
              name="Paid"
              required
              placeholder="Paid here "
              value={Adminfo.Paid}
              onChange={AdmChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
             <input
              type="number"
              // name="Balance"
              required
              readonly
              placeholder="Balance Amount..."
              value={Balance}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 placeholder:text-slate-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] focus:ring-4 focus:ring-blue-300"
          >  Submit Application
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;