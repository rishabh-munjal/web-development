import { useState } from 'react';

function App() {
  const [color, setColor] = useState("lightcoral");

  return (
    <div className="h-screen w-screen duration-200" style={{ backgroundColor: color }}>
      <div id="colors" className='flex gap-8 justify-center items-center mx-auto rounded-b-full w-[90%] h-[42px] bg-white'>
        <button onClick={() => {setColor("lightcoral")}} className='bg-red-200 p-1 w-16 rounded-full text-black font-bold'>Red</button>
        <button onClick={() => {setColor("lightblue")}} className='bg-blue-200 p-1 w-16 rounded-full text-black font-bold'>Blue</button>
        <button onClick={() => {setColor("lightgreen")}} className='bg-green-200 p-1 w-16 rounded-full text-black font-bold'>Green</button>
        <button onClick={() => {setColor("lightyellow")}} className='bg-yellow-200 p-1 w-16 rounded-full text-black font-bold'>Yellow</button>
        <button onClick={() => {setColor("plum")}} className='bg-purple-200 p-1 w-16 rounded-full text-black font-bold'>Purple</button>
        <button onClick={() => {setColor("lightpink")}} className='bg-pink-200 p-1 w-16 rounded-full text-black font-bold'>Pink</button>
        <button onClick={() => {setColor("peachpuff")}} className='bg-orange-200 p-1 w-16 rounded-full text-black font-bold'>Orange</button>
        <button onClick={() => {setColor("lightseagreen")}} className='bg-teal-200 p-1 w-16 rounded-full text-black font-bold'>Teal</button>
        <button onClick={() => {setColor("lavender")}} className='bg-indigo-200 p-1 w-16 rounded-full text-black font-bold'>Indigo</button>
        <button onClick={() => {setColor("lightgray")}} className='bg-gray-200 p-1 w-16 rounded-full text-black font-bold'>Gray</button>
        <button onClick={() => {setColor("gainsboro")}} className='bg-black-200 p-1 w-16 rounded-full text-black font-bold'>Black</button>
      </div>
    </div>
  );
}

export default App;