import React from "react";
import Modal from "./Modal"
import {useState, useEffect} from 'react'
import './addTask.css'
import {db} from '../../../firebase'
import {collection, addDoc, Timestamp, query, where, orderBy, onSnapshot} from 'firebase/firestore'

const typeOptions = ["Assets","Liabilities","Equity","Subgroup of"];
function AddTask({onClose, open}) {

  const [account_name, setName] = useState('')
  const [supergroup, setSupergroup] = useState("Assets")
  const [account_type, setType] = useState("Assets")
  const [isgroup, setIsgroup] = useState(true)
  const [issubgroupof, setIssubgroupof] = useState(false)
  const [issubgroupofname, setIssubgroupofname] = useState(null)
  const [cashflowstatement, setCashflowstatement] = useState(null)
  const [tasks, setTasks] = useState([])
  
  const AddType = typeOptions.map(AddType => AddType)
  useEffect(() => {
    //    const taskColRef = query(collection(db, 'chartofaccounts') ,where("group","==",true),//orderBy('created', 'desc'))
    const taskColRef1 = collection(db, 'chartofaccounts');
    const taskColRef = query(taskColRef1, where("isgroup","==",true),where("supergroup","in",["Assets","Liabilities","Equity"]))
        onSnapshot(taskColRef, (snapshot) => {
          setTasks(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      },[])
      const AddSubgroupofOptions = tasks.map(AddSubgroupofOptions => AddSubgroupofOptions)
      const handleTypeChange = (e) => {
        var val=e.target.value
  /*
        let a=0;
        alert(val)
        if(a === 0){
          alert(val)
          return;
        }
  */      
        setType(val)
        if(e.target.value === 'Subgroup of'){
          setIssubgroupof(true);
          tasks.map((task,index) => {
          if(tasks.length > 0 && index == 0){
            setIssubgroupofname(task.data.account_name)
            setSupergroup(task.data.supergroup)
          }
          }) 
        } else {
          setIssubgroupof(false);
          setSupergroup(val)
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
    /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    let a = 1;
    /*
    if(a === 1){
      alert(name+","+type+","+isgroup+","+issubgroupof+","+issubgroupofname);
      return;
    }
    */
    if(account_name === ''){
      alert("Please enter a group name!")
      return
    }
    if(issubgroupof && issubgroupofname === null){
      if(tasks.length == 0)
      alert("You have no subgroups. Please add an Income or Expense group first!")
      else alert("Please select a subgroup!")
      return
    }
    //let m_issubgroupof = this.menu.value;
    
    try {
      await addDoc(collection(db, 'chartofaccounts'), {
        account_name: account_name,
        supergroup: supergroup,
        account_type: account_type,
        isgroup: isgroup,
        issubgroupof: issubgroupof,
        issubgroupofname: issubgroupofname,
        cashflowstatement: cashflowstatement,
        completed: false,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  

  return (
    <Modal modalLable='Add Group' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='account_name' 
          onChange={(e) => setName(e.target.value.toUpperCase())} 
          value={account_name}
          placeholder='Enter name'/>
        <label for="account_type">Type:</label><br/>
        < select
      onChange={e => handleTypeChange(e)}
        className="browser-default custom-select" >
         {
        AddType.map((address, key) => <option value={address}>{address}</option>)
         }
       </select >
         {issubgroupof ? <div>
        <label for="issubgroupof">Subgroup:</label><br/>
        < select onChange={e => handleIssubgroupofChange(e)}
        className="browser-default custom-select" >
         {
        tasks.map((address, key) => {
        if({key}===0) { return(
        <option value={address.data.account_name} selected >{address.data.account_name}</option>);
        }else {return (
        <option value={address.data.account_name}>{address.data.account_name}</option> );
        }
         })
         }
       </select > </div> : null 
         }
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
