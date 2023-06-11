import React from "react";
import Modal from "./Modal"
import {useState, useEffect} from 'react'
import './addTask.css'
import {db} from '../../../firebase'
import {collection, addDoc, Timestamp, query, where, orderBy, onSnapshot} from 'firebase/firestore'

const typeOptions = ["Assets","Liabilities","Equity"];
const cashflowOptions = ["Operating activities","Investing activities","Financing activities"];
function AddTask({onClose, open}) {

  const [account_name, setName] = useState('')
  const [supergroup, setSupergroup] = useState("Assets")
  const [account_type, setType] = useState("Assets")
  const [isgroup, setIsgroup] = useState(false)
  const [issubgroupof, setIssubgroupof] = useState(true)
  const [issubgroupofname, setIssubgroupofname] = useState(null)
  const [cashflowstatement, setCashflowstatement] = useState("Operating activities")
  const [tasks, setTasks] = useState([])
  const [groupsArray, setGroupsArray] = useState(typeOptions)
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
        
      let arr = groupsArray;
      if(tasks.length === 1)
        tasks.map((group,index) => {
          setIssubgroupofname(group.data.account_name)
        })
        setGroupsArray([...groupsArray,...arr])
      
      },[])
      const AddSubgroupofOptions = tasks.map(AddSubgroupofOptions => AddSubgroupofOptions)
      const AddCashflow = cashflowOptions.map(AddCashflow => AddCashflow)

      const handleCashflowChange = (e) => {
        setCashflowstatement(e.target.value);
      }

    const handleIssubgroupofChange = (e) => {
      let val = e.target.value
      setIssubgroupofname(val);
      tasks.map((task,index) => {
        if(task.data.account_name === val){
        setSupergroup(task.data.supergroup)
        setType(task.data.account_type);
        }
      })
    }
    /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    let a = 1;
  
    if(account_name === ''){
      alert("Please enter an account name!")
      return
    }
    if(issubgroupof && issubgroupofname === null){
      //let val = this.menu.value;
      if(tasks.length == 0)
      alert("You have no subgroups. Please add a group first!")
      else{
        tasks.map((group) => setIssubgroupofname(group.data.account_name)
        )
        alert("Please select a subgroup! "+issubgroupofname)
      }
      return
 
    }
    /*
    if(a==1){
      alert("A/c Name: "+account_name+"\nSuper Group: "+supergroup+"\nAccount type: "+account_type+"\nsiSubgroupof name: "+issubgroupofname+"\nCash Flow Statement: "+cashflowstatement);
      return;
    }
    */
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
    <Modal modalLable='Add Account' onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className='addTask' name='addTask'>
        <input 
          type='text' 
          name='account_name' 
          onChange={(e) => setName(e.target.value.toUpperCase())} 
          value={account_name}
          placeholder='Enter name'/>

        <div>
        <label for="issubgroupof">Subgroup:</label><br/>
        < select onChange={e => handleIssubgroupofChange(e)}
        className="browser-default custom-select" >
         {
        tasks.map((address, key) => {
        if(key===0) { return(
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
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
