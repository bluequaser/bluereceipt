import React, {useEffect, useRef, useState} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from "axios"
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import { getProducts } from '../menuitems';
import {db} from '../../firebase'
import { writeBatch, doc, addDoc, collection, Timestamp } from "firebase/firestore"; 
function POSPage() {
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [mainGroup, setMainGroup] = useState([]);
  const [mainGroupVal, setMainGroupVal] = useState("");
  const [familyGroup, setFamilyGroup] = useState([]);
  const [familyGroupVal, setFamilyGroupVal] = useState("");
  const [displayProducts, setDisplayProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [qtyManual, setQtyManual] = useState(false);
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    //console.log(e.target.value)
    
  };
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
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

  const saveRecord =  async() => {
    console.log("saving record..")
    var invoiceRef = Math.random().toString(36).slice(2);
    var today = null;
    if(date)
      today = new Date(date)
    else
    today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var dayInt = today.getDay();
var mdate = mm + '/' + dd + '/' + yyyy;    


    var a = 10;
    if(a < 100){
      alert(" => "+yyyy+"-"+mm+"-"+dd+"-"+dayInt)

      return;
    }
    // Get a new write batch
    const batch = writeBatch(db);
    // Set the value of 'NYC'
      const nycRef = doc(db, "cities", mydoc);
      batch.set(nycRef, {name: "Nairobi"});

    cart.map((mcart,key) =>{
      // set value for inventory_stocks  
      var timestamp  =  Timestamp.now(); 
      var mydoc = Math.random().toString(36).slice(2);
      var lineRef = Math.random().toString(36).slice(2);
    const inventoryRef = doc(db, "inventory_stocks", mydoc);
    const purchasesdaybookRef = doc(db, "purchases_daybook", mydoc);
    batch.set(inventoryRef, {
      batchref: invoiceRef,
      lineref: lineRef,
      sku: mcart.sku,
      name: mcart.name,
      description: mcart.description,
      maingroup: mcart.maingroup,
      familygroup: mcart.familygroup,
      itemgroup: mcart.itemgroup,
      type: mcart.type,
      trackinventory: mcart.trackinventory,
      price: mcart.price,
      costprice: mcart.costprice,
      unit: mcart.unit,
      image: mcart.image,
      quantity: mcart.quantity,
      currency: mcart.currency,
      amount: mcart.totalAmount,
      reorderlevel: mcart.reorderlevel,
      reorderqty: reorderqty,
      leadtimedays: mcart.leadtimedays,
      date: dateString,
      datetime: datetime,
      created: timestamp
    });
    batch.set(purchasesdaybookRef, {
      batchref: invoiceRef,
      lineref: lineRef,
      sku: mcart.sku,
      name: mcart.name,
      description: mcart.description,
      maingroup: mcart.maingroup,
      familygroup: mcart.familygroup,
      itemgroup: mcart.itemgroup,
      type: mcart.type,
      trackinventory: mcart.trackinventory,
      price: mcart.price,
      costprice: mcart.costprice,
      unit: mcart.unit,
      image: mcart.image,
      quantity: mcart.quantity,
      currency: mcart.currency,
      amount: mcart.totalAmount,
      date: dateString,
      datetime: datetime,
      created: timestamp
    });

    });
    var pldocRef = Math.random().toString(36).slice(2);
    const purchasesLedgerRef = doc(db, "purchases_ledger", pldocRef);
    var cldocRef = Math.random().toString(36).slice(2);
    const creditorsLedgerRef = doc(db, "creditors_ledger", cldocRef);
    batch.set(pldocRef, {
      batchref: invoiceRef,
      account_name: mcart.sku,
      account_type: mcart.name,
      name: mcart.description,
      tr_date: mcart.maingroup,
      tr_date_long: mcart.maingroup,
      tr_no: mcart.familygroup,
      tax_transanction: true,
      memo: mcart.itemgroup,
      ref: mcart.type,
      reference: mcart.trackinventory,
      amount: mcart.price,
      double_entry_type: mcart.costprice,
      credit_or_debit: mcart.unit,
      double_entry_account_name: mcart.image,
      double_entry_account_type: mcart.quantity,
      currency: mcart.currency,
      user_name: mcart.currency,
      created: timestamp
    });

    batch.set(cldocRef, {
      batchref: invoiceRef,
      account_name: mcart.sku,
      account_type: mcart.name,
      name: mcart.description,
      tr_date: mcart.maingroup,
      tr_date_long: mcart.maingroup,
      tr_no: mcart.familygroup,
      memo: mcart.itemgroup,
      ref: mcart.type,
      reference: mcart.trackinventory,
      amount: mcart.price,
      double_entry_type: mcart.costprice,
      credit_or_debit: mcart.unit,
      double_entry_account_name: mcart.image,
      double_entry_account_type: mcart.quantity,
      currency: mcart.currency,
      has_tax: mcart.hastax,
      user_name: mcart.currency,
      created: timestamp
    });
    // Commit the batch
      await batch.commit();
  }
const saveRecord2 =  async (product) =>{
  
  try {
    await addDoc(collection(db, 'inventory_stocks'), {
      sku: product.sku,
      name: product.name,
      description: product.description,
      maingroup: product.maingroup,
      familygroup: product.familygroup,
      itemgroup: product.itemgroup,
      type: product.type,
      trackinventory: product.trackinventory,
      price: product.price,
      costprice: product.costprice,
      unit: product.unit,
      image: product.image,
      quantity: product.quantity,
      currency: product.currency,
      amount: product.totalAmount,
      reorderlevel: product.reorderlevel,
      reorderqty: product.reorderqty,
      leadtimedays: product.leadtimedays,
      timestamp: Timestamp.now()
    })
    
  } catch (err) {
    alert(err)
  }
}
 /* function to add new task to firestore */
 const handleSave = async () => {
  console.log("Saved successfully..")
  console.log(cart)
 // e.preventDefault()
  // Get a new write batch

const mdate = Timestamp.now();
console.log(mdate)
// Set the value of 'NYC'
// Create a ref with auto-generated ID

//const inventoryRef = doc(db, "inventory_stocks","NYC");
cart.map((mcart,key) =>{
//  var newInventoryRef = db.collection('inventory_stocks').doc();
const batch = writeBatch(db);
  var newInventoryRef = collection(db, "inventory_stocks");
batch.set(newInventoryRef, {
  sku: mcart.sku,
  name: mcart.name,
  description: mcart.description,
  maingroup: mcart.maingroup,
  familygroup: mcart.familygroup,
  itemgroup: mcart.itemgroup,
  type: mcart.type,
  trackinventory: mcart.trackinventory,
  price: mcart.price,
  costprice: mcart.costprice,
  unit: mcart.unit,
  image: mcart.image,
  quantity: mcart.quantity,
  currency: mcart.currency,
  amount: mcart.totalAmount,
  reorderlevel: mcart.reorderlevel,
  reorderqty: reorderqty,
  leadtimedays: mcart.leadtimedays,
  timestamp: mdate,
  date: date
});
console.log("key: "+key)
});
//console.log(batch)
/*
// Update the population of 'SF'
const sfRef = doc(db, "cities", "SF");
batch.update(sfRef, {"population": 1000000});

// Delete the city 'LA'
const laRef = doc(db, "cities", "LA");
batch.delete(laRef);
*/

  try {
    // Commit the batch
    await batch.commit();
    console.log("Saved successfully.."+mdate)
    /*
    await addDoc(collection(db, 'inventory'), {
      title: title,
      description: description,
      completed: false,
      created: Timestamp.now()
    })
   */
  } catch (err) {
    alert(err)
  }
}



  const fetchProducts = async() => {
    setIsLoading(true);
   // const result = await axios.get('products');
   let m_products = getProducts();
   // setProducts(await result.data);
    setProducts(m_products);
    setIsLoading(false);
  }

  const fetchMainGroup = async() => {
  
   let m_products = getProducts();

   let m_maingroup = [...new Set(m_products.map(item => item.maingroup)) ]
    setMainGroup(m_maingroup);

   console.log(m_maingroup)
   
  }

  const fetchFamilyGroup = async() => {
  
    let m_products = getProducts();
    let m_familygroup = [...new Set(m_products.map(item => item.familygroup)) ]
 
     setFamilyGroup(m_familygroup);
     console.log(m_familygroup)
   }

  const addProductToCart = async(product) =>{
 
    // check if the adding product exist
    let findProductInCart = await cart.find(i=>{
      return i.sku === product.sku
    });

    if(findProductInCart){
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if(cartItem.sku === product.sku){
          {qtyManual ? 
            newItem = {
              ...cartItem,
              quantity: qty,
              totalAmount: cartItem.price * (qty)
            }
          :
            newItem = {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalAmount: cartItem.price * (cartItem.quantity + 1)
           }
         }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to cart`,toastOptions)

    }else{
       let addingProduct;
       { qtyManual ?  
          addingProduct = {
            ...product,
            'quantity': qty,
            'totalAmount': product.price * qty,
          } :
        
         addingProduct = {
          ...product,
          'quantity': 1,
          'totalAmount': product.price,
        }
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions)
    }
    setQty(1)
    setQtyManual(false)
    //console.log(Math.random().toString(36).slice(2));
    var today = null;
    if(date)
      today = new Date(date)
    else
    today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var mdate = mm + '/' + dd + '/' + yyyy;

console.log("1: "+mdate);
console.log("2: "+mdate.subst(0,4));
  }

  const removeProduct = async(product) =>{
    const newCart =cart.filter(cartItem => cartItem.sku !== product.sku);
    setCart(newCart);
  }

  const componentRef = useRef();

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  }

  const setMainGroupChanged = (val) => {
    setMainGroupVal(val);
    console.log(val)
    const familyItems =products.filter(item => item.maingroup === val);
    let m_familygroup = [...new Set(familyItems.map(item => item.familygroup)) ]
    setFamilyGroup(m_familygroup)
    console.log(familyItems.length)
    console.log(m_familygroup)
    setDisplayProducts(familyItems)
  }
  const setFamilyGroupChanged = (val) => {
    setFamilyGroupVal(val);
    const familyItems =products.filter(item => item.maingroup === mainGroupVal && item.familygroup === val);
    setDisplayProducts(familyItems)
  }
  useEffect(() => {
    fetchProducts();
  },[]);

  useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach(icart => {
      newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    })
    setTotalAmount(newTotalAmount);
  },[cart])

  useEffect(() => {
    fetchMainGroup();
  },[]);

  const handleQty = (e) => {
    setQty(e);
    setQtyManual = true;
  }
 
  

  return (
    <MainLayout>
      <div className='row'>
         <div>
      <input
        type="date"
        onChange={handleDateChange}
        ref={dateInputRef}
      />
      <p>Selected Date: {date}</p>
    </div>
        <div>      
          <label for="maingroup">Category</label>
        <select 
            name='mainGroup' 
            onChange={(e) => setMainGroupChanged(e.target.value)  } 
            value={mainGroupVal}>
            {
              mainGroup.map((task) => {
                if(task === mainGroupVal)
             return(
              <option value={task} selected >{task}</option>
               );
               else
               return(
                <option value={task} >{task}</option>
                 );                       
             })
          }
        </select>

        </div>
        <div>      
          <label for="familygroup">Sub Category</label>
        <select 
            name='familyGroup' 
            onChange={(e) => setFamilyGroupChanged(e.target.value)  } 
            value={familyGroupVal}>
            {
   
              familyGroup.map((task) => {
                if(task === familyGroupVal)
             return(
              <option value={task} selected >{task}</option>
               );
               else
               return(
                <option value={task} >{task}</option>
                 );                       
             })
          }
        </select>

        </div>
        <div>
          Quantity: <input 
          type='number' 
          name='qty' 
          onChange={(e) => 
            {setQty(Number(e.target.value)) ,setQtyManual(true)} } 
          value={qty}
          placeholder='1.0'/>
          </div>
        <div className='col-lg-8'>
          {isLoading ? 'Loading' : <div className='row'>
              {displayProducts.map((product, key) =>
                <div key={key} className='col-lg-4 mb-4'>
                  <div className='pos-item px-3 text-center border' onClick={() => addProductToCart(product)}>
                      <p>{product.name}</p>
                      <img src={product.image} className="img-fluid" alt={product.name} />
                      <p>{product.currency} {product.price}</p>
                  </div>

                </div>
              )}
            </div>}
       
        </div>
        <div className='col-lg-4'>
              <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
              </div>
              <div className='table-responsive bg-dark'>
                <table className='table table-responsive table-dark table-hover'>
                  <thead>
                    <tr>
                      <td>#</td>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                      <td>{cartProduct.sku}</td>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.totalAmount}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>Remove</button>
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                  </tbody>
                </table>
                <h2 className='px-2 text-white'>Total Amount: ${totalAmount}</h2>
              </div>

              <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  <button className='btn btn-primary' onClick={handlePrint}>
                    Print
                  </button> |{" "}
                  <button className='btn btn-primary' onClick={() => saveRecord()}>
                    Check Out
                  </button>
                </div> : 'Please add a product to the cart'

                }
              </div>


        </div>
      </div>
    </MainLayout>
  )
}

export default POSPage