import React from "react";
import Modal from "./Modal"
import './taskItem.css'

function TaskItem({onClose, open, name, group_type, subgroupof_name, isactive}) {

  return (
    <Modal modalLable='Account Group' onClose={onClose} open={open}>
      <div className='taskItem'>
        <h2>Name: {name}</h2>
        <p>Group Type: {group_type}</p>
        <p>Subgroupof name: {subgroupof_name}</p>
        <p>isactive: {isactive ? "True" : "false"}</p>
      </div>
    </Modal>
  )
}

export default TaskItem
