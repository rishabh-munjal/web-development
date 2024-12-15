import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // Function to increase the counter
  const addValue = () => {
    setCount(count + 1);
  };

  // Function to decrease the counter
  const removeValue = () => {

    if(count > 0){
      
      setCount(count - 1);
    }
  };

  return (
    <>
      <h1>Counter Value: {count}</h1>

      <button onClick={addValue}>Add 1 to {count}</button>
      <p></p>
      <button onClick={removeValue}>Subtract 1 from {count}</button>
    </>
  )
}

export default App
