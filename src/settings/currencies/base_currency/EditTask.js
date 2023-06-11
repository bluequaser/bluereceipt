import React from 'react';
import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from '../../../firebase'

function EditTask({open, onClose, toEditName, toEditCode, toEditSymbol,toEditDecimalPlaces,id}) {

  const [name, setName] = useState(toEditName)
  const [code, setCode] = useState(toEditCode)
  const [symbol, setSymbol] = useState(toEditSymbol)
  const [decimal_places, setDecimalPlaces] = useState(toEditDecimalPlaces)
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'currency_base', id)
    try{
      await updateDoc(taskDocRef, {
        name: name,
        code: code,
        symbol: symbol,
        decimal_places: decimal_places
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  return (
    <Modal modalLable='Edit Base Currency' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
        <input type='text' name='name' onChange={(e) => setName(e.target.value.toUpperCase())} value={name}/>
        <input type='text' name='code' onChange={(e) => setCode(e.target.value.toUpperCase())} value={code}/>
        <input type='text' name='symbol' onChange={(e) => setSymbol(e.target.value.toUpperCase())} value={symbol}/>
        <input type='number' name='decimal_places' onChange={(e) => setDecimalPlaces(e.target.value)} value={decimal_places}/>

        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
