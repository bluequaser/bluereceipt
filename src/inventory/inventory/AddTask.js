import React, {useEffect} from "react"
import Modal from "./Modal"
import {useState} from 'react'
import './addTask.css'
import {db} from '../../firebase'
import {collection, query, where,groupBy,orderBy, onSnapshot,addDoc, Timestamp} from 'firebase/firestore'
import { writeBatch, doc } from "firebase/firestore"; 
import {getProducts} from '../menuitems'

function AddTask({onClose, open}) {
  const [taskIncomeAccount, setTaskIncomeAccount] = useState([])
  const [taskExpenseAccount, setTaskExpenseAccount] = useState([])
  const [storeName, setStoreName] = useState('')
  const [store, setStore] = useState([])
  const [taxRates, setTaxRates] = useState([])
  const [unique, setUnique] = useState([])
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [unit, setUnit] = useState('')
  const [costPrice, setCostPrice] = useState(0)
  const [salePrice, setSalePrice] = useState(0)
  const [description, setDescription] = useState('')
  const [mclass, setMClass] = useState([])
  const [taxCode, setTaxCode] = useState('')
  const [taxExpenseCode, setTaxExpenseCode] = useState('')
  const [startingBalance, setStartingBalance] = useState(0)
  const [location, setLocation] = useState('')
  const [averageCost, setAverageCost] = useState(0)
  const [chartofAccounts, setChartofAccounts] = useState('')
  const [customIncomeAccount, setCustomIncomeAccount] = useState('')
  const [customExpenseAccount, setCustomExpenseAccount] = useState('')
  const [products, setProducts] = useState([])
  const [mainGroup, setMainGroup] = useState([]);
  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const taskColRef = query(collection(db, 'taxrates'), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setTaxRates(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[]);
  useEffect(() => {
    var munique = [...new Map(taxRates.map((m) => [m.data.title, m])).values()];
    setUnique(munique)
   });

   useEffect(() => {
    const taskColRef = query(collection(db, 'mclass'), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setMClass(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

  useEffect(() => {
    const taskColRef = query(collection(db, 'stores'), orderBy('name'))
    onSnapshot(taskColRef, (snapshot) => {
      setStore(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])
  
    useEffect(() => {
      const taskColRef = query(collection(db, 'chartofaccountspos'), orderBy('name'))
      onSnapshot(taskColRef, (snapshot) => {
        setChartofAccounts(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })  
  },[])

  useEffect(() => {
    const taskColRef1 = collection(db, 'chartofaccounts');
    const taskColRef = query(taskColRef1, where("isgroup","==",false), where("supergroup","in",["Income Group"]))
        onSnapshot(taskColRef, (snapshot) => {
          setTaskIncomeAccount(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
          })))
        })
      },[])
      useEffect(() => {
        const taskColRef1 = collection(db, 'chartofaccounts');
        const taskColRef = query(taskColRef1, where("isgroup","==",false), where("supergroup","in",["Expense Group"]))
            onSnapshot(taskColRef, (snapshot) => {
              setTaskExpenseAccount(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
              })))
            })
          },[])
  
  useEffect(() => {
    let items = getProducts();
    setProducts(items)
  });

  useEffect(() => {
    fetchMainGroup();
    
  },[]);

  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'inventory'), {
        name: name,
        code: code,
        unit: unit,
        costPrice: costPrice,
        salePrice: salePrice,
        description: description,
        division: division,
        taxCode: taxCode,
        startingBalance: startingBalance,
        store: storeName,
        averageCost: averageCost,
        customIncomeAccount: customIncomeAccount,
        customExpenseAccount: customExpenseAccount,
        completed: false,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }


  const fetchMainGroup = async() => {
  
    let m_products = getProducts();
 
    let m_maingroup = [...new Set(m_products.map(item => item.maingroup)) ]
     setMainGroup(m_maingroup);
 
    console.log(m_maingroup)
    
   }
 
  return (
    <Modal modalLable='Add Inventory Item' onClose={onClose} open={open} >
      <form onSubmit={handleSubmit} className='addTask' name='addTask' >
        <input 
          type='text' 
          name='name' 
          onChange={(e) => setName(e.target.value.toUpperCase())} 
          value={name}
          placeholder='Enter Item name'/>
        <input 
          type='text' 
          name='code' 
          onChange={(e) => setCode(e.target.value.toUpperCase())} 
          value={code}
          placeholder='Enter Item code'/>
        <input 
            type='text' 
            name='unit' 
            onChange={(e) => setUnit(e.target.value.toUpperCase())} 
            value={unit}
            placeholder='Enter unit name'/>
        <label>Cost Price:
        <input 
              type='number' 
              name='costPrice' 
              onChange={(e) => setCostPrice(e.target.value.toUpperCase())} 
              value={costPrice}
              placeholder='0.0'/>
        </label>
        <label>Sale Price:
        <input 
            type='number' 
            name='salePrice' 
            onChange={(e) => setSalePrice(e.target.value.toUpperCase())} 
            value={salePrice}
            placeholder='0.0'/>
         </label>
        <input
            type='text' 
            name='description'  
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter decription'
          value={description} />
       <label for="mclass">Class:</label>
        <select 
            name='mclass' 
            onChange={(e) => setMClass(e.target.value)} 
            value={mclass}>
            {
              mclass.map((task, key) => {
             return(
              <option value={task.data.name} selected >{task.data.name}</option>
               );        
             })
          }
        </select>


        <label for="title">Starting balance:</label>
        <input 
            type='number' 
            name='startingBalance' 
            onChange={(e) => setStartingBalance(e.target.value)} 
            value={startingBalance}
            placeholder='0.0'/>
       <label for="store">Choose Store:</label>
        <select 
            name='store' 
            onChange={(e) => setStoreName(e.target.value)}
            >
            {
              store.map((task_m, key) => {
             return(
              <option value={task_m.data.name} selected >{task_m.data.name}</option>
               );        
             })
            }
            </select>
            <label for="averageCost">Average Cost:</label>
        <input 
            type='number' 
            name='averageCost' 
            onChange={(e) => setAverageCost(e.target.value)} 
            value={averageCost}
            placeholder='0.0'/>
       <label for="customIncomeAccount">Custom Income Account</label>
        <select 
            name='customIncomeAccount' 
            onChange={(e) => setCustomIncomeAccount(e.target.value)} 
            value={customIncomeAccount}>
            {
              taskIncomeAccount.map((task, key) => {
             return(
              <option value={task.data.account_name} selected >{task.data.account_name}</option>
               );        
             })
          }
        </select>
        <label for="title">Sales Tax Rate:</label>
        <select 
            name='taxCode' 
            onChange={(e) => setTaxCode(e.target.value)} >
            {
              unique.map((task, key) => {
             return(
              <option value={task.data.title} selected >{task.data.title}</option>
               );        
             })
            }
            </select>
       <label for="customExpenseAccount">Custom Expense Account</label>
        <select 
            name='customExpenseAccount' 
            onChange={(e) => setCustomExpenseAccount(e.target.value)} 
            value={customExpenseAccount}>
            {
              taskExpenseAccount.map((task, key) => {
             return(
              <option value={task.data.account_name} selected >{task.data.account_name}</option>
               );        
             })
          }
        </select>
        <label for="title">Expense Tax Rate:</label>
        <select 
            name='taxExpenseCode' 
            onChange={(e) => setTaxExpenseCode(e.target.value)} >
            {
              unique.map((task, key) => {
             return(
              <option value={task.data.title} selected >{task.data.title}</option>
               );        
             })
            }
            </select>
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddTask
