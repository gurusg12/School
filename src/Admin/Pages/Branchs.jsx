import React, { useEffect, useState } from 'react'

const Branchs = () => {
       const[branchs , setBranchs] = useState([])

//    const add = ()=>{
//      const Branchs = [{
//         BranchName : "G.P.Porwal" , BranchCode : "GPP123" , Adress : "Sindagi Vijayapura Road 586209"
//     }]

//     localStorage.setItem("Branchs" , JSON.stringify(Branchs))
//    }

   const GetBranchs = ()=>{
       const List = localStorage.getItem("Branchs")
       setBranchs(JSON.parse(List))
   }

   useEffect(()=>{
GetBranchs()
   }, [])

    
  return (
    <div>
      {
        branchs.map((e ,i )=>{
            return <div key={i}>
                
                <p>{e.BranchName}</p>
                <p>{e.BranchCode}</p>
                <p>{e.Adress}</p>


            </div>
        })
      }
    </div>
  )
}

export default Branchs
