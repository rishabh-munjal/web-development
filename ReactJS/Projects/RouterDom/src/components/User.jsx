import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
  return (
    <div>
      User : {useParams().userid}
    </div>
  )
}

export default User
