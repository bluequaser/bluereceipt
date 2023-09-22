import React from "react";
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../firebase'

export default function SalesReport() {
  const [tasks, setTasks] = useState([])
  const [report, setReport] = useState([])

  useEffect(() => {
    const taskColRef = query(collection(db, 'salesdaybook_pos'))
    onSnapshot(taskColRef, (snapshot) => {
      setReport(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Sales</h2>
      <div>
      <table>
        <thead>
          <tr>
            <th>Details</th>
            <th>Amount<br/>Ksh</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
      </div>
    </main>
  );
}