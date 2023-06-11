import React from "react";

import {
  useLocation,
  NavLink,
  Outlet,
  useSearchParams,
} from 'react-router-dom';
import { getProducts } from './data';

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Items() {
  let products = getProducts();
  let [searchParams, setSearchParams] = useSearchParams({ replace: true });

  return (
    <div style={{ display: 'flex' }}>
      <button>Add+</button><br/>
      <nav style={{ borderRight: 'solid 1px', padding: '1rem' }}>
        <input
          value={searchParams.get('filter') || ''}
          onChange={(event) => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter }, { replace: true });
            } else {
              setSearchParams({}, { replace: true });
            }
          }}
        />
        {products
          .filter((product) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = product.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((product) => (
            <QueryNavLink
              key={product.number}
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : '',
                };
              }}
              to={`/products/${product.number}`}
            >
              {product.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}

