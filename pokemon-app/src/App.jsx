import { useState } from "react"
import Header from "./components/Header"
import PokeCard from "./components/PokeCard"
import SideNav from "./components/SideNav"
import './fanta.css'



function App() {
 const [selectedPoke, setSelectedPoke] = useState(0)
 const [showSideMenu, setshowSideMenu] = useState(true)

function handleToggle () {
  setshowSideMenu(!showSideMenu)
}

function handleCloseMenu () {
  setshowSideMenu(!showSideMenu)
}
  return (
    <>
      <Header handleToggle={handleToggle}/>
      <SideNav 
      selectedPoke={selectedPoke}
      setSelectedPoke={setSelectedPoke}
      handleCloseMenu={handleCloseMenu}
      showSideMenu={showSideMenu}
      setshowSideMenu={setshowSideMenu} />
      <PokeCard
      selectedPoke={selectedPoke}
      setSelectedPoke={setSelectedPoke}/>
    </>
  )
}

export default App
