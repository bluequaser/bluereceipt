import React from "react";
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from '../../firebase'
import {Link} from "react-router-dom"
import {
  useLocation,
  NavLink,
  Outlet,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
//import { getInvoices } from '../data';

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Invoices() {
//  let invoices = getInvoices();
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams({ replace: true });
  const [invoices, setInvoices] = useState([])
  const [uniqueInvoices,setUniqueInvoices] = useState([])
  /* function to get all tasks from firestore in realtime */ 

  useEffect(() => {
    const taskColRef = query(collection(db, 'cart_uid'), orderBy('log', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setUniqueInvoices(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])
  useEffect(() => {
    fetchUniqueInvoices();
  },[]);

  const fetchUniqueInvoices = async() => {
    let array = invoices;

  const key = 'invoice_ref'; 
  const arrayUniqueByKey = [...new Map(array.map(item => [item[key], item])).values()]; 
  console.log("arraybykey=:  "+arrayUniqueByKey); 
  setUniqueInvoices(arrayUniqueByKey)
}

const addNew = () => {
  //let location = useLocation();
  navigate('/pos',{state:{id:1,name:'new'}
       });
}
  return (
    <div style={{ display: 'flex' }}>

      <nav style={{ borderRight: 'solid 1px', padding: '1rem' }}>
      <button><Link  to="/poshome">Add new+</Link></button> | {" "}
      <button onClick={()=>{addNew()}} >+</button> {" "}
      <Link  to="/"><b>Done</b></Link>{" "} 
      <button onClick={()=> fetchUniqueInvoices()} >::Refresh</button>
        <input
          value={searchParams.get('filter') || ''}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter }, { replace: true });
            } else {
              setSearchParams({}, { replace: true });
            }
          }}
        />
        {uniqueInvoices
          .filter((invoice) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = invoice.data.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryNavLink
              key={invoice.data.invoice_ref}
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : '',
                };
              }}
              to={`/invoicespos/${invoice.data.invoice_ref}`}
            >
              {invoice.data.store+": "+invoice.data.check_number+" "+invoice.data.invoice_ref}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}

