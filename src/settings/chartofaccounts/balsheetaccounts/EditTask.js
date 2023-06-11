import React from "react";
import Modal from "./Modal"
import {useState, useEffect} from 'react'
import './editTask.css'
import { doc, updateDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import {db} from '../../../firebase'


const cashflowOptions = ["Operating activities","Investing activities","Financing activities"];
function EditTask({open, onClose, toEditName, toEditSupergroup,toEditType, toEditIsgroup, 
  toEditIssubgroupof, toEditIssubgroupofname, toEditCashflowstatement,id}) {

  const [account_name, setName] = useState(toEditName)
  const [supergroup, setSupergroup] = useState(toEditSupergroup)
  const [account_type, setType] = useState(toEditType)
  const [isgroup, setIsgroup] = useState(false)
  const [issubgroupof, setIssubgroupof] = useState(toEditIssubgroupof)
  const [issubgroupofname, setIssubgroupofname] = useState(toEditIssubgroupofname)
  const [tasks, setTasks] = useState([])
  const [cashflowstatement, setCashflowstatement] = useState(toEditCashflowstatement)
  const AddCashflow = cashflowOptions.map(AddCashflow => AddCashflow)
  useEffect(() => {
    //    const taskColRef = query(collection(db, 'chartofaccounts') ,where("group","==",true),//orderBy('created', 'desc'))
    const taskColRef1 = collection(db, 'chartofaccounts');
    const taskColRef = query(taskColRef1, where("isgroup","==",true),where("supergroup","in",["Income Group","Expense Group"]))
        onSnapshot(taskColRef, (snapshot) => {
          setTasks(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      },[])
//,where("name","!=",{name})
  const handleCashflowChange = (e) => {
    setCashflowstatement(e.target.value);
  }


  const handleIssubgroupofChange = (e) => {
    let val = e.target.value
    setIssubgroupofname(val);
    tasks.map((task,index) => {
      if(task.data.account_name === val)
      setSupergroup(task.data.supergroup)
    })
  }
  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'chartofaccounts', id)
    try{
      await updateDoc(taskDocRef, {
        account_name: account_name,
        supergroup: supergroup,
        account_type: account_type,
        isgroup: isgroup,
        issubgroupof: issubgroupof,
        issubgroupofname: issubgroupofname,
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }


  return (
    <Modal modalLable='Edit Group' onClose={onClose} open={open}>
      <form onSubmit={handleUpdate} className='editTask'>
        <input type='text' name='account_name' onChange={(e) => setName(e.target.value.toUpperCase())} value={account_name}/>


       <div>
        <label for="issubgroupof">Subgroup:</label><br/>
        < select onChange={e => handleIssubgroupofChange(e)}
        className="browser-default custom-select" >
         {
        tasks.map((address, key) => {
          if(address.data.account_name === issubgroupofname) { return(
            <option value={address.data.account_name} selected >{address.data.account_name}</option>);
            }else {return (
            <option value={address.data.account_name}>{address.data.account_name}</option> );
            }
         
        
        })
        }
       </select > </div> 
       <label for="cashflowstatement">Cashflow Statement:</label>
       < select
      onChange={e => handleCashflowChange(e)}
        className="browser-default custom-select" >
         {
        AddCashflow.map((address, key) => <option value={address}>{address}</option>)
         }
       </select > 
        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
