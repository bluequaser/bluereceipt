import React from "react"
import './task.css'
import {useState} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import { doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from '../../../firebase'

function Task({id, account_name,supergroup, account_type, isgroup, issubgroupof, issubgroupofname,  completed}) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, 'chartofaccounts', id)
    try{
      await updateDoc(taskDocRef, {
        completed: checked
      })
    } catch (err) {
      alert(err)
    }
  }

  /* function to delete a document from firstore */ 
  const handleDelete = async () => {
    const taskDocRef = doc(db, 'chartofaccounts', id)
    try{
      await deleteDoc(taskDocRef)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked}
          onChange={handleChange}
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} ></label>
      </div>
      <div className='task__body'>
        <h2>{account_name}</h2>
        <p>{supergroup}</p>
        <p>{account_type}</p>
        <p>{isgroup}</p>
        <p>{issubgroupof}</p>
        <p>{issubgroupofname}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit : true})}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={handleDelete}>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem 
          onClose={handleClose} 
          account_name={account_name} 
          supergroup={supergroup}
          account_type={account_type} 
          isgroup={isgroup ? "true" : "false"}
          issubgroupof={issubgroupof ? "true" : "false"}
          issubgroupofname={issubgroupofname == null ? "---" : issubgroupofname}
          open={open.view} />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toEditName={account_name} 
          toEditSupergroup={supergroup} 
          toEditType={account_type} 
          toEditIsgroup={isgroup} 
          toEditIssubgroupof={issubgroupof}
          toEditIssubgroupofname={issubgroupofname}
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Task