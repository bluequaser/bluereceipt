import React from "react";
import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import {db} from '../../../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

function AddTask({onClose, open}) {
  const [isgroup, setIsGroup] = useState(true)
  const [issubaccountof, setIsSubAccountOf] = useState(false)
  const [account_name, setAccountName] = useState('')
  const [account_type, setAccountType] = useState('')
  const typeOptions = ["Assets","Liabilities","Equity","Subgroup of"];
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'chartofaccounts2'), {
        isgroup: true,
        issubaccountof: issubaccountof,
        account_name: account_name,
        account_type: account_type,
        completed: false,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Add Balance Sheet Group' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='account_name' 
          onChange={(e) => setTitle(e.target.value.toUpperCase())} 
          value={title}
          placeholder='Account Group Name'/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter task decription'
          value={description}></textarea>
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
