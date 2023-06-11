import React from "react"
import './task.css'
import {useState} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import { doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from '../../firebase'

function Task({id, name, code, unit, costPrice, salePrice, description, mclass, taxCode, startingBalance, location, averageCost, customIncomeAccount, customExpenseAccount, completed}) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  /* function to update firestore */
  const handleChange = async () => {
    const taskDocRef = doc(db, 'inventory', id)
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
    const taskDocRef = doc(db, 'inventory', id)
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
        <h2>{name}</h2>
        <p>{code}</p> 
        <p>{unit}</p> 
        <p>{costPrice}</p> 
        <p>{salePrice}</p> 
        <p>{description}</p> 
        <p>{mclass}</p> 
        <p>{taxCode}</p> 
        <p>{startingBalance}</p> 
        <p>{location}</p> 
        <p>{averageCost}</p> 
        <p>{customIncomeAccount}</p> 
        <p>{customExpenseAccount}</p>
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
          name={name}
          code={code}
          unit={unit}
          costPrice={costPrice}
          salePrice={salePrice}
          description={description}
          division={division}
          taxCode={taxCode} 
          startingBalance={startingBalance}
          location={location}
          averageCost={averageCost}
          customIncomeAccount={customIncomeAccount} 
          customExpenseAccount={customExpenseAccount}
          open={open.view} />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toEditName={name} 
          toEditCode={code}
          toEditUnit={unit} 
          toEditCostPrice={costPrice}
          toEditSalePrice={salePrice}
          toEditDescription={description} 
          toEditDivision={division}
          toEditTaxCode={taxCode} 
          toEditStartingBalance={startingBalance}
          toEditLocation={location} 
          toEditAverageCost={averageCost}
          toEditCustomIncomeAccount={customIncomeAccount}
          toEditCustomExpenseAccount={customExpenseAccount}
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Task