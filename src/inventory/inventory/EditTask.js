import React from "react"
import Modal from "./Modal"
import {useState} from 'react'
import './editTask.css'
import { doc, updateDoc } from "firebase/firestore";
import {db} from '../../firebase'

function EditTask({open, onClose, toEditName, toEditCode, toEditUnit, toEditCostPrice, toEditSalePrice, toEditDescription, toEditDivision, toEditTaxCode, toEditStartingBalance, toEditLocation, toEditAverageCost, toEditCustomIncomeAccount, toEditCustomExpenseAccount, id}) {

  const [name, setName] = useState(toEditName)
  const [code, setCode] = useState(toEditCode)
  const [unit, setUnit] = useState(toEditUnit)
  const [costPrice, setCostPrice] = useState(toEditCostPrice)
  const [salePrice, setSalePrice] = useState(toEditSalePrice)
  const [description, setDescription] = useState(toEditDescription)
  const [division, setDivision] = useState(toEditDivision)
  const [taxCode, setTaxCode] = useState(toEditTaxCode)
  const [startingBalance, setStartingBalance] = useState(toEditStartingBalance)
  const [location, setLocation] = useState(toEditLocation)
  const [averageCost, setAverageCost] = useState(toEditAverageCost)
  const [customIncomeAccount, setCustomIncomeAccount] = useState(toEditCustomIncomeAccount)
  const [customExpenseAccount, setCustomExpenseAccount] = useState(toEditCustomExpenseAccount)
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'inventory', id)
    try{
      await updateDoc(taskDocRef, {
        name: name,
        cod: code,
        unit: unit,
        costPrice: costPrice,
        salePrice: salePrice,
        description: description,
        division: division,
        taxCode: taxCode,
        startingBalance: startingBalance,
        location: location,
        averageCost: averageCost,
        customIncomeAccount: customIncomeAccount,
        customExpenseAccount: customExpenseAccount
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  return (
    <Modal modalLable='Edit Inventory Item' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
      <input 
          type='text' 
          name='name' 
          onChange={(e) => setName(e.target.value.toUpperCase())} 
          value={name}
          placeholder='Enter Item name'/>
        <input 
          type='text' 
          name='code' 
          onChange={(e) => setCode(e.target.value.toUpperCase())} 
          value={code}
          placeholder='Enter Item code'/>
        <input 
            type='text' 
            name='unit' 
            onChange={(e) => setUnit(e.target.value.toUpperCase())} 
            value={unit}
            placeholder='Enter unit name'/>
        <input 
              type='number' 
              name='costPrice' 
              onChange={(e) => setCostPrice(e.target.value.toUpperCase())} 
              value={costPrice}
              placeholder='0.0'/>
        <input 
            type='number' 
            name='salePrice' 
            onChange={(e) => setSalePrice(e.target.value.toUpperCase())} 
            value={salePrice}
            placeholder='0.0'/>
        <textarea 
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter decription'
          value={description}></textarea>
        <input 
            type='text' 
            name='division' 
            onChange={(e) => setCode(e.target.value.toUpperCase())} 
            value={division}
            placeholder='Enter division'/>
        <input 
            type='text' 
            name='taxCode' 
            onChange={(e) => setTaxCode(e.target.value.toUpperCase())} 
            value={taxCode}
            placeholder='Enter Tax Code'/>
        <input 
            type='number' 
            name='startingBalance' 
            onChange={(e) => setStartingBalance(e.target.value.toUpperCase())} 
            value={startingBalance}
            placeholder='0.0'/>
        <input 
            type='text' 
            name='location' 
            onChange={(e) => setLocation(e.target.value.toUpperCase())} 
            value={location}
            placeholder='Enter location'/>
        <input 
            type='number' 
            name='averageCost' 
            onChange={(e) => setAverageCost(e.target.value.toUpperCase())} 
            value={averageCost}
            placeholder='0.0'/>
        <input 
            type='text' 
            name='customIncomeAccount' 
            onChange={(e) => setCustomIncomeAccount(e.target.value.toUpperCase())} 
            value={customIncomeAccount}
            placeholder='Enter custom income account'/>
        <input 
            type='text' 
            name='customExpenseAccount' 
            onChange={(e) => setCustomExpenseAccount(e.target.value.toUpperCase())} 
            value={customExpenseAccount}
            placeholder='Enter custom expense account'/>
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
