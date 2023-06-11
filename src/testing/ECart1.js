import React, { useState } from 'react';

const ECart = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category 1', price: 9.99 },
    { id: 2, name: 'Product 2', category: 'Category 2', price: 19.99 },
    { id: 3, name: 'Product 3', category: 'Category 1', price: 29.99 },
    { id: 4, name: 'Product 4', category: 'Category 3', price: 39.99 },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const handleCategoryFilter = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    setTotal(total + product.price);
  };

  const handleRemoveFromCart = (product) => {
    setCart(cart.filter((p) => p.id !== product.id));
    setTotal(total - product.price);
  };

  const handlePayment = () => {
    // Implement manual payment processing here
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div>
      <h1>Shopping Cart</h1>
      <div>
        <label htmlFor="category-filter">Filter by category:</label>
        <select id="category-filter" onChange={handleCategoryFilter}>
          <option value="">All</option>
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
          <option value="Category 3">Category 3</option>
        </select>
      </div>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <p>{product.name} - {product.category} - {product.price}</p>
            <button onClick={() => handleAddToCart(product)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <h2>Cart</h2>
        <div>
          {cart.map((product) => (
            <div key={product.id}>
              <p>{product.name} - {product.category} - {product.price}</p>
              <button onClick={() => handleRemoveFromCart(product)}>
                Remove from cart
              </button>
            </div>
          ))}
        </div>
        <p>Total: {total}</p>
        <button onClick={handlePayment}>Proceed to Payment</button>
      </div>
    </div>
  );
};

export default ECart;