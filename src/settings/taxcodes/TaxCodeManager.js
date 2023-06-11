import React,{useState,useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../../firebase'

const TaxCodeManager = () => {
  const [taxCodeName, setTaxCodeName] = useState([]);
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    //    const taskColRef = query(collection(db, 'chartofaccounts') ,where("group","==",true),//orderBy('created', 'desc'))
    const taskColRef1 = collection(db, 'taxcodes');
    const taskColRef = query(taskColRef1)
    //where("supergroup","==","Income Group"))
        onSnapshot(taskColRef, (snapshot) => {
          setTasks(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      },[])
  return(
    <div><h2>Tax Codes</h2>
      <ul>
       {tasks.map((task)=>
         <li>
            task.taxCodeName
         </li>  
       )
        }
      </ul>
    </div>
  );

}

export default TaxCodeManager;