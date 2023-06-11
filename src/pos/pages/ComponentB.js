import React from 'react'
import {useLocation} from 'react-router-dom';
  function ComponentB() { 
     const location = useLocation(); 
       return ( 
             <> 
               <div>{location.state.name}</div> 
                </> 
       ) 
}
 export default ComponentB;
