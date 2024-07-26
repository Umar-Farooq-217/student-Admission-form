import { collection, getDocs } from 'firebase/firestore'
import React, { useState } from 'react'

export default function page() {
    const [students,setStudents]= useState([])
    const fetchDocs = async()=>{
        const collectionRef = collection(db,'students')
        const docs = await getDocs(collectionRef)
        const studentData = []
        docs.forEach((doc)=>{
            studentData.push({
                id:doc.id,
                ...doc.data()
            })
        })
        setStudents(studentData)
    }




  return (
    <div>
        <button className="bg-yellow-200 py-3 px-5 font-bold text-white" onClick={fetchDocs}>See Students</button>
       {
        students.map((student)=>{
            return(
                <div className="">
                    <h1 className="">{student.name}</h1>
                    <h1 className="">{student.email}</h1>
                    <h1 className="">{student.phone}</h1>
                </div>
            )
        })
       }
        
      

    </div>
  )
}
