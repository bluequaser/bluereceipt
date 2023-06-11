import React from "react";
import "../style.css";
import {Link, Outlet } from "react-router-dom";
export default function Settings() {
  return (
    <div>
 
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/groupsincomeexpense">Accounts Chart</Link> |{" "}
        <Link to="/expenses">Expenses</Link> |{" "}
        <Link to="/suppliers">Contacts</Link> |{" "}
        <Link to="/inventory">Inventory</Link> |{" "}
        <Link to="/settings">Settings</Link> |{" "}
        <Link to="/currency_base">Currencies</Link> |{" "}
        <Link to="/taxrates">Tax Codes</Link> |{" "}
        <Link to="/mclass">Class</Link> |{" "}
        <Link to="/taskmanager">TaskManager</Link> |{" "}
        <Link to="/stores">Stores</Link>
      </nav>
     <Outlet/>
    </div>
  );
}
