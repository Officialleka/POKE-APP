import React from 'react'

const Header = (props) => {
  const { handleToggle } = props
  return (
    <>
    <header>
      <button 
      onClick={handleToggle}
      className='open-nav-button'>
      <i className="fa-solid fa-bars">

      </i>
      </button>
      <h1 className='text-gradient' >
        POKEY-CITY
      </h1>
    </header>
    </>
  )
}

export default Header