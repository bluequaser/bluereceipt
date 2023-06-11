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
const taskColRef1 = collection(db, 'chartofaccounts');
const taskColRef = query(taskColRef1, where("isgroup","==",false), where("supergroup","in",["Assets","Liabilities","Equity"]))
//where("supergroup","==","Income Group"))
    onSnapshot(taskColRef, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  return (
    <div className='taskManager'>

Balance Sheet: <Link  to="/balsheetgroups">Groups</Link> | {" "}
     <Link  to="/chartofaccountsgroups">Accounts</Link> | {" "}
     <Link  to="/settings"><b>Done</b></Link><br/><br/> 
     
     Profit & Loss Statement:  | {" "}
     <Link  to="/chartofaccountsgroups">Groups</Link> | {" "}
     <Link  to="/accountschartpl">Accounts</Link><br/><br/> 
       
      <header>Balance Sheet Accounts</header>
      <div className='taskManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add account +
        </button>
        <div className='taskManager__tasks'>

          {tasks.map((task) => (
            <Task
              id={task.id}
              key={task.id}
              completed={task.data.completed}
              account_name={task.data.account_name} 
              supergroup={task.data.supergroup}
              account_type={task.data.account_type}
              isgroup={task.data.isgroup}
              issubgroupof={task.data.issubgroupof}
              issubgroupofname={task.data.issubgroupofname}
              cashflowstatement={task.data.cashflowstatement}
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
