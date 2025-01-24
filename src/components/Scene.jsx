import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import '../App.css'
import NavBar from './NavBar.jsx'
import Phone from './Phone.jsx'
import { Planet } from './Planets.jsx'
import { ZoomProvider } from './ZoomProvider.jsx'
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Scene = () => {

  const [showPhone, setShowPhone] = useState(null)
  const [activePhone, setActivePhone] = useState(false)
  const [phonePosition, setPhonePosition] = useState([0, 0, 0])
  const [activePlanet, setActivePlanet] = useState(null)
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

  const handleClick = (position, id, type) => {
    setPhonePosition(position);
    if (type === "planet") {
      setActivePlanet(id);
      setShowPhone(true); 
      if (activePlanet === id && showPhone) {
        setShowPhone(false);
      } else {
        setActivePlanet(id);
        setShowPhone(true);
      }
      
    } else if (type === "phone") {
      setActivePhone(id);
      setShowPhone((prev) => {
        if (prev || activePhone === id) {
          return false; 
        }
        return prev; 
      });
    }
  }
   
  

  return (
    <>
      <NavBar />
      {!isMobile && (
        <Canvas style={{width: "100%", height: `100vh`, position: `absolute`}}>

          <directionalLight position={[9, -5, 10]} intensity={0.5} />
          <ambientLight intensity={1.5} />
          <ZoomProvider>

            <Phone position={phonePosition} show={showPhone} setShowPhone={setShowPhone} activePhone={activePhone} setActivePhone={setActivePhone} onClick={(position) => handleClick(position, "lowPolyPhone", "phone")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} />

            <>
              <Planet planetId={0} position={[-4, 0.45, 0]} scale={[0.045, 0.045, 0.045]} onClick={(position) => handleClick(position, 0, "planet")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* King */}

              <Planet planetId={1} position={[-1.7, 0.3, 0]} scale={[0.032, 0.032, 0.032]} onClick={(position) => handleClick(position, 1, "planet")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Earth */}
              <Planet planetId={2} position={[0, 0.35, 0]} scale={[0.04, 0.04, 0.04]} onClick={(position) => handleClick(position, 2, "planet")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Space */}
              <Planet planetId={3} position={[1.5, 0.3, 0]} scale={[0.02, 0.02, 0.02]} onClick={(position) => handleClick(position, 3, "planet")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Penguin */}
              <Planet planetId={4} position={[3.4, 0.2, 0]} scale={[0.15, 0.15, 0.15]} onClick={(position) => handleClick(position, 4, "planet")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Alien */}
            </>

          </ZoomProvider>
          <EffectComposer>

            <Bloom luminanceThreshold={0.3} luminanceSmoothing={1} intensity={0.5} />
          </EffectComposer>
        </Canvas>
      )}

      {isMobile && (
        <div style={{ width: "100%", height: "100vh", overflow: "auto" }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <ZoomProvider>

            <Phone position={phonePosition} show={showPhone} setShowPhone={setShowPhone} activePhone={activePhone} setActivePhone={setActivePhone} onClick={(position) => handleClick(position, "lowPolyPhone", "phone")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} />
              <>
                <Planet planetId={0} position={[0, 2.45, 0]} scale={[0.04, 0.04, 0.04]} onClick={(position) => handleClick(position, 0, "planet")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* King */}
                <Planet planetId={1} position={[0, 1, 0]} scale={[0.024, 0.024, 0.024]} onClick={(position) => handleClick(position, 1, "planet")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Penguin */}
                <Planet planetId={2} position={[0, -0.2, 0]} scale={[0.03, 0.03, 0.03]} onClick={(position) => handleClick(position, 2, "planet")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Space */}
                <Planet planetId={3} position={[0, -1.3, 0]} scale={[0.02, 0.02, 0.02]} onClick={(position) => handleClick(position, 3, "planet")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Rocky */}
                <Planet planetId={4} position={[0, -2.6, 0]} scale={[0.1, 0.1, 0.1]} onClick={(position) => handleClick(position, 4, "planet")} activePlanet={activePlanet} setActivePlanet={setActivePlanet} /> { /* Alien */}

              </>
            </ZoomProvider>
            <EffectComposer>

              <Bloom luminanceThreshold={0.3} luminanceSmoothing={1} intensity={0.5} />
            </EffectComposer>
          </Canvas>
        </div>
      )}


    </>
  )
}



export default Scene