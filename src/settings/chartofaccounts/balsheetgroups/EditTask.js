import React from "react";
import Modal from "./Modal"
import {useState, useEffect} from 'react'
import './editTask.css'
import { doc, updateDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import {db} from '../../../firebase'

const typeOptions = ['Assets','Liabilities','Equity','Subgroup of'];
function EditTask({open, onClose, toEditName, toEditSupergroup,toEditType, toEditIsgroup, 
  toEditIssubgroupof, toEditIssubgroupofname, id}) {

  const [account_name, setName] = useState(toEditName)
  const [supergroup, setSupergroup] = useState(toEditSupergroup)
  const [account_type, setType] = useState(toEditType)
  const [isgroup, setIsgroup] = useState(true)
  const [issubgroupof, setIssubgroupof] = useState(toEditIssubgroupof)
  const [issubgroupofname, setIssubgroupofname] = useState(toEditIssubgroupofname)
  const [tasks, setTasks] = useState([])
  const AddType = typeOptions.map(AddType => AddType)

  useEffect(() => {
    //    const taskColRef = query(collection(db, 'chartofaccounts') ,where("group","==",true),//orderBy('created', 'desc'))
    const taskColRef1 = collection(db, 'chartofaccounts');
    const taskColRef = query(taskColRef1, where("isgroup","==",true),where("supergroup","in",["Assets","Liabilities","Equity"]),where("account_name","!=",account_name))
        onSnapshot(taskColRef, (snapshot) => {
          setTasks(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      },[])
//,where("name","!=",{name})
  const handleTypeChange = (e) => {
    
    setType(e.target.value)
    if(e.target.value === 'Subgroup of'){
      setIssubgroupof(true);
      if(tasks.length == 1){
        tasks.map((task,index) => {
          setIssubgroupofname(task.data.account_name)
          setSupergroup(task.data.supergroup)
        })
      }
    } else {
      setSupergroup(e.target.value)
      setIssubgroupof(false);
      setIssubgroupofname(null);
    }
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
        <label for="account_type">Type:</label><br/>
        < select
      onChange={e => handleTypeChange(e)}
        className="browser-default custom-select" >
         {
        AddType.map((address, key) => {
        if(address === account_type){
         return (<option value={address} selected>{address}</option>)
        } else return(
          <option value={address}>{address}</option>
        )
         })}
       </select >

       {issubgroupof ? <div>
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
       </select > </div> : null 
         }

        <button type='submit'>Edit</button>
      </form> 
    </Modal>
  )
}

export default EditTask
