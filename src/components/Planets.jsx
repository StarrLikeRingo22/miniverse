import React, { act, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three'


const planetModels = [
  '/models/penguin_planet.glb',
  '/models/space_planet.glb',
  '/models/earth_poly.glb',
  '/models/floating_island.glb',
];

export function Planet({ position, scale, onClick, planetId, activePlanet, setActivePlanet, ...props }) {
  // Load the GLTF model
  const modelPath = planetModels[planetId % planetModels.length];
  const { scene, nodes, materials } = useGLTF(modelPath)
  const [hovered, setHover] = useState(false)
  const [zoom, setZoom] = useState(false)
  const { camera } = useThree()
  const ref = useRef()
  const originalPosition = new THREE.Vector3(0, 0, 5) // original position


  useFrame((state, delta) => {
    ref.current.rotation.y = Math.max(ref.current.rotation.y + delta * 1)
    if (activePlanet === planetId) {
      if (zoom && ref.current) {
        const targetWorldPosition = new THREE.Vector3()
        ref.current.getWorldPosition(targetWorldPosition)
        const zoomOffset = new THREE.Vector3(0, 0, 3) // Adjust offset as needed
        const targetCameraPosition = targetWorldPosition.clone().add(zoomOffset)
        camera.position.lerp(targetCameraPosition, 0.1) // Smooth camera transition
        const direction = targetWorldPosition.clone().sub(camera.position).normalize()
        camera.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), direction)
      } else if (!zoom) {
        camera.position.lerp(originalPosition, 0.05)    // Smoothly return to the original position
        const defaultDirection = new THREE.Vector3(0, 0, 0)       // Reset camera orientation to default
        camera.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), defaultDirection)
      }
    }
  })

  const handlePointEnter = (planetId, activePlanet) => {
    console.log('Planet:', activePlanet, 'ID', planetId)
    setHover(true);
  };

  const handleClick = (planetId) => {
    if (activePlanet === planetId) {
      setZoom((prevZoom) => !prevZoom) 
    } else {
      setActivePlanet(planetId) 
      setZoom(true) 
    }
    if (onClick) {
      onClick(position)
    }
  }

  return (
    <primitive object={scene}
      {...props}
      ref={ref}
      position={position}
      scale={scale}
      onPointerEnter={() => handlePointEnter(planetId, activePlanet)}
      onPointerLeave={() => setHover(false)}
      onClick={() => handleClick(planetId)}
      activePlanet={activePlanet}
      setActivePlanet={setActivePlanet}
    />
  )
}

