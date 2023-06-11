import React from 'react';
import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from '../../firebase'

function EditTask({open, onClose, toEditName, id}) {

  const [name, setName] = useState(toEditName)
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'mclass', id)
    try{
      await updateDoc(taskDocRef, {
        name: name
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  return (
    <Modal modalLable='Edit Class' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
        <input type='text' name='name' onChange={(e) => setName(e.target.value.toUpperCase())} value={name}/>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
