import React from 'react'
// import { utils } from './Utils'
import { colors } from './Utils'
export default function PlayNumber(props) {
  const onNumberClick = () => {
    props.onNumberClicked(props.item,props.status)
  }

  return (
    <>
      <button style={{ backgroundColor: colors[props.status] }} 
      className="number" 
      onClick={onNumberClick}>{props.item}</button>
    </>
      
    
  )

}
