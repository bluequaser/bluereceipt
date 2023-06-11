import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './App';
import ETRReceipts from "./etr/ReceiptsApp";
import ECart from './testing/ECart';
import Expenses from "./routes/Expenses";
import Invoices from "./routes/Invoices";
import Invoice from "./routes/Invoice";

import ComponentB from "./pos/pages/ComponentB";
import InvoicesPos from "./pos/pages/Invoices";
import InvoicePos from "./pos/pages/Invoice";
import SalesInvoices from "./sales/Invoices";
import SalesInvoice from "./sales/Invoice";
import POSHomePagePurchases from './purchases/pages/HomePage';
import POSPagePurchases from './purchases/pages/POSPage';

import Products from "./purchases/invoices/Invoices";
import Product from "./purchases/invoices/Invoice";
import ProductItem from "./purchases/invoices/POSPage";

import Stores from "./routes/Stores";
import Store from "./routes/Store";
import Suppliers from "./contacts/suppliers/AppTaskManager";
import Customers from "./contacts/customers/AppTaskManager";
import TaxCodes from "./settings/taxcodes/AppTax";
import GroupsIncomeStatement from "./settings/chartofaccounts/GroupsIncomeStatement";
import GroupIncomeStatement from "./settings/chartofaccounts/GroupIncomeStatement";
import AccountsChartPL from "./settings/chartofaccounts/accounts/AppTaskManager";
import BalanceSheetGroups from "./settings/chartofaccounts/balsheetgroups/AppTaskManager";
import AccountsChartBS from "./settings/chartofaccounts/balsheetaccounts/AppTaskManager";
import TaxRates from "./settings/taxrates/TaskManager";
import MClass from "./settings/mclass/AppTaskManager";
import CurrencyBase from "./settings/currencies/base_currency/AppTaskManager";
import CurrenciesForeign from "./settings/currencies/foreign_currencies/AppTaskManager";
import Supplier from "./routes/contacts/Supplier";
import Inventory from "./inventory/inventory/AppTaskManager";
import Location from "./inventory/location/AppTaskManager";
import Categories from "./inventory/Categories";
import Category from "./inventory/Category";
import AppTaskManager from "./taskmanager/AppTaskManager";
import AppTaskManagerPOS from "./pos2/AppTaskManager";
import Settings from "./settings/Settings";
import Sales from "./sales/TaskManager";
import SalesTable from "./sales/App";
import POSHomePage from './pos/pages/HomePage';
import POSPage from './pos/pages/POSPage';
import POSPageEdit from './pos/pages/POSPageEdit';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
      <Route path="etrreceipts" element={<ETRReceipts />} />  
      <Route path="ecart" element={<ECart />} />
      <Route path="sales" element={<Sales />} />
      <Route path="salestable" element={<SalesTable />} />
      <Route path="taxcodes" element={<TaxCodes />} />
      <Route path="poshome" element={<POSHomePage />} />
      <Route path="pos" element={<POSPage />} />
      <Route path="posedit" element={<POSPageEdit />} />
      <Route path="poshomepurchases" element={<POSHomePagePurchases />} />
      <Route path="pospurchases" element={<POSPagePurchases />} />
      <Route path="taxrates" element={<TaxRates />} />
      <Route path="accountschartbs" element={<AccountsChartBS />} />
      <Route path="accountschartpl" element={<AccountsChartPL />} />
      <Route path="balsheetgroups" element={<BalanceSheetGroups />} />
      <Route path="mclass" element={<MClass />} />
      <Route path="currency_base" element={<CurrencyBase />} />
      <Route path="currencies_foreign" element={<CurrenciesForeign />} />
      <Route path="settings" element={<Settings />} />
      <Route path="customers" element={<Customers />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="location" element={<Location />} />

      <Route path="componentB" element={<ComponentB />} />
      <Route path="groupsincomeexpense" element={<GroupsIncomeStatement />} >
        <Route
             index
             element={
              <main style={{ padding: "1rem" }}>
                <p>Select a Group</p>
              </main>
             }
        />
        <Route path=":groupincomeexpenseId" element={<GroupIncomeStatement />} />
      </Route>

      <Route path="categories" element={<Categories />} >
        <Route
             index
             element={
              <main style={{ padding: "1rem" }}>
                <p>Select a Category</p>
              </main>
             }
        />
        <Route path=":categoryId" element={<Category />} />
      </Route>
      

          <Route path="suppliers" element={<Suppliers />} >
          <Route
             index
             element={
              <main style={{ padding: "1rem" }}>
                <p>Select a Supplier</p>
              </main>
             }
           />
           <Route path=":supplierId" element={<Supplier />} />
          </Route>
      <Route path="products" element={<Products />} >
          <Route
             index
             element={
              <main style={{ padding: "1rem" }}>
                <p>Select a Product</p>
              </main>
             }
           />
           <Route path=":productId" element={<ProductItem />} />
      </Route>
        <Route path="expenses" element={<Expenses />} />
        <Route path="taskmanager" element={<AppTaskManager />} />
        <Route path="pointofsale" element={<AppTaskManagerPOS />} />
        <Route path="invoices" element={<Invoices />} >
           <Route
             index
             element={
              <main style={{ padding: "1rem" }}>
                <p>Select an invoice</p>
              </main>
             }
           />
           <Route path=":invoiceId" element={<Invoice />} />
        </Route>
        <Route path="invoicespos" element={<InvoicesPos />} >
           <Route
             index
             element={
              <main style={{ padding: "1rem" }}>
                <p>Select an invoice</p>
              </main>
             }
           />
           <Route path=":invoiceposId" element={<InvoicePos />} />
        </Route>
        <Route path="salesinvoices" element={<SalesInvoices />} >
           <Route
             index
             element={
              <main style={{ padding: "1rem" }}>
                <p>Select an invoice</p>
              </main>
             }
           />
           <Route path=":salesinvoiceId" element={<SalesInvoice />} />
        </Route>
        <Route path="stores" element={<Stores />} >
           <Route
             index
             element={
              <main style={{ padding: "1rem" }}>
                <p>Select a store</p>
              </main>
             }
           />
           <Route path=":storeId" element={<Store />} />
        </Route>
        <Route
          path="*"
          element={
           <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
           </main>
          }
         />
        </Route>
    </Routes>
   </BrowserRouter>
  </StrictMode>  
);
