import React from "react";
import Modal from "./Modal"
import {useState, useEffect} from 'react'
import './editTask.css'
import { doc, updateDoc, collection, query, where, onSnapshot,writeBatch,getDocs } from "firebase/firestore";
import {db} from '../../../firebase'

const typeOptions = ['Income group','Expense group','Subgroup of'];
function EditTask({open, onClose, toEditName, toEditType,  toEditSubgroupof_name,toEditIsActive, id}) {

  const old_group_name = toEditName;
  const old_subgroupof_name = toEditSubgroupof_name;
  const [name, setName] = useState(toEditName)
  const [group_type, setType] = useState(toEditType)
  const [subgroupof_name, setSubgroupofname] = useState(toEditSubgroupof_name)
  const [tasks, setTasks] = useState([])
  const AddType = typeOptions.map(AddType => AddType)

  useEffect(() => {
    //    const taskColRef = query(collection(db, 'chartofaccounts') ,where("group","==",true),//orderBy('created', 'desc'))
    const taskColRef1 = collection(db, 'accountsgroup');
//    const taskColRef = query(taskColRef1, where("isgroup","==",true),where("supergroup","in",["Income Group","Expense Group"]),where("account_name","!=",account_name))
        onSnapshot(taskColRef1, (snapshot) => {
          setTasks(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      },[])
//,where("name","!=",{name})

  const handleNameChange = (e) => {
    let val = e.target.value
    setName(val)

  }
  const handleTypeChange = (e) => {
    
    setType(e.target.value)
    if(e.target.value === 'Subgroup of'){
      if(tasks.length == 1){
        tasks.map((task,index) => {
          setSubgroupof_name(task.data.name)
        })
      }
    } else {
      setSubgroupof_name('');
    }
  }

  const handleSubgroupofChange = (e) => {
    let val = e.target.value
    setSubgroupof_name(val);
    tasks.map((task,index) => {
      if(task.data.name === val){
      }
    })
  }

  const handleBatchUpdate = async (e) =>{
    e.preventDefault();
    const batch = writeBatch(db);


    const data = collection(db, 'accountsgroup');

    const querySnapshot = await getDocs(data);
alert(issubgroupofname+","+old_group_name)
    try{
    querySnapshot.forEach(doc => {
      if (doc.data().subgroupof_name === old_group_name) {
        batch.update(doc.ref, { subgroupof_name: toEditName });
      }
      if (doc.data().name === old_group_name) {
        batch.update(doc.ref, { name: toEditName });
      }
    });
  /*     
    let a=10;
    if(a<100){
      alert("id: "+id)
      return
    }
  
    batch.update(doc.ref,id,{
    account_name: account_name,
    supergroup: supergroup,
    account_type: account_type,
    isgroup: isgroup,
    issubgroupof: issubgroupof,
    issubgroupofname: issubgroupofname,
    
    });
    */
    batch.commit();
    onClose()
    }catch (err) {
      alert(err)
    }
    
  }

  /* function to update firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const taskDocRef = doc(db, 'accountsgroup', id)
    try{
      await updateDoc(taskDocRef, {
        name: name,
        group_type: group_type,
        subgroupof_name: subgroupof_name,
      })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }
  const handleUpdateAll = async (e) => {
    e.preventDefault()

     var taskDocRef = doc(db, 'accountsgroup', id)
    try{
      tasks.map((task)=>{
         await updateDoc(taskDocRef, {
          name: name,
          group_type: group_type,
          subgroupof_name: subgroupof_name,
        })
        if (task.data.subgroupof_name === old_group_name) {
          taskDocRef = doc(db, 'accountsgroup', task.data.id)
           updateDoc(taskDocRef, {
            subgroupof_name: toEditName
          })
        }
 
    })
      onClose()
    } catch (err) {
      alert(err)
    }
    
  }

  const updateAll = async (e) => {
    e.preventDefault();
    // Get a new write batch
    const batch = writeBatch(db);

    // Update the population of 'SF'
    const sfRef = doc(db, "accountsgroup",id);
    batch.update(sfRef, {
      name: name,
      group_type: group_type,
      subgroupof_name: subgroupof_name
    });
    tasks.map((task) =>{
      if(task.data.subgroupof_name === old_group_name){
        var sfRef2 = doc(db, "accountsgroup",task.id);
        batch.update(sfRef2, {
          subgroupof_name: toEditName
        });    
      }

    })
    // Commit the batch
    await batch.commit();
  }
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

  const handleUpdateInBulk = async (e) => {
    e.preventDefault();
    var mydate = new Date();  
    var datelongformat = mydate*1;  // outputs a long value
  //new Date(longFormat); gives correct date format, from long to string
    const batch = writeBatch(db);
 // Set the value of 'NYC'
const colRef = doc(db, "cities", makeid(20));
batch.set(colRef, {name: "Colifornia"});
const wdcRef = doc(db, "cities", makeid(20));
batch.set(wdcRef, {name: "Washington DC"});
const nbiRef = doc(db, "cities",makeid(20));
batch.set(nbiRef, {name: "Nairobi"});
    try{
    var nycRef = doc(db, "accountsgroup", id);
    batch.update(nycRef, {
      name: name,
      group_type: group_type,
      subgroupof_name: subgroupof_name,
      log: datelongformat
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


  return (
    <Modal modalLable='Edit Group' onClose={onClose} open={open}>
      <form onSubmit={handleUpdateInBulk} className='editTask'>
        <input type='text' name='name' onChange={(e) => setName(e.target.value)} value={name}/>
        <label for="group_type">Type:</label><br/>
        < select
      onChange={e => handleTypeChange(e)}
        className="browser-default custom-select" >
         {
        AddType.map((address, key) => {
        if(address === group_type){
         return (<option value={address} selected>{address}</option>)
        } else return(
          <option value={address}>{address}</option>
        )
         })}
       </select >

       {subgroupof_name ? <div>
        <label for="subgroupof">Subgroup:</label><br/>
        < select onChange={e => handleSubgroupofChange(e)}
        className="browser-default custom-select" >
         {
        tasks.map((address, key) => {
          if(address.data.name === subgroupof_name) { return(
            <option value={address.data.name} selected >{address.data.name}</option>);
            }else {return (
            <option value={address.data.name}>{address.data.name}</option> );
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
