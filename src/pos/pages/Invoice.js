import React from "react";
import { useParams ,
  useNavigate,
  useLocation} from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot, where} from "firebase/firestore"
import {db} from '../../firebase'

export default function Invoice() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  const [invoices, setInvoices] = useState([])
  const [invoice, setInvoice] = useState([])
  const [completed, setCompleted] = useState(false)
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [check_number, setCheckNumber] = useState('')
  const [mydate, setMyDate] = useState('')
  const toComponentB=()=>{ 
    navigate('/componentB',{state:{id:1,name:'sabaoon'}
 // navigate('/componentB',{state:{id:1,name:'sabaoon'}
      });
    } 
   
  useEffect(() => {
//    const taskColRef = query(collection(db, 'sales_daybook'), where('invoice_ref','==',params.invoiceposId),orderBy('log', 'desc'))
    const taskColRef = collection(db, 'cart');
//    const taskColRef = query(taskColRef1, where('invoice_ref','==',params.invoiceposId),orderBy('log', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setInvoices(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
    console.log("ok here 1.."+invoices)
  },[])
  useEffect(() => {
    console.log("getting invoice "+params.invoiceposId);
    let invoice = getInvoice(params.invoiceposId);
    setInvoice(invoice)
    refreshInvoice2()
  },[])


  const getInvoice = async(number) => {
    return invoices.find(
      (invoice) => invoice.data.invoice_ref === number
    );
  }
  const refreshInvoice = async(number) => {
    /*
    let minvoice= invoices.find(
      (invoice) => invoice.data.invoice_ref === number
    );
    setInvoice(minvoice)
    */
    setCompleted(true)
    //console.log('refreshing..'+minvoice)
  }

  const refreshInvoice2 = async(number) => {
    console.log('hi+ ..'+number)
    invoices.map((inv, key) =>{
      if(inv.data.invoice_ref == number){
        setName(inv.data.name)
        setCheckNumber(inv.data.sku)
        setAmount(inv.data.amount)
        setMyDate(inv.data.mdate)
        setCompleted(true)
        console.log('refreshing..'+inv.data.store)
      }
    })

  }

  return (
    <main style={{ padding: "1rem" }}>

      {completed === true ?
        
      <div>
 
          <div>
      <h2>Total Due: {amount}</h2>
      <p>
        {name}: {check_number}
      </p>
      <p>Due Date: {mydate}</p>
      <button onClick={()=>{toComponentB()}}>Edit</button>
      <p>
      
        <button
          onClick={() => {
           // deleteInvoice(invoice.number);
            navigate("/invoicespos" + location.search);
          }} >
          Close
        </button>
      </p>
      </div>


      </div> : 
      <div>
        <button onClick={() => refreshInvoice2(params.invoiceposId) }>🔄</button>
        
      </div>
     }
     
    </main>
  );
}