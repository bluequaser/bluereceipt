import React from "react";
import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, account_type, account_name, subaccountof}) {

  return (
    <Modal modalLable='Account Group' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>Account: {account_name}</h2>
        <p>Account Tupe: {account_type}</p>
        <p>Sub Account Of: {subaccountof}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
