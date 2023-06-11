import React from "react";
import "./style.css";
import { Outlet, Link } from "react-router-dom";
export default function App() {
  return (
    <div>
      <h1>Book keeper</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link> |{" "}
        <Link to="/suppliers">Contacts</Link> |{" "}
        <Link to="/inventory">Inventory</Link> |{" "}
        <Link to="/settings">Settings</Link> |{" "}
        <Link to="/taskmanager">TaskManager</Link> |{" "}
        <Link to="/sales">Sales</Link> |{" "}
        <Link to="/poshome">POS</Link> |{" "}
        <Link to="/products">Purchases</Link>  |{" "}
        <Link to="/poshomepurchases">Purchases Invoices</Link>   |{" "}
        <Link to="/ecart">ECart</Link>    |{" "}
        <Link to="/invoicespos">Invoices POS</Link>   |{" "}
        <Link to="/etrreceipts">ETR</Link>    |{" "}
        <Link to="/pointofsale">Q POS</Link> 
      </nav>
      <Outlet />
    </div>
  );
}
