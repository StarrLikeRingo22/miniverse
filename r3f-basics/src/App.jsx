import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import './App.css'
import TVModel from './tvmodel'
import Planecard from './planecard'
import { OrbitControls } from '@react-three/drei'


const App = () => {
  const [showTV, setShowTV] = useState(false)
  const [tvPosition, setTvPosition] = useState([0, 0, 0])
  const [activeCard, setActiveCard] = useState(0) // Track the active card

  const handleCardClick = (position, cardId) => {
    setTvPosition(position)
    setActiveCard(cardId) // Set the active card when clicked
    setShowTV(prev => !prev)
  }
  

  return (
    <>
    <Canvas>
         
      <directionalLight position={[0, 0, 2]} intensity={0.5} />
      <ambientLight intensity={0.1} />
      < OrbitControls />
      { /*  only show if card is click       v */}
      <TVModel position={tvPosition} show={showTV} activeCard={activeCard} />

      <Planecard position={[-2.3, 0, 0]} args={[1, 1.4, 1, 1]} onClick={(position) => handleCardClick(position, 0)} />
      <Planecard position={[1.3, 0, 0]} args={[1, 1.4, 1, 1]} onClick={(position) => handleCardClick(position, 1)} />

      <Planecard position={[3.0, 0, 0]} args={[1, 1.4, 1, 1]} onClick={(position) => handleCardClick(position, 2)} />
      <Planecard position={[-0.5, 0, 0]} args={[1, 1.4, 1, 1]} onClick={(position) => handleCardClick(position, 4)} />
    </Canvas>
    </>
    //  <Resume />

  )
}

export default App
