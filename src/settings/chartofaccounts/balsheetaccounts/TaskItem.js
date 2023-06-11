import React from "react";
import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, account_name,supergroup, account_type, isgroup,issubgroupof, issubgroupofname}) {

  return (
    <Modal modalLable='Account' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>Name: {account_name}</h2>
        <p>Main Group: {supergroup}</p>
        <p>Type: {account_type}</p>
        <p>is group: {isgroup}</p>
        <p>is subgroupof: {issubgroupof}</p>
        <p>subgroupof: {issubgroupofname}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
