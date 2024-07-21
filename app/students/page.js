'use client'
import { db } from '@/config/firebase'
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'

export default function Page() {
    const [students, setStudents] = useState([])
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const fetchDocs = async () => {
        try {
            const collectionRef = collection(db, 'students');
            const docs = await getDocs(collectionRef);
            const studentData = []
            docs.forEach((doc)=>{
                studentData.push(
                    {
                        id:doc.id,
                        ...doc.data()
                    }
                )
            })

           

            setStudents(studentData);
            console.log('students', studentData);
        } catch (error) {
            console.log('Error a gaya ha bro', error);
        }
    }

    useEffect(() => {
        fetchDocs();
    }, []);

    const deleteHandler = async(id)=>{
        try {
           const collectionRef = doc(db,'students',id)
           const deletedDoc = await deleteDoc(collectionRef)
           setStudents(deletedDoc)
        } catch (error) {
            console.log('error a gaya ',error);
          
        }
        const previousStudents = students.filter(student => student.id !== id)
        setStudents(previousStudents)
    }

    const updateHandler = async(id)=>{
        const docFef = doc(db,'students',id)
        try {
            await updateDoc(docFef,{
                name:newName,
                email:newEmail,
                phone:newPhone
            })
            fetchDocs()
            setNewEmail('')
            setNewName('')
            setNewPhone('')
            
        } catch (error) {
            
        }
    }

    return (
        <div>
            <div className="">
            <input
                    type="text"
                    placeholder="New Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="New Email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="New Phone"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                />
            </div>
            {students.map((student, index) => (
                <div key={index} className="">
                    <h1 className="">Id : {student.id}</h1>
                    <h1 className="">Student: {student.name}</h1>
                    <h1 className="">Email: {student.email}</h1>
                    <h1 className="">Phone: {student.phone}</h1>
                    <div>
                <button
                  className="bg-green-600 rounded-xl hover:text-white font-bold mt-5 py-2 px-5"
                  onClick={() => updateHandler(student.id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 rounded-xl hover:text-white font-bold mt-5 py-2 ml-2 px-5"
                  onClick={() => deleteHandler(student.id)}
                >
                  Delete
                </button>
              </div>
                    <hr/>
                </div>
            ))}
        </div>
    )
}
