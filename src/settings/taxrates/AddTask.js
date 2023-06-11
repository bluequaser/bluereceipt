import React from 'react';
import Modal from "./Modal"
import {useState, useEffect} from 'react'
import './addTask.css'
import {db} from '../../firebase'
import {collection, addDoc, Timestamp,  query, where, orderBy,onSnapshot} from 'firebase/firestore'

function AddTask({onClose, open}) {

  const [title, setTitle] = useState('')
  const [name, setName] = useState('')
  const [rate, setRate] = useState(0.0)
  const [account_name, setAccountName] = useState('Tax_Payable')
  const [tasks, setTasks] = useState([])

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    if(tasks.length ===  1 && account_name=='Tax_Payable')
    tasks.map((task) => setAccountName(task.data.account_name))
  }
  useEffect(() => {
    //    const taskColRef = query(collection(db, 'chartofaccounts') ,where("group","==",true),//orderBy('created', 'desc'))
    const taskColRef1 = collection(db, 'chartofaccounts');
    const taskColRef = query(taskColRef1, where("isgroup","==",false),where("supergroup","in",["Liabilities"]))
        onSnapshot(taskColRef, (snapshot) => {
          setTasks(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
   },[])
   const handleAccountNameChange = (e) => {
    setAccountName(e.target.value);
  }

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
/*
    var a=1;
    if(a<100){
      alert(account_name)
      return
    }
*/    
    if(tasks.length === 0){
      alert("Please select / add a Tax payable account in the liabilities!")
      return;
    }

    try {
      await addDoc(collection(db, 'taxrates'), {
        title: title,
        name: name,
        rate: rate,
        account_name: account_name,
        completed: false,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Add Tax Code' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='title' 
          onChange={(e) => handleTitleChange(e)} 
          value={title}
          placeholder='Enter title'/>
        <input 
          type='text' 
          name='name' 
          onChange={(e) => setName(e.target.value)} 
          value={name}
          placeholder='Enter name'/>
          Tax Rate:
          <input 
            type='number' 
            name='title' 
            onChange={(e) => setRate(Number(e.target.value))} 
            value={rate}
            placeholder='0.0'/>
        <div>
        <label for="account_name">Account Name:</label><br/>
        < select onChange={e => handleAccountNameChange(e)}
        className="browser-default custom-select" >
         {
        tasks.map((task, key) => {
       return(
        <option value={task.data.account_name} selected >{task.data.account_name}</option>);        
         })
         }
       </select > </div>
 
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
