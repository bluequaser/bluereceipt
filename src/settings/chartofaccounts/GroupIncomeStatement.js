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

export default function GroupIncomeStatement() {
  let navigate = useNavigate();
  let mlocation = useLocation();
  let params = useParams();
  
  const[uniqueId,setUniqueId] = useState(params.groupincomeexpenseId);

  const [tasks, setTasks] = useState([])
  const [dbase, setDBase] = useState([])
  const [typeDefault, setInitialType] = useState('Income group')
  const [type, setType] = useState('') 
  const [typeArray, setTypeArray] = useState([{name: "Income group"},{name: "Expense group"}]) 
  const [name, setName] = useState('')
  const [category, setCategory] = useState("")
  const [isSubCategory, setIsSubCategory] = useState(false)
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
      const taskColRef = query(collection(db, 'groupsincomestatement'), orderBy('type','name'))
      onSnapshot(taskColRef, (snapshot) => {
        setDBase(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
    },[])

    const handleEdit = async () => {
      tasks.map((task) => {
        if(task.data.name.includes(":")){
          let lastIndex = task.data.name.lastIndexOf(":")
          let mcategory = task.data.name.slice(0,lastIndex);         
          let mname = task.data.name.slice(lastIndex + 1);
          setCategory(mcategory);
          setName(mname)
           if(isSubCategory === false)
            setIsSubCategory(true)
        } else {
          setName(task.data.name)
          setCategory("")
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
    

    let mname = name;
    if(mname == ""){
     alert("Please enter a name..");
      return
    }
    let mtype = type ? type : typeDefault;
     
    const batch = writeBatch(db);
    if(category)
    mname = category+":"+name

    if(uniqueId === 'Add New'){

      var categoriesRefDoc = Math.random().toString(36).slice(2);
      const categoriesRef = doc(db, 'groupsincomestatement', categoriesRefDoc);
      batch.set(categoriesRef, {
          type: mtype,
          name: mname,
          created: Timestamp.now(),
          uniqueId: nanoid()
      }); 

    }
    else{

      const categoryUpdateRef = doc(db, 'groupsincomestatement', id);
      batch.update(categoryUpdateRef, {
          type: mtype,
          name: mname,
          created: Timestamp.now()
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

const handleChange = () => { 
  setIsSubCategory(!isSubCategory);
  setCategory("");
} 

return (

    <main style={{ padding: "1rem" }}>
      { isEdit == false && uniqueId !== "Add New" ? 
      <div>
            <button onClick={handlePrint} >
                🖨️
              </button> <br/>
            <b>Type :</b> {tasks.map((task)=>(
              task.data.type
            ))} <br/> 
            <b>Name : </b> {tasks.map((task)=>(
              task.data.name.includes(":") ? task.data.name.slice(task.data.name.lastIndexOf(":") + 1) : task.data.name
            ))} <br/>                
            <b>Sub group :</b> {tasks.map((task)=>(
              task.data.name.includes(":") ? task.data.name.slice(0,task.data.name.lastIndexOf(":")) : null
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
          } <br/>
        <label for="type"> Type : <select 
        name='type' 
        onChange={(e) => setType(e.target.value)  } 
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
    </select></label>
           <br/>
           <input type="checkbox" onChange={handleChange} checked={isSubCategory}/> Sub group<br/>
        {isSubCategory ?
        <label for="category"> Sub group : <select 
        name='category' 
        onChange={(e) => setCategory(e.target.value)  } 
        value={category}>
        {
          dbase.map((cat, key) =>{
            if(category === cat.data.name.slice(0,cat.data.name.lastIndexOf(":")))
         return(
          <option key={key} value={category} selected >{category}</option>
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