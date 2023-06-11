import React from 'react';
import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, name, code, symbol, decimal_places}) {

  return (
    <Modal modalLable='Base Currency' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{name}</h2>
        <p>{code}</p>
        <p>{symbol}</p>
        <p>{decimal_places}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
