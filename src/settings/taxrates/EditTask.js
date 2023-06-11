import React from 'react';
import Modal from "./Modal"
import {useState,useEffect} from 'react'
import './editTask.css'
import {writeBatch, collection, doc, updateDoc, query, where, orderBy,onSnapshot } from "firebase/firestore";
import {db} from '../../firebase'

function EditTask({onClose, toEditTitle, toEditName, toEditRate, toEditAccountName, open,id}) {
  const [title, setTitle] = useState(toEditTitle)
  const [name, setName] = useState(toEditName)
  const [rate, setRate] = useState(toEditRate)
  const [account_name, setAccountName] = useState(toEditAccountName)
  const [tasks, setTasks] = useState([])

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

   const handleChange = (e) => {
     var val = e.target.value;
    if(e.target.name == 'title')
      setTitle(val)
    if(e.target.name == 'name')
      setName(val)
    if(e.target.name == 'rate')
      setRate(Number(val))
    if(tasks.length ===  1 )
    tasks.map((task) => setAccountName(task.data.account_name))
  }
  const handleAccountNameChange = (e) => {
    setAccountName(e.target.value);
  }
  /* function to update firestore */
  const handleUpdate2 = async (e) => {
    e.preventDefault()
    // Get a new write batch
const batch = writeBatch(db);

// Set the value of 'NYC'
const nycRef = doc(db, "taxrates", id);
try{
batch.update(nycRef, {
  title: title,
  name: name,
  rate: rate,
  account_name: account_name
    }
  );


// Commit the batch
await batch.commit();
  onClose()
  }
  catch (err) {
    alert(err)
  }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    // Get a new write batch
    const batch = writeBatch(db);
    const taskDocRef = doc(db, 'taxrates', id)
    try{
      await updateDoc(taskDocRef, {
        title: title,
        name: name,
        rate: rate,
        account_name: account_name
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }



  return (
    <Modal modalLable='Edit Class' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate2} className='editTask'>
        <input type='text' name='title' onChange={(e) => handleChange(e)} value={title}/>
        <input type='text' name='name' onChange={(e) => handleChange(e)} value={name}/>
        <input type='number' name='rate' onChange={(e) => handleChange(e)} value={rate}/>
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
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
