import React from 'react';
import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from '../../../firebase'

function EditTask({open, onClose, toEditName, toEditCode, toEditSymbol,toEditDecimalPlaces,toEditStartingExchangeRate, id}) {

  const [name, setName] = useState(toEditName)
  const [code, setCode] = useState(toEditCode)
  const [symbol, setSymbol] = useState(toEditSymbol)
  const [decimal_places, setDecimalPlaces] = useState(toEditDecimalPlaces)
  const [starting_exchange_rate, setStartingExchangeRate] = useState(toEditStartingExchangeRate)
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'currencies_foreign', id)
    try{
      await updateDoc(taskDocRef, {
        name: name,
        code: code,
        symbol: symbol,
        decimal_places: decimal_places,
        starting_exchange_rate: starting_exchange_rate
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  return (
    <Modal modalLable='Edit Foreign Currency' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
        <input type='text' name='name' onChange={(e) => setName(e.target.value.toUpperCase())} value={name}/>
        <input type='text' name='code' onChange={(e) => setCode(e.target.value.toUpperCase())} value={code}/>
        <input type='text' name='symbol' onChange={(e) => setSymbol(e.target.value.toUpperCase())} value={symbol}/>
        <label for="decimal_places">Decimal places</label>
        <input type='number' name='decimal_places' onChange={(e) => setDecimalPlaces(e.target.value)} value={decimal_places}/>
        <label for="starting_exchange_rate">Starting exchange rate</label>
        <input type='number' name='starting_exchange_rate' onChange={(e) => setStartingExchangeRate(e.target.value)} value={starting_exchange_rate}/>

        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
