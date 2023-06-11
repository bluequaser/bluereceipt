import React, {useEffect, useRef, useState} from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from "axios"
import { toast } from 'react-toastify';
import { ComponentToPrint } from '../components/ComponentToPrint';
import { useReactToPrint } from 'react-to-print';
import { getProducts } from '../menuitems_complete';
import {db} from '../../firebase'
import { writeBatch, doc, addDoc, collection, Timestamp, query, orderBy, onSnapshot } from "firebase/firestore"; 
import {useLocation} from 'react-router-dom';

function POSPage() {
  const location = useLocation(); 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [mainGroup, setMainGroup] = useState([]);
  const [mainGroupVal, setMainGroupVal] = useState("");
  const [familyGroup, setFamilyGroup] = useState([]);
  const [familyGroupVal, setFamilyGroupVal] = useState("");
  const [displayProducts, setDisplayProducts] = useState([]);
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);
 const [store, setStores] = useState([]);
 const [taxcode, setTaxCodes] = useState([]);
 const [storeSelected, setStoreSelected] = useState("");
 const [baseCurrency, setBaseCurrency] = useState([]);
 const [currency, setCurrency] = useState("");
 const [checkNumber, setCheckNumber] = useState(0)
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  
  useEffect(() => {
   
    const dataRef = db
      .collection("cart")
      .where("invoice_ref", "==", location.state.name);

    dataRef.get().then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCart(data);
    });
  }, []);

  const handleDateChange = (e) => {
        setDate(e.target.value);
        //console.log(e.target.value)
        
  };

  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
     console.log("Testing familyGroup.."+m_familygroup)
   }
   const updateProductToCart = async(product) =>{
    // check if the adding product exist
    if(!currency)
     baseCurrency.map((task) =>{
      setCurrency(task.data.symbol);
    })
    let producttaxcode = 0;
    let taxrate = 0;
    let mtax = 0;
    let tax = 0;
    let amount = 0;
    let totalamount = 0;

    let findProductInCart = await cart.find(i=>{
      return i.sku === product.sku
    });
    
   }
  const addProductToCart = async(product) =>{
    // check if the adding product exist
    if(!currency)
     baseCurrency.map((task) =>{
      setCurrency(task.data.symbol);
    })
    let producttaxcode = 0;
    let taxrate = 0;
    let mtax = 0;
    let tax = 0;
    let amount = 0;
    let totalamount = 0;

    let findProductInCart = await cart.find(i=>{
      return i.sku === product.sku
    });

    if(findProductInCart){
      let newCart = [];
      let newItem;

      cart.forEach(cartItem => {
        if(cartItem.sku === product.sku){
          producttaxcode =product.tax_code_sale;
          let mqty=cartItem.quantity + 1;
          taxcode.map((mtaxcode, key) => {
            if(mtaxcode.data.title === producttaxcode){
            taxrate =  mtaxcode.data.rate;
            mtax += (mqty * cartItem.price * taxrate ) / (100 + taxrate);
            }
            tax = mtax.toFixed(2);
            
          });
          totalamount= cartItem.price * (cartItem.quantity + 1);
          amount = totalamount - tax;
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            netAmount: amount,
            totalAmount: totalamount,
            tax: tax
          }
          newCart.push(newItem);
        }else{
          newCart.push(cartItem);
        }
      });

      setCart(newCart);
      toast(`Added ${newItem.name} to cart`,toastOptions)

    }else{
      producttaxcode =product.tax_code_sale;
      
      taxcode.map((mtaxcode, key) => {
        if(mtaxcode.data.title === producttaxcode){
          taxrate =  mtaxcode.data.rate;
          mtax += (product.price * taxrate ) / (100 + taxrate);
          
          console.log("mtaxcode "+producttaxcode+", mtaxrate= "+taxrate)
        }
        tax = mtax.toFixed(2);
        amount = product.price - tax; 
      });
      let addingProduct = {
        ...product,
        quantity: 1,
        netAmount: amount,
        totalAmount: product.price,
        tax: tax
      }
      setCart([...cart, addingProduct]);
      toast(`Added ${product.name} to cart`, toastOptions)
      console.log("Tax Rate: "+taxrate+", "+"Tax: "+tax+", Amount: "+product.price)
    }

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

  useEffect(() => {
    fetchFamilyGroup();
    
  },[]);

     /* function to get all tasks from firestore in realtime */ 
     useEffect(() => {
      const taskColRef = query(collection(db, 'stores'), orderBy('name'))
      onSnapshot(taskColRef, (snapshot) => {
        setStores(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      })
    },[])
  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const taskColRef = query(collection(db, 'taxrates'), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setTaxCodes(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])
  
  /* function to get all tasks from firestore in realtime */ 
  useEffect(() => {
    const taskColRef = query(collection(db, 'currency_base'), orderBy('created', 'desc'))
    onSnapshot(taskColRef, (snapshot) => {
      setBaseCurrency(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

 

  const handleSave =  async() => {
    let maxLimit = 999999;
    let minLimit = 999;
    let range = maxLimit - minLimit;
    let invoice_ref = Math. random() * range;
    invoice_ref = Math. floor(invoice_ref);
    const batch = writeBatch(db);
    var mydoc_dl = Math.random().toString(36).slice(2);
    const debtorsledgerRef = doc(db, "debtors_ledger", mydoc_dl);

    var timestamp  =  Timestamp.now();
    const user = '';
    const hastax = true;
    var taxTypes = [];
    var grandTotal = 0;
    var totalTax = 0;
    var today = null;
    if(date)
      today = new Date(date)
    else
    today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var dayInt = today.getDay();    
    var datelongformat = today*1;  // outputs a long value
    //new Date(longFormat); gives correct date format, from long to string
    var mdate = yyyy + '-' + mm + '-' + dd;
    console.log('saving..'+mdate+','+datelongformat)    
    var invoice_number = Math.random().toString(36).slice(2);


    
    cart.forEach(cartItem => {
      grandTotal += cartItem.totalAmount;
      totalTax += cartItem.tax;
      var mydoc_sdb = Math.random().toString(36).slice(2);
      var mydoc_stocks = Math.random().toString(36).slice(2);
      var mydoc_sl = Math.random().toString(36).slice(2);

      var lineref = Math.random().toString(36).slice(2);
      const salesdaybookRef = doc(db, "sales_daybook", mydoc_sdb);
      const inventoryRef = doc(db, "inventory_stocks", mydoc_stocks);
      const salesledgerRef = doc(db, "sales_ledger", mydoc_sl);
      let qty = cartItem.quantity;
      let amount = cartItem.totalAmount;
      let netamount = cartItem.netAmount;
      let mtax = cartItem.tax;
      if(cartItem.type === 'service') {
      } else{
        qty = qty * -1;
        amount = amount * -1;
        netamount = netamount * -1;
        mtax = mtax * -1;
      }
    batch.set(inventoryRef, {
      invoice_number: invoice_number,
      invoice_ref: invoice_ref,
      check_number: checkNumber,
      sku: cartItem.sku,
      name: cartItem.name,
      description: cartItem.description,
      maingroup: cartItem.maingroup,
      familygroup: cartItem.familygroup,
      itemgroup: cartItem.itemgroup,
      type: cartItem.type,
      trackinventory: cartItem.trackinventory,
      price: cartItem.price,
      costprice: cartItem.costprice,
      unit: cartItem.unit,
      image: cartItem.image, 
      tax_code_purchase: cartItem.tax_code_purchase, 
      tax_code_sale: cartItem.tax_code_sale,
      quantity: qty,
      amount: amount,
      netamount: netamount,
      tax: mtax,
      currency: cartItem.currency,
      reorderlevel: cartItem.reorderlevel,
      reorderqty: cartItem.reorderqty,
      leadtimedays: cartItem.leadtimedays,
      created: timestamp,
      mdate: mdate,
      log: datelongformat,
      lineref: lineref,
      uid: mydoc_stocks
     })

     batch.set(salesdaybookRef, {
      invoice_number: invoice_number,
      invoice_ref: invoice_ref,
      check_number: checkNumber,
      customer_name: storeSelected,
      servedby_name: '',
      address: '',
      sku: cartItem.sku,
      name: cartItem.name,
      description: cartItem.description,
      maingroup: cartItem.maingroup,
      familygroup: cartItem.familygroup,
      itemgroup: cartItem.itemgroup,
      type: cartItem.type,
      trackinventory: cartItem.trackinventory,
      price: cartItem.price,
      costprice: cartItem.costprice,
      unit: cartItem.unit,
      image: cartItem.image, 
      tax_code_purchase: cartItem.tax_code_purchase, 
      tax_code_sale: cartItem.tax_code_sale,
      quantity: cartItem.quantity,
      amount: cartItem.totalAmount,
      netamount: cartItem.netAmount,
      tax: cartItem.tax,
      currency: cartItem.currency,
      reorderlevel: cartItem.reorderlevel,
      reorderqty: cartItem.reorderqty,
      leadtimedays: cartItem.leadtimedays,
      created: timestamp,
      mdate: mdate,
      log: datelongformat,
      lineref: lineref,
      uid: mydoc_sdb
     })

     batch.set(salesledgerRef, {
      sku: cartItem.sku,
      item_name: cartItem.name,
      description: cartItem.description,
      maingroup: cartItem.maingroup,
      familygroup: cartItem.familygroup,
      itemgroup: cartItem.itemgroup,
      account_name: cartItem.name,
      account_type: 'Income',
      name: storeSelected,
      tr_date: mdate,
      tr_date_long: datelongformat,
      tr_no: invoice_number,
      invoice_ref: invoice_ref,
      check_number: checkNumber,
      memo: 'Sales Invoice',
      ref: 'Debtors Ledger',
      reference: cartItem.type,
      amount: cartItem.netAmount,
      double_entry_type: 'Double Entry',
      credit_or_debit: 'Credit',
      double_entry_account_name: 'Accounts Receivable',
      double_entry_account_type: 'Current Assets',
      currency: cartItem.currency,
      has_tax: hastax,
      user_name: '',
      created: timestamp,
      uid: mydoc_sl
    });

      
    taxcode.map((mtaxcode, key) => {
      if(mtaxcode.data.title === cartItem.tax_code_sale){
        var mydoc_cl = Math.random().toString(36).slice(2);
        const creditorsledgerRef = doc(db, "creditors_ledger", mydoc_cl);
        batch.set(creditorsledgerRef, {
          sku: cartItem.sku,
          item_name: cartItem.name,
          description: cartItem.description,
          maingroup: cartItem.maingroup,
          familygroup: cartItem.familygroup,
          itemgroup: cartItem.itemgroup,
          account_name: mtaxcode.data.account_name,
          account_type: 'Current Liability',
          name: storeSelected,
          tr_date: mdate,
          tr_date_long: datelongformat,
          tr_no: invoice_number,
          invoice_ref: invoice_ref,
          check_number: checkNumber,
          memo: 'Sales Invoice',
          ref: 'Debtors Ledger',
          reference: cartItem.type,
          amount: (cartItem.netAmount * mtaxcode.data.rate) / 100,
          double_entry_type: 'Double Entry',
          credit_or_debit: 'Debit',
          double_entry_account_name: 'Accounts Receivable',
          double_entry_account_type: 'Current Assets',
          currency: cartItem.currency,
          has_tax: hastax,
          tax_title: mtaxcode.data.title,
          tax_name: mtaxcode.data.name,
          tax_rate: mtaxcode.data.rate,
          user_name: '',
          created: timestamp,
          uid: mydoc_sl
        });
      }
    });

    })// end cart.forEach


    batch.set(debtorsledgerRef, {
      account_name: 'Accounts Receivable',
      account_type: 'Current Assets',
      name: storeSelected,
      tr_date: mdate,
      tr_date_long: datelongformat,
      tr_no: invoice_number,
      invoice_ref: invoice_ref,
      check_number: checkNumber,
      memo: 'Sales Invoice',
      ref: 'Sales Ledger',
      reference: '',
      amount: grandTotal,
      double_entry_type: 'Double Entry',
      credit_or_debit: 'Debit',
      double_entry_account_name: 'Income',
      double_entry_account_type: 'Income',
      currency: currency,
      has_tax: hastax,
      user_name: '',
      created: timestamp,
      uid: mydoc_dl

    });

    await batch.commit();
   
  }
    return (
    <MainLayout>
      <div className='row'>
      <div>
      <label for="checkNumber">Check No. </label>
        <input 
        type = 'number' name='checkNumber' size= 'sm'  
        placeholder='0.0' 
        value={checkNumber} onChange={(e) => setCheckNumber(e.target.value)}
        />  <br/> 
          <label for="store_selected">Store</label>
        <select 
            name='store_selected' 
            onChange={(e) => setStoreSelected(e.target.value)  } 
            value={storeSelected}>
            {
              store.map((task) => {
                if(task.data.name === storeSelected)
             return(
              <option value={task.data.name} selected >{task.data.name}</option>
               );
               else
               return(
                <option value={task.data.name} >{task.data.name}</option>
                 );                       
             })
          }
        </select>

        </div>
      <div>
      <input
        type="date"
        onChange={handleDateChange}
        ref={dateInputRef}
      />{" "} Selected Date: {date}
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
        <div className='col-lg-8'>
          {isLoading ? 'Loading' : <div className='row'>
              {displayProducts.map((product, key) =>
                <div key={key} className='col-lg-4 mb-4'>
                  <div className='pos-item px-3 text-center border' onClick={() => addProductToCart(product)}>
                      <p><img src={product.image} className="img-fluid"  />{product.name} {product.currency} {product.price}</p>
                      
                      
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
                <h2 className='px-2 text-white'>Total Amount: {currency} {totalAmount}</h2>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <td>Tax Code</td>
                      <td>Tax</td>
                      <td>Total</td>                      
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
              </div>
              <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  <button className='btn btn-primary' onClick={handlePrint}>
                    Print
                  </button> |{" "}
              <button className='btn btn-primary' onClick={() => handleSave()}>
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