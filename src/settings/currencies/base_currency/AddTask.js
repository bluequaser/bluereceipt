import React from 'react';
import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import {db} from '../../../firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'

function AddTask({onClose, open}) {

  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [symbol, setSymbol] = useState('')
  const [decimal_places, setDecimalPlaces] = useState(2)
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'currency_base'), {
        name: name,
        code: code,
        symbol: symbol,
        decimal_places: decimal_places,
        completed: false,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Add Base Currency' onClose={onClose} open={open}>
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
          type='text' 
          name='symbol' 
          onChange={(e) => setSymbol(e.target.value.toUpperCase())} 
          value={symbol}
          placeholder='Enter symbol'/>
        <label for="decimal_places">Decimal places</label>
        <input 
          type='number' 
          name='decimal_places' 
          onChange={(e) => setDecimalPlaces(e.target.value)} 
          value={decimal_places}
          placeholder='2'/>
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
