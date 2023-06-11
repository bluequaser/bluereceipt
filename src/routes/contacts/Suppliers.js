import React from "react";

import {
  useLocation,
  NavLink,
  Outlet,
  useSearchParams,
  Link
} from 'react-router-dom';
import { getSuppliers } from './dataSuppliers';

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}

export default function Suppliers() {
  let suppliers = getSuppliers();
  let [searchParams, setSearchParams] = useSearchParams({ replace: true });

  return (
    <div><Link  to="/expenses"><button>Add</button></Link>
    <div style={{ display: 'flex' }}>
      
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
        {suppliers
          .filter((supplier) => {
            let filter = searchParams.get('filter');
            if (!filter) return true;
            let name = supplier.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((supplier) => (
            <QueryNavLink
              key={supplier.number}
              style={({ isActive }) => {
                return {
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'red' : '',
                };
              }}
              to={`/suppliers/${supplier.number}`}
            >
              {supplier.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
    </div>
  );
}

