import React from "react";
import { useParams ,
  useNavigate,
  useLocation} from "react-router-dom";
import { getProduct, deleteProduct } from "./data";
import Counter from './Counter'

export default function Item() {
  let navigate = useNavigate();
  let location = useLocation();
  let params = useParams();
  let product = getProduct(parseInt(params.productId, 10));
  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {product.amount}</h2>
      <p>
        {product.name}: {product.number}
      </p>
      <p>Due Date: {product.due}</p>
      <p>
        <button
          onClick={() => {
            deleteProduct(product.number);
            navigate("/products" + location.search);
          }}
        >
          Delete
        </button>
      </p>
      <h2>Shoping Cart</h2>
      <Counter />
    </main>
  );
}