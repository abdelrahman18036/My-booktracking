import React from 'react'
import { Link } from 'react-router-dom'


function DefaultPage(props){
  return (
    <Link to="/"><button className="close" onClick={props.resest} >Close</button></Link>
  )
}

export default DefaultPage