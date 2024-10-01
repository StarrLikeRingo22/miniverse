import { useRef, useState } from 'react'
import { Canvas, extend, useFrame, useLoader, useThree } from "@react-three/fiber"
import './App.css'
import * as THREE from 'three'
import { shaderMaterial } from '@react-three/drei'
import { TextureLoader } from 'three/src/Three.js'

// Create a custom shader material with proper uniforms
const DistortionShaderMaterial = shaderMaterial(
  {
    texture1: null,
    texture2: null,
    displacementMap: null,
    transition: 0,
  },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  uniform sampler2D texture1;
  uniform sampler2D texture2;
  uniform sampler2D displacementMap;
  uniform float transition;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    vec4 disp = texture2D(displacementMap, uv);
    vec2 distortedPosition = vec2(uv.x + transition * (disp.r * 2.0 - 1.0), uv.y);
    vec4 _texture1 = texture2D(texture1, distortedPosition);
    vec4 _texture2 = texture2D(texture2, distortedPosition);
    vec4 finalTexture = mix(_texture1, _texture2, transition);
    gl_FragColor = finalTexture;
  }
  `
)

// Register the custom shader material with React Three Fiber
extend({ DistortionShaderMaterial })


const PlaneCard = ({ position, args }) => {
  const ref = useRef()
  const blueCard = useLoader(TextureLoader, '/img/blueCard.png')
  const dispCard = useLoader(TextureLoader, '/img/displacement/13.jpg')
  const tranCard = useLoader(TextureLoader, '/img/displacement/10.jpg')

  const orangeCard = useLoader(TextureLoader, '/img/cardOrange.png')

  const [hovered, setHover] = useState(false)
  const [flip, setFlip] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [dispFactor, setDispFactor] = useState(0) // State to control the distortion factor

  const { camera } = useThree()
  const vec = new THREE.Vector3()

  useFrame((state, delta) => {
    if (flip) {
      ref.current.rotation.y = Math.min(ref.current.rotation.y + delta * 4, Math.PI)
    } else {
      ref.current.rotation.y = Math.max(ref.current.rotation.y - delta * 4, 0)
    }

    if (zoom) {
      vec.set(position[0], position[1], position[2] + 2)
      camera.position.lerp(vec, 0.1)
    } else {
      vec.set(0, 0, 5)
      camera.position.lerp(vec, 0.1)
    }
    camera.lookAt(0, 0, 0)

    // Update dispFactor gradually on hover
    if (hovered && dispFactor < 1) {
      setDispFactor((prev) => Math.min(prev + delta, 1))
      if (dispFactor === 1) {
        setDispFactor((prev) => Math.max(prev - delta, 0))
        ref.current.material.map = orangeCard
      }

    } else if (!hovered && dispFactor > 0) {
      setDispFactor((prev) => Math.max(prev - delta, 0))
      ref.current.material.map = blueCard
    }

  })

  const handleClick = () => {
    if (zoom) {
      setFlip(false)
      setZoom(false)
    } else {
      setFlip(true)
      setZoom(true)
    }
  }

  return (
    <mesh
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={handleClick}
      ref={ref}
      position={position} side={THREE.DoubleSide}
    >
      <planeGeometry args={args} />
      <distortionShaderMaterial
        texture1={blueCard}
        texture2={orangeCard}
        displacementMap={dispCard}
        transition={dispFactor}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}


const App = () => {
  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} intensity={0.5} />
      <ambientLight intensity={0.1} />
      <PlaneCard position={[5.3, 0, 0]} args={[1, 1.4, 1, 1]}  />
      <PlaneCard position={[1.3, 0, 0]} args={[1, 1.4, 1, 1]} />
      <PlaneCard position={[-2, 0, 0]} args={[1, 1.4, 1, 1]} />
      <PlaneCard position={[-5.3, 0, 0]} args={[1, 1.4, 1, 1]} />
    </Canvas>
  )
}

export default App
