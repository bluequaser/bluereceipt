import React, { useState } from "react";

// Importing app.css is css file to add styling
//import "./App.css";

const Counter = () => {
// Counter is a state initialized to 0
const [counter, setCounter] = useState(0)

// Function is called everytime increment button is clicked
const handleClick1 = () => {
	// Counter state is incremented
	setCounter(counter + 1)
}

// Function is called everytime decrement button is clicked
const handleClick2 = () => {
	// Counter state is decremented
	setCounter(counter - 1)
}

return (
	<div >
   
	<div >
		{counter} x kes
	</div>
	<div className="buttons">
		<button 
		onClick={handleClick1}>+</button>
		<button 
		onClick={handleClick2}>-</button>
	</div>
	</div>
)
}

export default Counter
