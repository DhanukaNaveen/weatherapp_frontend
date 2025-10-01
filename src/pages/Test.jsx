// Handle Add City button click
// (Move this logic inside your component if needed)
// Example usage inside a component:
// const handleAddCity = () => {
//   if (!isNaN(cityInput) && cityInput.trim() !== "") {
//     setCityCodes(prevCityCodes => [...prevCityCodes, cityInput]); 
//     setCityInput(''); 
//     setError(null); 
//   } else {
//     setError('Please enter a valid city code.'); 
//   }
// };

import {React,  useState } from 'react';

function Counter() {
  // Declare a state variable 'count' initialized to 0
  const [count, setCount] = useState(0);

  // Function to increment the counter
  const increment = () => {
    setCount(count + 1);
  };

  // Function to decrement the counter
  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

export default Counter;
