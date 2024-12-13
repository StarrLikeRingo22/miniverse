import { useSpring } from "@react-spring/three"
import { useLoader } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { TextureLoader } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import data from '../package.json'
import { Text } from "@react-three/drei"
import { animated } from "@react-spring/three"




const TVModel = ({ position, show, activeCard  }) => {
  const [tvModel, setTvModel] = useState(null)
  const tvRef = useRef()
  const skills = data.Qualifications
  const project = data.projects

  const screenTexture = useLoader(TextureLoader, '/img/screen.jpg')



  useEffect(() => {
    new GLTFLoader().load('/src/models/lowpoly_tv.glb', (gltf) => {
      const model = gltf.scene
      setTvModel(model)

      console.log('TV Model Structure:', model)
      // Traverse the model to find the mesh by name and apply the texture to the screen
      model.traverse((child) => {
        if (child.isMesh) {
          // Log the mesh name and material for each child
          console.log('Child Mesh:', child.name);
          console.log('Child Material:', child.material);

          // Check for the "lambert25G" material name and apply texture to it
          if (child.material.name === 'lambert2SG') {
            console.log('Applying texture to mesh:', child.name);
            child.material.map = screenTexture; // Apply the screen texture
            child.material.needsUpdate = true;  // Update the material to reflect the texture change
          }
        }
      })

      // Set initial rotation
      model.rotation.set(0, Math.PI * 1.5, 0)
    })
  }, [screenTexture])

  const springProps = useSpring({
    position: position, // Maintain the target card position
    scale: show ? [1, 1, 1] : [0, 0, 0], // Shrink effect when disappearing
    opacity: show ? 1 : 0, // Fade in/out effect
    config: { tension: 170, friction: 26 }

  })

  const renderContent = () => {
    switch (activeCard) {
      case 0:
        return (
          <>
            <Text position={[0, 0.2, 0.8]} fontSize={0.09} color="white">
              Qualification 1: React.js
            </Text>
            <Text position={[0, 0.1, 0.8]} fontSize={0.08} color="white">
              Skill: JavaScript, HTML, CSS
            </Text>
          </>
        )
      case 1:
        return (
          <>
            <Text position={[0, 0.2, 0.8]} fontSize={0.09} color="white">
              Project 1: Portfolio Website
            </Text>
            <Text position={[0, 0.1, 0.8]} fontSize={0.08} color="white">
              Technologies: React, Three.js, Node.js
            </Text>
          </>
        )
      case 2:
        return (
          <>
            <Text position={[0, 0.2, 0.8]} fontSize={0.09} color="white">
              Qualification 2: Node.js
            </Text>
            <Text position={[0, 0.1, 0.8]} fontSize={0.08} color="white">
              Skill: Express, MongoDB, API Design
            </Text>
          </>
        )
      case 3:
        return (
          <>
            <Text position={[0, 0.2, 0.8]} fontSize={0.09} color="white">
              Project 2: E-commerce App
            </Text>
            <Text position={[0, 0.1, 0.8]} fontSize={0.08} color="white">
              Technologies: React, Redux, Firebase
            </Text>
          </>
        )
      default:
        return (
          <Text position={[0, 0.2, 0.8]} fontSize={0.09} color="white">
            No data available.
          </Text>
        )
    }
  }

  return (
    tvModel && (
      <animated.group ref={tvRef} position={position} {...springProps}>
        <primitive object={tvModel} />
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial map={screenTexture} />
          
          {/* Render the content based on the active card */}
          {renderContent()}
        </mesh>
      </animated.group>
    )
  )
}

export default TVModel