import React, { useEffect , useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { data } from 'react-router'

function Github() {

    const {followers} = useLoaderData() 

    // const [followers, setFollowers] = useState([])

    // useEffect(() => {

    //     fetch('https://api.github.com/users/rishabh-munjal')
    //     .then(res => res.json())
    //     .then(data => {

    //         console.log(data.followers);
    //         setFollowers(data.followers)

    //     })

    // }, [])
    
  return (
    <div>
      <h1>Github Followers : {followers}</h1>

    </div>
  )
}

export default Github

export const githubInfoLoader  = async () => {
    const responce  = await fetch('https://api.github.com/users/rishabh-munjal')
    
    return responce.json()
}
