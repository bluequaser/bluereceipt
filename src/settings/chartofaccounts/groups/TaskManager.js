import React from "react";
import './taskManager.css'
import Task from './Task'
import {useState, useEffect} from 'react'
import {collection, query, where, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../../../firebase'
import AddTask from './AddTask'
import {Link} from "react-router-dom"

function TaskManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [tasks, setTasks] = useState([])

  /* function to get all tasks from firestore in realtime */ 

  useEffect(() => {
    //    const taskColRef = query(collection(db, 'chartofaccounts') ,where("group","==",true),//orderBy('created', 'desc'))
    const taskColRef1 = collection(db, 'accountsgroup');
 //   const taskColRef = query(taskColRef1, where("isgroup","==",true), where("supergroup","in",["Income Group","Expense Group"]))
    //where("supergroup","==","Income Group"))
        onSnapshot(taskColRef1, (snapshot) => {
          setTasks(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      },[])


  return (
    <div className='taskManager'>

Balance Sheet: <Link  to="/balsheetgroups">Groups</Link> | {" "}
     <Link  to="/accountschartbs">Accounts</Link> | {" "}
     <Link  to="/settings"><b>Done</b></Link><br/><br/> 
     
     Profit & Loss Statement:  | {" "}
     <Link  to="/chartofaccountsgroups">Groups</Link> | {" "}
     <Link  to="/accountschartpl">Accounts</Link><br/><br/> 
       
      <header>Income Statement Groups</header>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add group +
        </button>
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Task
              id={task.id}
              name={task.data.name}
              group_type={task.data.group_type}
              subgroupof_name={task.data.subgroupof_name}
              isactive={task.data.isactive}
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
