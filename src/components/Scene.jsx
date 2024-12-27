import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import '../App.css'
import Planecard from './Planecard.jsx'
import TVModel from './TVModel.jsx'
import NavBar from './NavBar.jsx'
import Mobile from './Mobile.jsx'


const Scene = () => {

  const [showTV, setShowTV] = useState(false)
  const [tvPosition, setTvPosition] = useState([0, 0, 0])
  const [activeCard, setActiveCard] = useState(null) // Track the active card
  const [isMobile, setIsMobile] = useState(false)


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Threshold for mobile devices
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleCardClick = (position, cardId) => {
    setTvPosition(position)
    setActiveCard(cardId) // Set the active card when clicked
    setShowTV(prev => !prev)
    if (showTV && activeCard === cardId) {
      setShowTV(false) // Hide TV (spring back in)
    } else {
      setShowTV(true)  // Show TV (spring out)
    }
  }

  const cardSize = isMobile ? [0.5, 0.7, 0.5] : [1, 1.4, 1, 1]

  console.log('TV positioning:', tvPosition)

  return (
    <>
    <NavBar />
    <Canvas>
      <directionalLight position={[3, 4, 4.5]} intensity={1.5} />
      <ambientLight intensity={0.2} />
      { /*  only show if card is click       v */}
      <TVModel position={tvPosition} show={showTV} activeCard={activeCard} />
      

      {isMobile ? (
          <Mobile
            handleCardClick={handleCardClick}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
          />
        ) : (
          // Render the desktop layout if not on mobile
          <>

      <Planecard position={[-2.6, 0, 0]} args={cardSize} onClick={(position) => handleCardClick(position, 0)} cardId={0} activeCard={activeCard} setActiveCard={setActiveCard} />
      <Planecard position={[0.9, 0, 0]} args={cardSize} onClick={(position) => handleCardClick(position, 1)} cardId={1} activeCard={activeCard} setActiveCard={setActiveCard} />
      <Planecard position={[2.6, 0, 0]} args={cardSize} onClick={(position) => handleCardClick(position, 2)} cardId={2} activeCard={activeCard} setActiveCard={setActiveCard} />
      <Planecard position={[-0.8, 0, 0]} args={cardSize} onClick={(position) => handleCardClick(position, 3)} cardId={3} activeCard={activeCard} setActiveCard={setActiveCard} />
          </>
        )}
      </Canvas>
    </>
  )
}

export default Scene

