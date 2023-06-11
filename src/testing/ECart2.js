import React, { useState } from 'react';

const ECart = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [change, setChange] = useState(0);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = items.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const handleCategoryFilterChange = event => {
    setFilter(event.target.value);
  };

  const handlePaymentChange = event => {
    setPaid(event.target.value);
  };

  const filteredItems = items.filter(item => {
    if (filter) {
      return item.category === filter;
    }
    return true;
  });

  const itemsTotal = filteredItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    setTotal(itemsTotal);
    setChange(paid - total);
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <label>
        Filter by category:
        <select value={filter} onChange={handleCategoryFilterChange}>
          <option value="">All</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="homegoods">Home Goods</option>
        </select>
      </label>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <input
              type="number"
              value={item.quantity}
              onChange={event => handleQuantityChange(item.id, event.target.value)}
            />
          </li>
        ))}
      </ul>
      <div>
        Total: ${total}
        <br />
        Paid: $
        <input type="number" value={paid} onChange={handlePaymentChange} />
      </div>
      <button onClick={handleCheckout}>Checkout</button>
      {change !== 0 && <div>Change: ${change}</div>}
    </div>
  );
};

export default ECart;
