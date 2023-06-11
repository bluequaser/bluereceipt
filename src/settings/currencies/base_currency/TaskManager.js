import React from 'react';
import './taskManager.css'
import Task from './Task'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../../../firebase'
import AddTask from './AddTask'
import {Link} from 'react-router-dom'

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const taskColRef = query(collection(db, 'currency_base'), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  return (
    <div className='taskManager'>
      <Link  to="/settings"><b>Done</b></Link> | {" "}
      <Link  to="/currency_base"><b>Base Currency</b></Link> | {" "}
      <Link  to="/currencies_foreign"><b>Foreign Currencies</b></Link>   
      <header>Base Currency Manager</header>
      <div className='taskManager__container'>
        {tasks.length == 0 ?
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add base currency +
        </button>
        : null}
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              name={task.data.name} 
              code={task.data.code}
              symbol={task.data.symbol}
              decimal_places={task.data.decimal_places}
            />
          ))}

        </div>
      </div>

      {openAddModal &&
        <AddTask onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default TaskManager
