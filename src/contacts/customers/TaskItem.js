import React from "react"
import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, name, code, creditLimit, address, email, division, startingBalance}) {

  return (
    <Modal modalLable='Customer Item' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{name}</h2>
        <p>{code}</p>
        <p>{creditLimit}</p>
        <p>{address}</p>
        <p>{email}</p>
        <p>{division}</p>
        <p>{startingBalance}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
