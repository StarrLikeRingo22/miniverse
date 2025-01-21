import React, { act, useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three'
import { useZoom } from './ZoomProvider';
import '../App.css'

const planetModels = [
  '/models/king_planet.glb',
  '/models/penguin_planet.glb',
  '/models/space_planet.glb',
  '/models/rocky_planet.glb',
  '/models/alien_planet.glb',
];

const planetNames = [
  "Contact Information",
  "Qualifications",
  "Projects",
  "Experience",
  "Education",
]

export function Planet({ position, scale, onClick, planetId, activePlanet, setActivePlanet, ...props }) {
  const modelPath = planetModels[planetId % planetModels.length];
  const namePath = planetNames[planetId % planetModels.length];

  const { scene, nodes, materials } = useGLTF(modelPath)
  const [hovered, setHover] = useState(false)
  const { zoom, setZoom } = useZoom();
  const { camera } = useThree()
  const ref = useRef()
  const originalPosition = new THREE.Vector3(0, 0, 5) // original position


  useFrame((state, delta) => {
    ref.current.rotation.y = Math.max(ref.current.rotation.y + delta * 1)
    if (activePlanet === planetId) {
      if (zoom && ref.current) {
        const targetWorldPosition = new THREE.Vector3()
        ref.current.getWorldPosition(targetWorldPosition)
        const zoomOffset = new THREE.Vector3(0, 0, 4) // Adjust offset as needed
        const targetCameraPosition = targetWorldPosition.clone().add(zoomOffset)
        camera.position.lerp(targetCameraPosition, 0.1) // Smooth camera transition
        const direction = targetWorldPosition.clone().sub(camera.position).normalize()
        camera.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), direction)
      } else if (!zoom || !ref.current) {
        camera.position.lerp(originalPosition, 0.1)    // Smoothly return to the original position
        const defaultDirection = new THREE.Vector3(0, 0, 0)       // Reset camera orientation to default
        camera.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), defaultDirection)
      }
    }
  })

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.castShadow = false;
      child.material.receiveShadow = false;
    }
  });


  useEffect(() => {
    const tooltip = document.createElement("span");
    tooltip.id = "hover-tooltip";
    document.body.appendChild(tooltip);

    return () => {
      document.body.removeChild(tooltip);
    };
  }, []);

  const handlePointEnter = (e) => {
    if (activePlanet === planetId) return;

    setHover(true);
    const tooltip = document.getElementById("hover-tooltip");

    if (hovered) {
      tooltip.style.display = "block";
      tooltip.style.left = '${mousePos[0]}px'
      tooltip.style.top = '${mousePos[1]}px'
      tooltip.textContent = namePath;
      tooltip.style.left = `${e.clientX + 10}px`;
      tooltip.style.top = `${e.clientY + 10}px`;
      tooltip.textContent = namePath;
      document.body.style.cursor = "pointer";


    }
  };

  const handlePointerMove = (e) => {
    const tooltip = document.getElementById("hover-tooltip");
    if (tooltip && hovered) {
      const smoothPosition = () => {
        tooltip.style.left = `${e.clientX + 10}px`;
        tooltip.style.top = `${e.clientY + 10}px`;
        requestAnimationFrame(smoothPosition); // Ensures smooth movement
      };
      smoothPosition();
    }
  };

  const handlePointerLeave = () => {
    setHover(false);

    const tooltip = document.getElementById("hover-tooltip");
    if (tooltip) {
      tooltip.style.display = "none";
      tooltip.textContent = "";
      document.body.style.cursor = "default";
    }
  }
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
      tvId="lowPolyTV"
      pointerEvents={activePlanet === planetId ? "none" : "auto"}
      onPointerEnter={(e) => handlePointEnter(e)}
      onPointerMove={(e) => handlePointerMove(e)}
      onPointerLeave={() => handlePointerLeave()}
      onClick={() => handleClick(planetId)}
      activePlanet={activePlanet}
      setActivePlanet={setActivePlanet}
    />
  )
}

