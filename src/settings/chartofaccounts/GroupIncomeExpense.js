import React from "react";
import {useState, useRef, useEffect} from 'react'
import { useParams ,
  useNavigate,
  useLocation} from "react-router-dom";

import {collection, query, where,orderBy, onSnapshot, doc,deleteDoc, addDoc, updateDoc, Timestamp, writeBatch} from "firebase/firestore"
import {db} from '../../firebase'
import { ComponentToPrint } from './components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import MainLayout from '../layouts/MainLayout'
import { nanoid } from "nanoid";

export default function GroupIncomeExpense() {

  let navigate = useNavigate();
  let mlocation = useLocation();
  let params = useParams();
  
  const[uniqueId,setUniqueId] = useState(params.groupincomeexpenseId);

  const [tasks, setTasks] = useState([])
  const [dbase, setDBase] = useState([])
  const [type, setType] = useState('')
  const [typeArray, setTypeArray] = useState([{name: "Income group"},{name: "Expense group"},{name: "Sub group of"}])
  const [name, setName] = useState('')
  const [subGroup, setSubGroup] = useState("")
  const [toInitializeCategory, setInitialCategory] = useState(false)
  const [isSubGroup, setIsSubGroup] = useState(false)
  const [isEdit, setEdit] = useState(false)
  const [editLabel, setEditLabel] = useState('+Add New')
    /* function to get all tasks from firestore in realtime */ 
    useEffect(() => {
      const taskColRef1 = collection(db, 'groupsincomestatement');
      const taskColRef = query(taskColRef1, where("uniqueId","==",uniqueId))
//      const taskColRef = query(collection(db, 'books'), orderBy('created', 'desc'))
      onSnapshot(taskColRef, (snapshot) => {
        setTasks(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
 
    },[])
    
    useEffect(() => {
      const taskColRef = query(collection(db, 'groupsincomestatement'), orderBy('type','subgroup','name'))
      onSnapshot(taskColRef, (snapshot) => {
        setDBase(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
    },[])

    const handleEdit = async () => {
      tasks.map((task) => {
        if(task.data.name.subgroup){
          setSubGroup( task.data.subgroup);
          setName( task.data.name)
           if(isSubGroup === false)
            setIsSubGroup(true)
        } else {
          setName(task.data.name)
          setSubGroup("")
        } 
      })
      setEdit(true);
      setEditLabel("Edit")

    }
  /* function to update firestore */
  const handleUpdate = async () => {
    
    var id="";
    tasks.map((task) =>{
      
      if(task.data.uniqueId === uniqueId)
      id=task.id
      
    });
    
    if(name == ""){
     alert("Please enter a name..");
      return
    }
    if(type == ""){
      alert("Please enter a type..");
       return
     }
 
    const batch = writeBatch(db);

    if(uniqueId === 'Add New'){

      var groupsRefDoc = Math.random().toString(36).slice(2);
      const groupsRef = doc(db, 'groupsincomestatement', groupsRefDoc);
      batch.set(groupsRef, {
          type: type,
          name: name,
          subgroup: subGroup,
          created: Timestamp.now(),
          uniqueId: nanoid()
      }); 

    }
    else{

      const groupsUpdateRef = doc(db, 'groupsincomestatement', id);
      batch.update(groupsUpdateRef, {
        type: type,
        name: name,
        subgroup: subGroup,
        created: Timestamp.now(),
      }); 

    }
        // Commit the batch
        await batch.commit().then(() =>{
          if(uniqueId === 'Add New')
          console.log("Success.. adding")
          else 
          console.log("Success..updating ")
        });


  }
/* function to delete a document from firstore */ 
const handleDelete = async () => {
 
  var id="";
  tasks.map((task) =>{
    
    if(task.data.uniqueId === uniqueId)
    id=task.id
    
  });
 console.log("id=: "+id)
  let isExecuted = confirm("Are you sure you want to delete?");
  if(isExecuted == false)
    return
  const taskDocRef = doc(db, 'groupsincomestatement', id)
  try{
    await deleteDoc(taskDocRef)
  } catch (err) {
    alert(err)
  }
}


const componentRef = useRef();
    
const handleReactToPrint = useReactToPrint({
  content: () => componentRef.current,
});

const handlePrint = () => {
  handleReactToPrint();
}

const handleTypeChange = (mtype) => {
  if(mtype === 'Sub group of') {
    setIsSubGroup(true);
  }  else { 
    setIsSubGroup(false);
    setSubGroup("");
  }
  setType(mtype);
} 

return (

    <main style={{ padding: "1rem" }}>
      { isEdit == false && uniqueId !== "Add New" ? 
      <div>
            <button onClick={handlePrint} >
                🖨️
              </button> <br/>
              <b>Type:</b> {tasks.map((task)=>(
              task.data.type
            ))} <br/>                
            <b>Name:</b> {tasks.map((task)=>(
              task.data.name
            ))} <br/>                
            <b>Sub Group:</b> {tasks.map((task)=>(
              task.data.subgroup
            ))}   
      <p>

        <button
          onClick={() => {
            tasks.map((task)=>(
              task.data.uniqueId == uniqueId ? task.data.name : ""
             ))  
            handleEdit();
          }}
        >
          ✐
        </button> |{" "}        
        <button
          onClick={() => {
            navigate("/groupsincomeexpense" + mlocation.search);
          }}
        >
           Done
        </button>        
        <button
          onClick={() => {
            handleDelete();
            navigate("/groupsincomeexpense" + mlocation.search);
          }}
        >
          🗑️Del
        </button> |{" "}
      </p>
      </div> : 
            <div>

          <b>{editLabel}</b>
        <br/>
          {

              <input 
              onChange={(e) => setName(e.target.value)} 
              value={name}
              size = "10" 
              placeholder="name" />
          }
           <br/>
           <select 
        name='type' 
        onChange={(e) => handleTypeChange(e.target.value)  } 
        value={type}>
        {
          typeArray.map((cat, key) =>{
            if(type === cat.name)
         return(
          <option key={key} value={type} selected >{type}</option>
           );
           else
           return(
            <option  key={key} value={cat.name} >{cat.name}</option>
             );                       
         })
      }
    </select> <br/>
        {isSubGroup ? <label for="subgroup" > Sub Group
        <select 
        name='subgroup' 
        onChange={(e) => setSubGroup(e.target.value)  } 
        value={subGroup}>
        {
          dbase.map((cat, key) =>{
            if(subGroup === cat.data.subgroup && cat.data.subgroup)
         return(
          <option key={key} value={subGroup} selected >{subGroup}</option>
           );
           else
           return(
            <option  key={key} value={cat.data.name} >{cat.data.name}</option>
             );                       
         })
      }
    </select></label> : null } 
            <p>
              <button
           onClick={() => {
            handleUpdate();
           
            navigate("/groupsincomeexpense" + mlocation.search);
          }}
              >
                💾
                
              </button> |{" "}
              <button
                onClick={() => {
                  navigate("/groupsincomeexpense" + mlocation.search);
                }}
              >
                Done
              </button>  

            </p>

            </div>
      }

    </main>
  );
}