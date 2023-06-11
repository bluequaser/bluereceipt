import React from "react"
import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, name, code, address}) {

  return (
    <Modal modalLable='Supplier' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{name}</h2>
        <p>{code}</p>
        <p>{address}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
