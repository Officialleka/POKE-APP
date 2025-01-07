import React from 'react'
import { pokemonTypeColors } from '../Utils'

const TypeCard = (props) => {
 
  const type  = props.type
 
  return (
   <div className='type-tile'
   style={{
      color: pokemonTypeColors?.[type].color,
      background: pokemonTypeColors?.[type].background
   }}>
    <p>
      {type}
    </p>
   </div>
  )
}

export default TypeCard