'use client'
import { db } from '@/config/firebase'
import { collection, getDocs } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'

export default function Page() {
    const [students, setStudents] = useState([])

    const fetchDocs = async () => {
        try {
            const collectionRef = collection(db, 'students');
            const docsSnapshot = await getDocs(collectionRef);
            const studentData = docsSnapshot.docs.map(doc => doc.data());
            setStudents(studentData);
            console.log('students', studentData);
        } catch (error) {
            console.log('Error a gaya ha bro', error);
        }
    }

    useEffect(() => {
        fetchDocs();
    }, []);

    return (
        <div>
            {students.map((student, index) => (
                <div key={index} className="">
                    <h1 className="">Student: {student.name}</h1>
                    <h1 className="">Email: {student.email}</h1>
                    <h1 className="">Phone: {student.phone}</h1>
                    <hr/>
                </div>
            ))}
        </div>
    )
}
