'use client'
import { useState } from 'react';
import '../globals.css';
import { db } from '@/config/firebase';
import { collection,  addDoc, getDocs } from 'firebase/firestore';

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [students, setStudents] = useState([]);
  const [isUpdatingStudent, setIsUpdatingStudent] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');

  
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Fill all fields');
      return;
    }

    const newStudent = {
      name,
      email,
      phone,
    };
    if (isUpdatingStudent) {
      const updatedStudents = students.map((student) =>
        student.email === currentEmail ? newStudent : student
      );
      setStudents(updatedStudents);
      setIsUpdatingStudent(false);
      setCurrentEmail('');
    } else {
      setStudents([...students, newStudent]);
    }

    try {
      const studentDoc = collection(db, 'students');
      await addDoc(studentDoc, newStudent);
      
  

    
    } catch (error) {
      console.log('Error in Firestore: ', error);
    }

    setName('');
    setEmail('');
    setPhone('');
  };

  const updateHandler = (student) => {
    setIsUpdatingStudent(true);
    setCurrentEmail(student.email);
    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
  };

  const deleteHandler = async (email) => {
    
    const remainStudents = students.filter((student) => student.email !== email);
    setStudents(remainStudents);

    
  };

  const fetchData = async()=>{
   
    try {
      const collectionRef = collection(db,'students')
    const fetchDocs = await getDocs(collectionRef)
    const sudentsData = fetchDocs.map(doc => doc.data())
    console.log('students ',sudentsData);
    } catch (error) {
console.log('error',error);
    }
  }


  

  return (
    <div>
      <div className='back bg-cover w-full '>
        <h1 className='text-5xl text-gradient font-sans font-bold text-center'>
          Student Admission Form
        </h1>

        <div className="lg:mx-64 md:mx-40 sm:mx-10">
          <form onSubmit={submitHandler}>
          <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
           
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isUpdatingStudent ? 'Update' : 'Submit'}
              </button>
            
            </div>
          </form>
        </div>

        <div className="grid grid-cols-auto-fit gap-2 mx-4 pt-10">
          {students.map((student, i) => (
            <div key={i} className="bg-white rounded-xl shadow-xl pl-5 py-10">
              <h1 className="font-bold text-2xl">#{i + 1}</h1>
              <h1>
                <span className="font-bold text-xl">Name: </span>{student.name}
              </h1>
              <h1>
                <span className="font-bold text-xl">Email: </span>{student.email}
              </h1>
              <h1>
                <span className="font-bold text-xl">Phone: </span>{student.phone}
              </h1>
              <div>
                <button
                  className="bg-green-600 rounded-xl hover:text-white font-bold mt-5 py-2 px-5"
                  onClick={() => updateHandler(student)}
                >
                  Update
                </button>
                <button
                  className="bg-red-600 rounded-xl hover:text-white font-bold mt-5 py-2 ml-2 px-5"
                  onClick={() => deleteHandler(student.email)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
