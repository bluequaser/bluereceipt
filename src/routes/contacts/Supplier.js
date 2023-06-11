import React from "react";
import { useParams ,
  useNavigate,
  useLocation} from "react-router-dom";
import { getSupplier, deleteSupplier } from "./dataSuppliers";
export default function Supplier() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  let supplier = getSupplier(parseInt(params.supplierId, 10));
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {supplier.amount}</h2>
      <p>
        {supplier.name}: {supplier.number}
      </p>
      <p>Due Date: {supplier.due}</p>
      <p>
        <button
          onClick={() => {
            deleteSupplier(supplier.number);
            navigate("/suppliers" + location.search);
          }}
        >
          Delete
        </button>
      </p>
    </main>
  );
}