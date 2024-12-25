import { shaderMaterial } from "@react-three/drei"
import { extend, useFrame, useLoader, useThree } from "@react-three/fiber"
import { act, useRef, useState } from "react"
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

const Planecard = ({ position, args, onClick, cardId, activeCard, setActiveCard }) => {

  console.log(cardId); // Debug the value of cardId

  const ref = useRef()


  
  const blueCard = useLoader(TextureLoader, '/img/blueCard.png')
  const orangeCard = useLoader(TextureLoader, '/img/cardOrange.png')
  const dispCard = useLoader(TextureLoader, '/img/displacement/13.jpg')
  
  const [hovered, setHover] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [dispFactor, setDispFactor] = useState(0) // distortion factor
  const { camera } = useThree()
  const vec = new THREE.Vector3()

  const targetPosition = useRef(new THREE.Vector3()); // Default camera target
  const originalPosition = new THREE.Vector3(0, 0, 5); // original position



  // console.log('current position', camera.position)



  const handleClick = (cardId) => {
    
    // Update the active card (for content switching)
    if (activeCard === cardId) {
      // Toggle zoom for the same card
      setZoom((prevZoom) => !prevZoom); // works zooms back out
    } else {
      // Switch to a new card
      setActiveCard(cardId); // Update active card
      setZoom(false); // Enable zoom for the new card

    }
    if (onClick) {
      onClick(position)
    }
    
  }

  useFrame((state, delta) => {

    if (zoom && ref.current) { // other objects are entering the reference and still zooming in.

     // console.log('active card', activeCard, cardId)
      //target world position to prepare for zoom
      const targetWorldPosition = new THREE.Vector3();
      ref.current.getWorldPosition(targetWorldPosition);
      // Adjust the zoom offset to target specific coordinates
      const zoomOffset = new THREE.Vector3(ref.current.position.x, targetWorldPosition.y, targetWorldPosition.z); // needs adjusting
      const targetCameraPosition = targetWorldPosition.clone().add(zoomOffset);
      // Smoothly move the camera toward the calculated position
      camera.position.lerp(targetCameraPosition, 0.1); // Need to modify these factors and zoomOffset to adjust the speed of zoom.
      // Aligns camera directly towards object
      const direction = targetPosition.current.clone().sub(camera.position).normalize();
      camera.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), direction);
    

      // Ensure the camera looks directly at the object
      // camera.position.set(targetCameraPosition.x, 0, 2) // Ensure camera stays centered on object

      // console.log('Target World Position:', targetWorldPosition);
      // console.log('Target Camera Position:', targetCameraPosition);


    } else if (!zoom) {
      // Smoothly return to the original position
      camera.position.lerp(originalPosition, 0.05);
      // Reset camera orientation to default
      const defaultDirection = new THREE.Vector3(0, 0, 0);
      camera.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, -1), defaultDirection);
    }
    // Update dispFactor gradually on hover
    if (hovered && dispFactor < 1) {
      setDispFactor((prev) => Math.min(prev + delta * 2, 1))
    } else if (!hovered && dispFactor > 0) {
      setDispFactor((prev) => Math.max(prev - delta * 2, 0))
    }
  })

  const handlePointEnter = (cardId) => {
    setHover(true); 
  
    if (cardId >= 0 && cardId < displacementTextures.length) {
     // Needs Fix: cardID undefined needs to pass value of 0-3
      setDispTexture(displacementTextures[cardId]); 
    } 
  };



  const displacementTextures = [
    useLoader(TextureLoader, `/img/disp0.jpg`),
    useLoader(TextureLoader, `/img/disp1.jpg`),
    useLoader(TextureLoader, `/img/disp2.jpg`),
    useLoader(TextureLoader, `/img/disp3.jpg`),
  ] // Needs Fix: Meant to distort images based on cardID (0-3)
  const [dispTexture, setDispTexture ] = useState(displacementTextures[0]);


  return (
    <mesh
      ref={ref}
      position={position}
      onPointerEnter={() => handlePointEnter(cardId, activeCard)}
      onPointerLeave={() => setHover(false)}
      onClick={() => handleClick(cardId)}
      activeCard={activeCard} // needs to be defined. returns undefined in UseFrame logic
      setActiveCard={setActiveCard}
    >
      <planeGeometry args={args} />
      
        <distortionShaderMaterial
          tex={blueCard}
          tex2={dispTexture}
          disp={dispCard}
          dispFactor={dispFactor}
          effectFactor={0.4}
          toneMapped={false}
          side={THREE.DoubleSide}
        />

    </mesh>
  )
}


export default Planecard