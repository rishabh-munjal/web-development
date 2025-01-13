import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])


  useEffect(() =>{
    axios.get('/api/jokes')
    .then((response) =>{
      setJokes(response.data)
    })
    .catch((err) =>{
      console.log(err)
    })
  })

  return (
    <>
      <h1>Lets Laugh : )</h1>
      {
        jokes.map((joke , index) =>(

          <div key = {joke.id}>

            <h3>{joke.joke}</h3>

          </div>

        ))
      }
    </>
  )
}

export default App
