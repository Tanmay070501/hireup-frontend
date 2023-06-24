import React from 'react'
import { useSelector } from 'react-redux';

function ViewResume() {
    const { user } = useSelector((state) => state.auth); 
  return (
    <div>
      <iframe style={{width:"100vw", height:"85vh"}} title="Resume" src={user?.resume}></iframe>
    </div>
  )
}

export default ViewResume
