import React from 'react';
import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, name, code, symbol, decimal_places, starting_exchange_rate}) {

  return (
    <Modal modalLable='Foreign Currency' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{name}</h2>
        <p>{code}</p>
        <p>{symbol}</p>
        <p>{decimal_places}</p>
        <p>{starting_exchange_rate}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
