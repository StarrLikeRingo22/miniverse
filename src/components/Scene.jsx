import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import '../App.css'
import Planecard from './Planecard.jsx'
import TVModel from './TVModel.jsx'
import NavBar from './NavBar.jsx'

const Scene = () => {

  const [showTV, setShowTV] = useState(false)
  const [tvPosition, setTvPosition] = useState([0, 0, 0])
  const [activeCard, setActiveCard] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile devices using user-agent
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      setIsMobile(
        /android|ipad|iphone|ipod|windows phone|mobile/i.test(userAgent)
      );
    };
    checkMobile();
  }, []);

  const handleCardClick = (position, cardId) => {
    setTvPosition(position)
    setActiveCard(cardId)
    setShowTV(prev => !prev)
    if (showTV && activeCard === cardId) {
      setShowTV(false)
    } else {
      setShowTV(true)
    }
  }

  return (
    <>
      <NavBar />
      {!isMobile && (
        <Canvas>
          <directionalLight position={[3, 4, 4]} intensity={1.5} />
          <ambientLight intensity={0.2} />
          { /*  only show if card is click       v */}
          <TVModel position={tvPosition} show={showTV} activeCard={activeCard} />
          <>
            <Planecard position={[-2.6, 0, 0]} args={[1, 1.4, 1]} onClick={(position) => handleCardClick(position, 0)} cardId={0} activeCard={activeCard} setActiveCard={setActiveCard} />
            <Planecard position={[0.9, 0, 0]} args={[1, 1.4, 1]} onClick={(position) => handleCardClick(position, 1)} cardId={1} activeCard={activeCard} setActiveCard={setActiveCard} />
            <Planecard position={[2.6, 0, 0]} args={[1, 1.4, 1]} onClick={(position) => handleCardClick(position, 2)} cardId={2} activeCard={activeCard} setActiveCard={setActiveCard} />
            <Planecard position={[-0.8, 0, 0]} args={[1, 1.4, 1]} onClick={(position) => handleCardClick(position, 3)} cardId={3} activeCard={activeCard} setActiveCard={setActiveCard} />
          </>
        </Canvas>
      )}

      {isMobile && (
        <div style={{ width: "100%", height: "100vh", overflow: "auto" }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <TVModel position={tvPosition} show={showTV} activeCard={activeCard} />
            <>
              <mesh>
                <Planecard position={[0, 2.2, 0]} args={[1, 1.4]} onClick={(position) => handleCardClick(position, 0)} cardId={0} activeCard={activeCard} setActiveCard={setActiveCard} />
                <Planecard position={[0, 0.65, 0]} args={[1, 1.4]} onClick={(position) => handleCardClick(position, 1)} cardId={1} activeCard={activeCard} setActiveCard={setActiveCard} />
                <Planecard position={[0, -0.9, 0]} args={[1, 1.4]} onClick={(position) => handleCardClick(position, 2)} cardId={2} activeCard={activeCard} setActiveCard={setActiveCard} />
                <Planecard position={[0, -2.45, 0]} args={[1, 1.4]} onClick={(position) => handleCardClick(position, 3)} cardId={3} activeCard={activeCard} setActiveCard={setActiveCard} />
              </mesh>
            </>
          </Canvas>
        </div>
      )}
    </>
  )
}



export default Scene