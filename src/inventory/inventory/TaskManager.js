import React from "react"
import './taskManager.css'
import Task from './Task'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../../firebase'
import AddTask from './AddTask'
import {Link} from "react-router-dom"

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const taskColRef = query(collection(db, 'inventory'), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  return (
    <div className='taskManager'>
            <Link  to="/inventory"><b>Inventory</b></Link> | {" "}  
      <Link  to="/location"><b>Location</b></Link> | {" "}  
      <Link  to="/categories"><b>Categories</b></Link>   <br/> 
      <Link  to="/inventory"><b>Bundles</b></Link> | {" "}
      <Link  to="/inventory"><b>Services</b></Link> | {" "}
      <Link  to="/inventory"><b>Production Order</b></Link>      
      <header>Inventory Manager</header>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add inventory +
        </button>
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              isactive={task.data.isactive}
              name={task.data.name}
              code={task.data.code}
              unit={task.data.unit}
              costPrice={task.data.costPrice}
              salePrice={task.data.salePrice}
              description={task.data.description}
              mclass={task.data.mclass}
              taxCode={task.data.taxCode}
              startingBalance={task.data.startingBalance}
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
