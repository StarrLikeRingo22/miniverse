import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import '../App.css'
import Planecard from './Planecard.jsx'
import TVModel from './TVModel.jsx'
import NavBar from './NavBar.jsx'
import { Planet } from './Planets.jsx'

const Scene = () => {

  const [showTV, setShowTV] = useState(false)
  const [tvPosition, setTvPosition] = useState([0, 0, 0])
  const [activePlanet, setActivePlanet] = useState(null)
  // const [activeCard, setActiveCard] = useState(null)
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

  const handleClick = (position, planetId) => {
    setTvPosition(position)
    setActivePlanet(planetId)
    setShowTV(prev => !prev)

    if (showTV && activePlanet === planetId) {
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

          <TVModel position={tvPosition} show={showTV} setShowTV={setShowTV} activePlanet={activePlanet} />
          <>
            <Planet planetId={0} position={[-2.7, 0.3, 0]} scale={[0.03, 0.03, 0.03]} onClick={(position) => handleClick(position, 0)} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Penguin */}
            <Planet planetId={1} position={[-0.85, 0.3, 0]} scale={[0.044, 0.044, 0.044]} onClick={(position) => handleClick(position, 1)} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Space */}
            <Planet planetId={2} position={[1, 0.2, 0]} scale={[0.53, 0.53, 0.53]} onClick={(position) => handleClick(position, 2)} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Earth */}
            <Planet planetId={3} position={[2.9, 0.2, 0]} scale={[0.2, 0.2, 0.2]} onClick={(position) => handleClick(position, 3)} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Fragment */}
          </>
          {/* <>
            <Planecard position={[-2.6, 0, 0]} args={[1, 1.4, 1]} onClick={(position) => handleCardClick(position, 0)} cardId={0} activeCard={activeCard} setActiveCard={setActiveCard} />
            <Planecard position={[0.9, 0, 0]} args={[1, 1.4, 1]} onClick={(position) => handleCardClick(position, 1)} cardId={1} activeCard={activeCard} setActiveCard={setActiveCard} />
            <Planecard position={[2.6, 0, 0]} args={[1, 1.4, 1]} onClick={(position) => handleCardClick(position, 2)} cardId={2} activeCard={activeCard} setActiveCard={setActiveCard} />
            <Planecard position={[-0.8, 0, 0]} args={[1, 1.4, 1]} onClick={(position) => handleCardClick(position, 3)} cardId={3} activeCard={activeCard} setActiveCard={setActiveCard} />
          </> */}
        </Canvas>
      )}

      {isMobile && (
        <div style={{ width: "100%", height: "100vh", overflow: "auto" }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <TVModel position={tvPosition} show={showTV} setShowTV={setShowTV} activePlanet={activePlanet} />
            <>
              <Planet planetId={0} position={[0, 2.4, 0]} scale={[0.033, 0.033, 0.033]} onClick={(position) => handleClick(position, 0)} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Penguin */}
              <Planet planetId={1} position={[0, 1, 0]} scale={[0.044, 0.044, 0.044]} onClick={(position) => handleClick(position, 1)} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Space */}
              <Planet planetId={2} position={[0, -0.6, 0]} scale={[0.5, 0.5, 0.5]} onClick={(position) => handleClick(position, 2)} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Earth */}
              <Planet planetId={3} position={[0, -2.4, 0]} scale={[0.25, 0.25, 0.25]} onClick={(position) => handleClick(position, 3)} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Fragment */}
            </>
          </Canvas>
        </div>
      )}


    </>
  )
}



export default Scene