import { useState, useEffect, useRef } from 'react'
import { Canvas, useLoader, extend, useFrame, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { animated, useSpring } from '@react-spring/three'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'


const DistortionShaderMaterial = shaderMaterial(
  {
    tex: null,
    tex2: null,
    disp: null,
    _rot: 0,
    dispFactor: 0,
    effectFactor: 0.4 
  },
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  `
  varying vec2 vUv;
  uniform sampler2D tex;
  uniform sampler2D tex2;
  uniform sampler2D disp;
  uniform float _rot;
  uniform float dispFactor;
  uniform float effectFactor;
  void main() {
    vec2 uv = vUv;
    vec4 disp = texture2D(disp, uv);
    vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r * effectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r * effectFactor), uv.y);
    vec4 _texture = texture2D(tex, distortedPosition);
    vec4 _texture2 = texture2D(tex2, distortedPosition2);
    vec4 finalTexture = mix(_texture, _texture2, dispFactor);
    gl_FragColor = finalTexture;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
  `
)



// Register the custom shader material with React Three Fiber
extend({ DistortionShaderMaterial })

const PlaneCard = ({ position, args, onClick }) => {
  const ref = useRef()
  const blueCard = useLoader(TextureLoader, '/img/blueCard.png')
  const orangeCard = useLoader(TextureLoader, '/img/cardOrange.png')
  const dispCard = useLoader(TextureLoader, '/img/displacement/13.jpg')

  const [hovered, setHover] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [dispFactor, setDispFactor] = useState(0) // State to control the distortion factor
  const { camera } = useThree()
  const vec = new THREE.Vector3()

  useFrame((state, delta) => {

  


    // Update dispFactor gradually on hover
    if (hovered && dispFactor < 1) {
      setDispFactor((prev) => Math.min(prev + delta * 2, 1))
    } else if (!hovered && dispFactor > 0) {
      setDispFactor((prev) => Math.max(prev - delta * 2, 0))
    }
  })

  const handleClick = () => {
    onClick(position) // When card is clicked, pass position to parent
  }

  return (
    <mesh
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={handleClick}
      ref={ref}
      position={position}
    >
      <planeGeometry args={args} />
      <distortionShaderMaterial
        tex={blueCard}
        tex2={orangeCard}
        disp={dispCard}
        dispFactor={dispFactor}
        effectFactor={0.4} // You can adjust this value for stronger effects
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// TVModel component
const TVModel = ({ position, show }) => {
  const [tvModel, setTvModel] = useState(null)
  const tvRef = useRef()

  useEffect(() => {
    new GLTFLoader().load('/src/models/lowpoly_tv.glb', (gltf) => {
      setTvModel(gltf.scene)
    })
  }, [])

    // Ensure the TV faces the camera and is correctly positioned when it's shown
    useEffect(() => {
      if (tvRef.current) {
       
        tvRef.current.lookAt(0, 0, 0) // Ensure it faces the camera (or origin)
      }
    }, [position, show]) // Run when position or show state changes
    
  const springProps = useSpring({
    position: position, // Maintain the target card position
    scale: show ? [1, 1, 1] : [0, 0, 0], // Shrink effect when disappearing
    opacity: show ? 1 : 0, // Fade in/out effect
    config: { tension: 170, friction: 26 }
  })

  return (
    tvModel && (
      <animated.group ref={tvRef} {...springProps}>
        <primitive object={tvModel} />
      </animated.group>
    )
  )
}

// Main App component
const App = () => {
  const [showTV, setShowTV] = useState(false)
  const [tvPosition, setTvPosition] = useState([0, 0, 0])

  const handleCardClick = (position) => {
    // Set TV position and toggle visibility
    setTvPosition(position)
    setShowTV(prev => !prev) // Toggle TV visibility
  }

  return (
    <Canvas>
      <directionalLight position={[0, 0, 2]} intensity={0.5} />
      <ambientLight intensity={0.1} />

      {/* Only show TV when showTV is true */}
      <TVModel position={tvPosition} show={showTV} />

      <PlaneCard position={[-2.3, 0, 0]} args={[1, 1.4, 1, 1]} onClick={handleCardClick} />
      <PlaneCard position={[1.3, 0, 0]} args={[1, 1.4, 1, 1]} onClick={handleCardClick} />
      <PlaneCard position={[-0.5, 0, 0]} args={[1, 1.4, 1, 1]} onClick={handleCardClick} />
    </Canvas>
  )
}

export default App
