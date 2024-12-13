import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber"
import { useRef, useState } from "react"
import { TextureLoader } from "three"
import * as THREE from 'three'

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
  
  extend({ DistortionShaderMaterial })
  
  const Planecard = ({ position, args, onClick }) => {
    const ref = useRef()
    const blueCard = useLoader(TextureLoader, '/img/blueCard.png')
    const orangeCard = useLoader(TextureLoader, '/img/cardOrange.png')
    const dispCard = useLoader(TextureLoader, '/img/displacement/13.jpg')
  
    const [hovered, setHover] = useState(false)
    const [zoom, setZoom] = useState(false)
    const [dispFactor, setDispFactor] = useState(0) // distortion factor
    const { camera } = useThree()
  
    useFrame((state, delta) => {
  
    
  
  
      // Update dispFactor gradually on hover
      if (hovered && dispFactor < 1) {
        setDispFactor((prev) => Math.min(prev + delta * 2, 1))
      } else if (!hovered && dispFactor > 0) {
        setDispFactor((prev) => Math.max(prev - delta * 2, 0))
      }
    })
  
    const handleClick = () => {
      onClick(position) // pass position points to parent
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
          effectFactor={0.4} // adjust this value for stronger effects
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    )
  }


  export default Planecard