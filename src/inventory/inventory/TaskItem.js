import React from "react"
import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, name, code, unit, costPrice, salePrice, description, division, taxCode, startingBalance, location, averageCost, customIncomeAccount, customExpenseAccount}) {

  return (
    <Modal modalLable='Task Item' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{name}</h2>
        <p>{code}</p> 
        <p>{unit}</p> 
        <p>{costPrice}</p> 
        <p>{salePrice}</p> 
        <p>{description}</p> 
        <p>{division}</p> 
        <p>{taxCode}</p> 
        <p>{startingBalance}</p> 
        <p>{location}</p> 
        <p>{averageCost}</p> 
        <p>{customIncomeAccount}</p> 
        <p>{customExpenseAccount}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
