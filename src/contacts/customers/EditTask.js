import React from "react"
import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from '../../firebase'

function EditTask({open, onClose, toEditName, toEditCode,toEditCreditLimit,toEditAddress, toEditEmail, toEditDivision, toEditStartingBalance, id}) {

  const [name, setName] = useState(toEditName)
  const [code, setCode] = useState(toEditCode)
  const [creditLimit ,setCreditLimit] = useState(toEditCreditLimit)
  const [address, setAddress] = useState(toEditAddress)
  const [email, setEmail] = useState(toEditEmail)
  const [division, setDivision] = useState(toEditDivision)
  const [startingBalance, setStartingBalance] = useState(toEditStartingBalance)
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'customers', id)
    try{
      await updateDoc(taskDocRef, {
        name: name,
        code: code,
        creditLimit: creditLimit,
        address: address,
        email: email,
        division: division,
        startingBalance: startingBalance
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  return (
    <Modal modalLable='Edit Customer' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
        <input type='text' name='name' onChange={(e) => setName(e.target.value.toUpperCase())} value={name}/>
        <input type='text' name='code' onChange={(e) => setCode(e.target.value.toUpperCase())} value={code}/>
        <input type='number' name='creditLimit' onChange={(e) => setCreditLimit(e.target.value.toUpperCase())} value={creditLimit}/>

        <textarea onChange={(e) => setAddress(e.target.value)} value={address}></textarea>
        <input type='text' name='email' onChange={(e) => setEmail(e.target.value.toUpperCase())} value={email}/>
        <input type='text' name='division' onChange={(e) => setDivision(e.target.value.toUpperCase())} value={division}/>
        <input type='number' name='startingBalance' onChange={(e) => setStartingBalance(e.target.value.toUpperCase())} value={startingBalance}/>

        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
