import React, { useState } from 'react'
import { first151Pokemon, getFullPokedexNumber } from '../Utils'

const SideNav = (props) => {
  const  { selectedPoke, setSelectedPoke, showSideMenu, handleCloseMenu, setShowSideMenu } = props
  const [searchValue, setSearchValue] = useState('')

  const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
    if (getFullPokedexNumber(eleIndex).includes(searchValue.toLowerCase())) {
          return true
    }

    if (ele.toLowerCase().includes(searchValue.toLowerCase())) {
      return true
    }

    return false
    
  });

  
   const pokeButtons = filteredPokemon.map((pokes, pokeIndex) => {
   const trueIndeOfPoke = first151Pokemon.indexOf(pokes)

          return (
            <button 
            key={pokeIndex}
            onClick={
              () => {
                setSelectedPoke(trueIndeOfPoke)
                handleCloseMenu()
              }
            }
            className = {(pokeIndex === selectedPoke) ? ' nav-card-selected' : '' + ' nav-card'}>
              <p>{getFullPokedexNumber(trueIndeOfPoke)}</p>
              <p>{pokes}</p>
            </button> 
           )
    })
   
  return (

    <nav className={' ' + (!showSideMenu ? ' open': "") }>
      <div className={'header ' + (!showSideMenu ? ' open': "") }>
      <button
      onClick={handleCloseMenu} className='open-nav-button'>
      <i className="fa-solid fa-arrow-left">

      </i>
        </button>  
        <h1 className='text-gradient'>POKEY</h1>
      </div>
      <input
      placeholder='search by pokemon name or number'
      value={searchValue} 
      onChange={(e) => {
         setSearchValue(e.target.value)
      }}/>
      {pokeButtons}
    </nav>
  )
}

export default SideNav