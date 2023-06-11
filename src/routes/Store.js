import React from "react";
import {useState, useEffect} from 'react'
import { useParams ,
  useNavigate,
  useLocation} from "react-router-dom";

import {collection, query, where,orderBy, onSnapshot, doc,deleteDoc, addDoc, updateDoc, Timestamp} from "firebase/firestore"
import {db} from '../firebase'

export default function Store() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  const[uniqueId,setUniqueId] = useState(params.storeId);

  const [tasks, setTasks] = useState([])
  const [store, setStore] = useState([]) 
  const [storename, setStoreName] = useState('')
  const [isEdit, setEdit] = useState(false)
    /* function to get all tasks from firestore in realtime */ 
    useEffect(() => {
      const taskColRef = query(collection(db, 'stores'), orderBy('created', 'desc'))
      onSnapshot(taskColRef, (snapshot) => {
        setTasks(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
 
     // alert("Hello")
    },[])

    const handleChange = async (e) => {
      e.preventDefault();
      setStoreName(e.target.value)
    }
  /* function to update firestore */
  const handleUpdate = async () => {
    var id="";
    tasks.map((task) =>{
      
      if(task.data.uniqueId === uniqueId)
      id=task.id
      // alert("Hey "+id)
      
    });
    const taskDocRef = doc(db, 'stores', id)
    try{
      await updateDoc(taskDocRef, {
        name: storename,
        completed: true,
        created: Timestamp.now(),
      })
    } catch (err) {
      alert(err)
    }
  }
/* function to delete a document from firstore */ 
const handleDelete = async () => {
 
  var id="";
  tasks.map((task) =>{
    
    if(task.data.uniqueId === uniqueId)
    id=task.id
     //setStoreName(task.data.name)
     alert("Hey "+id)
    
  });
  const taskDocRef = doc(db, 'stores', id)
  try{
    await deleteDoc(taskDocRef)
  } catch (err) {
    alert(err)
  }
}
  return (
    <main style={{ padding: "1rem" }}>
      { isEdit == false ? 
      <div>
      <h2>Store: {
        tasks.map((task)=>(
          task.data.uniqueId == uniqueId ? task.data.name : null
        ))
        }</h2>
      <p>
        <button
          onClick={() => {
            handleDelete();
            navigate("/stores" + location.search);
          }}
        >
          Delete
        </button> |{" "}
        <button
          onClick={() => {
            tasks.map((task)=>(
              task.data.uniqueId == uniqueId ? task.data.name : ""
             ))  
            setEdit(true);
          }}
        >
          Update
        </button> |{" "}        
        <button
          onClick={() => {
            navigate("/stores" + location.search);
          }}
        >
          Close
        </button>        
      </p>
      </div> : 
            <div>
            <h2>Store:
            {
        tasks.map((task)=>(
          task.data.uniqueId == uniqueId ? task.data.name : null
        ))
        }
              <input onChange={handleChange} value={storename}
              placeholder="Enter edited store name" /></h2>
            <p>
              <button
                onClick={() => {
                  handleUpdate();
                  navigate("/stores" + location.search);
                }}
              >
                Update
                
              </button> |{" "}
              <button
                onClick={() => {
                  navigate("/stores" + location.search);
                }}
              >
                Close
                
              </button>        
            </p>
            </div>
      }
    </main>
  );
}