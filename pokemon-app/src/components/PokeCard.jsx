import React, { useEffect, useState } from 'react'
import { getFullPokedexNumber, getPokedexNumber } from '../Utils'
import TypeCard from './TypeCard'
import Modal from './Modal'

const PokeCard = (props) => {
  const { selectedPoke, setSelectedPoke } = props
  const [data, setData] = useState(null)
  
  const [loading, setLoading] = useState(false)
  const [skill, setSkill] = useState(null)
  const [loadingSkill, setLoadingSkill] = useState(false)

  const {name, height, abilities, stats, types, moves, sprites} = data || {}

  const imgLIst = Object.keys(sprites || {}).filter((val) => {
    if(!sprites[val]) {
       return false
    }
    if (['versions', 'other'].includes(val)) {
      return false
    }
    return true
  })

  async function fetchMoveData(move, moveUrl) {
    if (loadingSkill || !localStorage || !moveUrl) {
      return
    }

    let c = {}
    if (localStorage.getItem('poke-moves')) {
      c = JSON.parse(localStorage.getItem('poke-moves'))
    }

    if (move in c)  {
      setSkill(c[move])
      console.log('found in cache')
    }

    try {
      setLoadingSkill(true)
      const res = await fetch(moveUrl)
      const moveData = await res.json()
      console.log( 'fetched move', moveData)
      const description = moveData.flavor_text_entries.filter((val) => {
        return val.version_group.name = 'firered-leafgreen'
      })[0].flavor_text

      const skillData = {
        name: move,
        description
      }

      setSkill(skillData) 
      c[move] = skillData
      localStorage.setItem('poke-moves', JSON.stringify(c))
      
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingSkill(false)
    }
  }

  useEffect(
    () => {
     if(loading || !localStorage) {
      return
     }


     let cache = {} 
     if(localStorage.getItem('pokey')) {
      cache = JSON.parse(localStorage.getItem('pokey'))
     }
     

     if(selectedPoke in cache) {
      setData(cache[selectedPoke]);
      console.log('found pokemon')
      return 
     }

     async function fetchPokeData() {
      setLoading(true)
           try {
            const baseUrl = 'https://pokeapi.co/api/v2/'
            const suffix = 'pokemon/' + getPokedexNumber(selectedPoke)
            const finalUrl = baseUrl + suffix
            console.log(finalUrl)
            const res = await fetch(finalUrl)
            const pokemonData = await res.json()
            setData(pokemonData)
            console.log('fetched pokemon')
            cache[selectedPoke] = pokemonData
            localStorage.setItem('pokey', JSON.stringify(cache))
               
           } catch (err) {
            console.log(err.message)
           }
           finally {
              setLoading(false)
           }
     }

  fetchPokeData();
  }, [selectedPoke])

  if(loading || !data) {
    return (
      <div className='loading'>
        <img src={'./pokemon/' + getFullPokedexNumber(selectedPoke) + '.png'} alt=""
        className='loading-img' />
      </div>
    )
  }
  
  return (
     <div className='poke-card'>
  { skill && <Modal handleCloseModal={() => {
   setSkill(null)
  }}>
      <div>
      <h6>Name</h6>
      <h2 clas>{skill.name.replaceAll('-', ' ')}</h2>
      </div>
      <div>
      <h6>Description</h6>
      <p>{skill.description}</p>
      </div>
  </Modal>}
          <div>
            <h4>
            #{getFullPokedexNumber(selectedPoke)}
            </h4>
            <h2>{name}</h2>
          </div>
          <div className='type-container'>
            {types.map((type, typeIndex) => {
                return (
                  <TypeCard key={typeIndex} 
                  type={type.type.name}/>
                )
            })}
          </div>
          <img  
          className='default-img'
          src={'./pokemon/' + getFullPokedexNumber(selectedPoke) + '.png'} 
          alt="pokey image" />

        <div className="div-container">
          {imgLIst.map((spriteUrl, spriteIndex) => {
            const imgUrl = sprites[spriteUrl]
             return (
              <img key={spriteIndex}
              src={imgUrl} 
              alt={`${name}-img-${spriteUrl}`} />
             )
          })}
        </div>
        <h3>Stats</h3>
        <div className="stats-card">
          {stats.map((statsObj, statIndex) => {
             const {stat, base_stat} = statsObj
             return (
              <div key={statIndex}
               className="stat-item">
                <p>
                  {stat.name.replaceAll('-', ' ')}
                </p>
                <h4>{base_stat}</h4>
               </div>
             )
          })}
        </div>
        <h3>Moves</h3>
        <div className="pokemon-move-grid">
          {moves.map((moveObj, moveIndex) => {
              return (
                <button key={moveIndex}
                onClick={() => {
           fetchMoveData(moveObj.move.name, moveObj.move.url)
                }} 
                className='button-card pokemon-move'>
                   <p>{moveObj.move.name.replaceAll('-', ' ')}</p>
                </button>
              )
          })}
        </div>
     </div>
  )
}

export default PokeCard