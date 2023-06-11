import React from 'react';
import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import {db} from '../../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

function AddTask({onClose, open}) {

  const [name, setName] = useState('')

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'location'), {
        name: name,
        completed: false,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Add Store | Location' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='name' 
          onChange={(e) => setName(e.target.value.toUpperCase())} 
          value={name}
          placeholder='Enter name'/>
 
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
