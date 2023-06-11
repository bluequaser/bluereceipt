import React from "react"
import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import {db} from '../../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

function AddTask({onClose, open}) {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [division, setDivision] = useState('')
  const [creditLimit, setCreditLimit] = useState(0)
  const [startingBalance, setStartingBalance] = useState(0)
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'customers'), {
        name: name,
        code: code,
        creditLimit: creditLimit,
        address: address,
        email: email,
        division: division,
        startingBalance: startingBalance,
        completed: false,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Add Customer' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='name' 
          onChange={(e) => setName(e.target.value.toUpperCase())} 
          value={name}
          placeholder='Enter name'/>
        <input 
          type='text' 
          name='code' 
          onChange={(e) => setCode(e.target.value.toUpperCase())} 
          value={code}
          placeholder='Enter code'/>
        <input 
            type='number' 
            name='creditLimit' 
            onChange={(e) => setCreditLimit(e.target.value.toUpperCase())} 
            value={creditLimit}
            placeholder='Enter credit limit'/>
        <textarea 
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Enter address'
          value={address}></textarea>
        <input 
            type='text' 
            name='email' 
            onChange={(e) => setEmail(e.target.value.toUpperCase())} 
            value={email}
            placeholder='Enter email'/>
        <input 
            type='text' 
            name='division' 
            onChange={(e) => setDivision(e.target.value.toUpperCase())} 
            value={division}
            placeholder='Enter division'/>
        <input 
            type='number' 
            name='startingBalance' 
            onChange={(e) => setStartingBalance(e.target.value.toUpperCase())} 
            value={startingBalance}
            placeholder='Enter starting balance'/>

        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
