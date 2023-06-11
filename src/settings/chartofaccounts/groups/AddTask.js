import React from "react";
import Modal from "./Modal"
import {useState, useEffect} from 'react'
import './addTask.css'
import {db} from '../../../firebase'
import {writeBatch,collection, addDoc, Timestamp, query, where, orderBy, onSnapshot} from 'firebase/firestore'

const typeOptions = ["Income group","Expense group","Subgroup of"];
function AddTask({onClose, open}) {

  const [name, setName] = useState('')
  const [supergroup, setSupergroup] = useState("Income group")
  const [group_type, setType] = useState("Income group")
  const [subgroupof_name, setSubgroupof_name] = useState('')
  const [incomeStatementGroups, setIncomeStatementGroups] = useState('')
  const [tasks, setTasks] = useState([])
  const AddType = typeOptions.map(AddType => AddType)
  useEffect(() => {
    //    const taskColRef = query(collection(db, 'chartofaccounts') ,where("group","==",true),//orderBy('created', 'desc'))
    const taskColRef1 = collection(db, 'accountsgroup');
//    const taskColRef = query(taskColRef1, where("group_type","in",["Income group","Expense group","Subgroupof"]))
        onSnapshot(taskColRef1, (snapshot) => {
          setTasks(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      },[])

      useEffect(() => {
        const taskColRef = query(collection(db, 'incomestatementgroups'), orderBy('name'))
        onSnapshot(taskColRef, (snapshot) => {
          setIncomeStatementGroups(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      },[])
  
      const AddSubgroupofOptions = tasks.map(AddSubgroupofOptions => AddSubgroupofOptions)
      const handleNameChange = (e) => {
        let val = e.target.value
        setName(val)

      }

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
          tasks.map((task,index) => {
          if(tasks.length > 0 && index == 0){
            setSubgroupof_name(task.data.name)
            setSupergroup(task.data.supergroup)

          } else {

          }
         })
       } else {
          setSupergroup(val)
          setSubgroupof_name('');
        }
      }

    const handleIssubgroupofChange = (e) => {
      let val = e.target.value
      setSubgroupof_name(val);
      tasks.map((task,index) => {
        if(task.data.name === val){
          setSupergroup(task.data.supergroup)
        }
      })
    }

    /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    var mydate = new Date();  
    var datelongformat = mydate*1;  // outputs a long value
  //new Date(longFormat); gives correct date format, from long to string
  var uid = Math.random().toString(36).slice(2);
    let a = 1;
    /*
    if(a === 1){
      alert(name+","+type+","+isgroup+","+issubgroupof+","+issubgroupofname);
      return;
    }
    */
    if(name === ''){
      alert("Please enter a group name!")
      return
    }
    if(group_type ==='Subgroup of' && subgroupof_name === ''){
      if(tasks.length == 0)
      alert("You have no subgroups. Please add an Income or Expense group first!")
      else alert("Please select a subgroup!")
      return
    }
    //let m_issubgroupof = this.menu.value;
    
    try {
      await addDoc(collection(db, 'accountsgroup'), {
        name: name,
        supergroup: supergroup,
        group_type: group_type,
        subgroupof_name: subgroupof_name,
        isactive: true,
        created: Timestamp.now(),
        log: datelongformat,
        uid: uid
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
          name='name' 
          onChange={ e => handleNameChange(e)} 
          value={name}
          placeholder='Enter name'/>
        <label for="group_type">Type:</label><br/>
        < select
      onChange={e => handleTypeChange(e)}
        className="browser-default custom-select" >
         {
        AddType.map((address, key) => <option value={address}>{address}</option>)
         }
       </select >
         {group_type === 'Subgroup of' ? <div>
        <label for="issubgroupof">Subgroup:</label><br/>
        < select onChange={e => handleIssubgroupofChange(e)}
        className="browser-default custom-select" >
         {
        tasks.map((address, key) => {
        if({key}===0) { return(
        <option value={address.data.name} selected >{address.data.name}</option>);
        }else {return (
        <option value={address.data.name}>{address.data.name}</option> );
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
