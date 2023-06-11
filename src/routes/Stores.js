import React from "react";

import {useState, useEffect} from 'react'
import {
  useLocation,
  NavLink,
  Outlet,
  useSearchParams,
} from 'react-router-dom';
import { nanoid } from "nanoid";
import {collection, query, orderBy, onSnapshot, addDoc, Timestamp} from "firebase/firestore"
import {db} from '../firebase'

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Stores() {
  const [tasks, setTasks] = useState([])
  const [newstorename, setNewStoreName] = useState("")
  let [searchParams, setSearchParams] = useSearchParams({ replace: true });
    /* function to get all tasks from firestore in realtime */ 
    useEffect(() => {
      const taskColRef = query(collection(db, 'stores'), orderBy('name'))
      onSnapshot(taskColRef, (snapshot) => {
        setTasks(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
    },[])

    /* function to add new task to firestore */
    const handleSubmit = async (e) => {
      e.preventDefault()
      if(newstorename == ""){
       alert("Please enter a store name..");
        return
      }
      try {
        await addDoc(collection(db, 'stores'), {
          name: newstorename,
          completed: false,
          created: Timestamp.now(),
          uniqueId: nanoid()
        })
        
      } catch (err) {
        alert(err)
      }
      setNewStoreName("");
    }
  
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ borderRight: 'solid 1px', padding: '1rem' }}>

 
        <input 
          type='text' 
          name='newstorename' 
          onChange={(e) => setNewStoreName(e.target.value.toUpperCase())} 
          value={newstorename}
          placeholder='Enter store name'/><br/>
        <button onClick={handleSubmit}>Add store +</button><br/><br/>
     
        <input
          placeholder="Search"
          value={searchParams.get('filter') || ''}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter }, { replace: true });
            } else {
              setSearchParams({}, { replace: true });
            }
          }}
        />
        {tasks
          .filter((task) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = task.data.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((task,index) => (
            <QueryNavLink
              key={index}
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : '',
                };
              }}
              to={`/stores/${task.data.uniqueId}`}
            >
              {task.data.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}

