import React from "react"
import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from '../../firebase'

function EditTask({open, onClose, toEditName, toEditCode, toEditAddress, id}) {

  const [name, setName] = useState(toEditName)
  const [address, setAddress] = useState(toEditAddress)
  const [code, setCode] = useState(toEditCode)

  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'suppliers', id)
    try{
      await updateDoc(taskDocRef, {
        name: name,
        code: code,
        address: address
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  return (
    <Modal modalLable='Edit Supplier' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
        <input type='text' name='name' onChange={(e) => setName(e.target.value.toUpperCase())} value={name}/>
        <input type='text' name='code' onChange={(e) => setCode(e.target.value.toUpperCase())} value={code}/>
        <textarea onChange={(e) => setAddress(e.target.value)} value={address}></textarea>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
