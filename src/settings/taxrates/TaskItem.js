import React from 'react';
import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose,  title,name,rate,account_name, open}) {

  return (
    <Modal modalLable='Tax Code' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>Title: {title}</h2>
        <p>Name: {name}</p>
        <p>Rate: {rate}%</p>
        <p>Account: {account_name}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
