import React from 'react';
import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, name}) {

  return (
    <Modal modalLable='Location' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>{name}</h2>
      </div>
    </Modal>
  )
}

export default TaskItem
