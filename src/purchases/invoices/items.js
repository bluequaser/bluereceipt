import React from 'react'

let products =[
  {
    id: 1,
    category: 'Beverage:Beers',
    categoryid: 2,
    name: 'Tusker Lager 500ml',
    image: '',
    price: 300
  },
  {
    id: 2,
    category: 'Beverage:Beers',
    categoryid: 2,
    name: 'Tusker Cider 500ml',
    image: '',
    price: 400
  },
  {
    id: 3,
    category: 'Beverage:Beers',
    categoryid: 2,
    name: 'Tusker Malt 300ml',
    image: '',
    price: 300
  },
  {
    id: 4,
    category: 'Beverage:Beers',
    categoryid: 2,
    name: 'Tusker Lite 300ml',
    image: '',
    price: 400
  },
  {
    id: 5,
    category: 'Beverage:Beers',
    categoryid: 2,
    name: 'Savannah 300ml',
    image: '',
    price: 400
  },
  {
    id: 6,
    category: 'Beverage:Softs',
    categoryid: 1,
    name: 'Fanta 300ml Bottle',
    image: '',
    price: 400
  }
];

export function getProducts() {
  return products;
}
/*
export function getProductsByCategory(categoryid) {
  products = products.filter(
    (product) => product.categoryid === categoryid
  );
}
*/
export function getProduct(number) {
  return products.find(
    (product) => product.number === number
  );
}



