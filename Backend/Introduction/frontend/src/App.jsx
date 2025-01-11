import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { response } from 'express'

function App() {
  const [jokes, setJokes] = useState([])


  useEffect(() =>{
    axios.get('http://localhost:3000/')
    .then((response) =>{
      setJokes(response.data)
    })
    .catch((err) =>{
      console.log(err)
    })
  })

  return (
    <>
      <H1>Lets Laugh:</H1>
      {
        jokes.map((joke , index) =>{

          <div key = {joke.id}>

            <h3>{joke.joke}</h3>

          </div>

        })
      }
    </>
  )
}

export default App
