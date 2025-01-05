import { useSpring } from "@react-spring/three"
import { useLoader } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { TextureLoader, Raycaster, Vector2 } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Text } from "@react-three/drei"
import { animated } from "@react-spring/three"


const TVModel = ({ position, show, activePlanet }) => {

  const screenTexture = useLoader(TextureLoader, '/img/screen.jpg')
  const tvRef = useRef()
  const [tvModel, setTvModel] = useState(null)
  const [showTV, setShowTV] = useState(false);

  useEffect(() => {
    new GLTFLoader().load('/models/lowpoly_tv.glb', (gltf) => {
      const model = gltf.scene
      setTvModel(model)
      console.log('TV Model Structure:', model)
      // Traverse the model to find the mesh by name and apply the texture to the screen
      model.traverse((child) => {
        if (child.isMesh) {
          // Log the mesh name and material for each child
          console.log('Child Mesh:', child.name)
          console.log('Child Material:', child.material)
          if (child.name.includes('defaultMaterial_3')) {
            console.log('Found button:', child.name)
            child.userData = { name: child.name }
            // You can now apply logic to this button, like adding event listeners
          }
          
          // Check for the "lambert25G" material name and apply texture to it
          if (child.material.name === 'lambert2SG') {
            console.log('Applying texture to mesh:', child.name)
            child.material.map = screenTexture // Apply the screen texture
            child.material.needsUpdate = true  // Update the material to reflect the texture change
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
    opacity: false, // Fade in/out effect
    config: { tension: 150, friction: 26 },
    reset: true
  })

  const renderContent = () => {
    switch (activePlanet) {
      case 0:
        return (
          <>
          <Text position={[-0.15, 0.68, 0.73]} fontSize={0.12} fontStyle="underline" color="white">
            Abdalla Abdelgadir
          </Text>
          <Text position={[0, 0.2, 0.73]} fontSize={0.05} color="white">
            Phone: +1 {'('}647{')'} 607-2965{"\n\n"}
            Email: aabdelgadir@myseneca.ca{"\n\n"}
            LinkedIn: linkedin.com/in/abdalla-abdelgadir-35587b243/{"\n\n"}
            Github: github.com/StarrLikeRingo22/{"\n\n"}
          </Text>
        </>
      )
    case 1:
      return (
        <>
          <Text position={[-0.45, 0.65, 0.73]} fontSize={0.09} fontStyle="underline" color="white">
            Qualifications
          </Text>

          <Text position={[-0.55, 0.50, 0.73]} fontSize={0.06} color="white">
            Languages:
          </Text>

          <Text position={[-0.48, 0.33, 0.73]} fontSize={0.05} color="white">
            C, Bash, SQL, C++,{"\n"}Javascript,{"\n"}Typescript
          </Text>

          <Text position={[0.35, 0.50, 0.73]} fontSize={0.06} color="white">
            Software & Tools:
          </Text>

          <Text position={[0.43, 0.3, 0.73]} fontSize={0.05} color="white">
            Visual Studio, React,{"\n"}Github, Visual Paradigm,{"\n"}Figma, Microsoft Office,{"\n"}Linux
          </Text>
          <Text position={[0.30, -0.1, 0.73]} fontSize={0.06} color="white">
            Certifications:
          </Text>

          <Text position={[0.44, -0.23, 0.73]} fontSize={0.05} color="white">
            C++ LinkedIn Assessment,{"\n"}etc.
          </Text>

          <Text position={[-0.63, -0.1, 0.73]} fontSize={0.06} color="white">
            Skills:
          </Text>

          <Text position={[-0.43, -0.25, 0.73]} fontSize={0.05} color="white">
            Communication Skills, {"\n"}Critical Thinking, {"\n"}Project Management
          </Text>
        </>


      )
    case 2:
      return (
        <>
          <Text position={[-0.55, 0.7, 0.73]} fontSize={0.09} fontStyle="underline" color="white">
            Projects
          </Text>
          <Text position={[-0.6, 0.6, 0.73]} fontSize={0.04} color="white">
            Lego Website
          </Text>
          <Text position={[-0.33, 0.54, 0.73]} fontSize={0.04} fontStyle="italic" color="white">
            https://github.com/StarrLikeRingo22/web322
          </Text>

          <Text position={[-0.01, 0.46, 0.73]} fontSize={0.04} color="white">
            {"-        "}A web app for browsing, adding, editing, and deleting LEGO sets based{"\n         "} on themes and set numbers
          </Text>
          <Text position={[-0.01, 0.35, 0.73]} fontSize={0.04} color="white">
            {"-        "}Features secure user registration, login, and session management with{"\n         "} personalized user history
          </Text>
          <Text position={[-0.02, 0.24, 0.73]} fontSize={0.04} color="white">
            {"-        "}Displays LEGO sets with EJS templates, with theme-based filtering and{"\n         "} detailed set information
          </Text>

          <Text position={[-0.56, 0.16, 0.73]} fontSize={0.04} color="white">
            fuel-cost-analyzer
          </Text>
          <Text position={[-0.208, 0.11, 0.73]} fontSize={0.04} color="white">
            https://github.com/StarrLikeRingo22/fuel-cost-analyzer
          </Text>
          <Text position={[-0.045, 0.025, 0.73]} fontSize={0.04} color="white">
            {"-        "}Calculates fuel consumption and costs for a trip based on distance,{"\n         "} fuel efficiency, and fuel type.
          </Text>
          <Text position={[-0.023, -0.06, 0.73]} fontSize={0.04} color="white">
            {"-        "}Fetches up-to-date fuel prices for Canada using the RapidAPI service.
          </Text>
          <Text position={[0.002, -0.15, 0.73]} fontSize={0.04} color="white">
            {"-        "}Computes trip income and profit margin based on user-defined income{"\n         "} per kilometer
          </Text>

          <Text position={[-0.46, -0.235, 0.73]} fontSize={0.04} color="white">
            Baymax AI Assistant Model
          </Text>
          <Text position={[-0.338, -0.29, 0.73]} fontSize={0.04} color="white">
            https://github.com/noahabebe/baymax
          </Text>
          <Text position={[-0.09, -0.37, 0.73]} fontSize={0.04} color="white">
            {"-        "}Baymax includes voice recognition and continuous learning for{"\n         "} enhanced productivity
          </Text>
          <Text position={[-0.175, -0.45, 0.73]} fontSize={0.04} color="white">
            {"-        "}It integrates with Unix systems to optimize workflows
          </Text>
          <Text position={[-0.02, -0.53, 0.73]} fontSize={0.04} color="white">
            {"-        "}Emotion recognition software using TensorFlow to provide{"\n         "}personalized support and recommendations based on user emotions.
          </Text>
        </>
      )
    default:
      return (
        <>
          <Text position={[-0.45, 0.73, 0.73]} fontSize={0.09} fontStyle="underline" color="white">
            Experience
          </Text>
          <Text position={[-0.45, 0.65, 0.73]} fontSize={0.04} color="white">
            Crew Member{' (Part-Time)'}
          </Text>
          <Text position={[-0.475, 0.595, 0.73]} fontSize={0.04} fontStyle="italic" color="white">
            October 2023 - Ongoing
          </Text>
          <Text position={[-0.502, 0.54, 0.73]} fontSize={0.04} color="white">
            McDonald's Canada
          </Text>
          <Text position={[-0.06, 0.49, 0.73]} fontSize={0.04} color="white">
            {"-        "}Guaranteed customer satisfaction by quickly delivering orders
          </Text>
          <Text position={[-0.037, 0.415, 0.73]} fontSize={0.04} color="white">
            {"-        "}Kept workstation and equipment clean, organized, sanitized and{"\n         "}sufficiently stocked
          </Text>
          <Text position={[-0.023, 0.31, 0.73]} fontSize={0.04} color="white">
            {"-        "}Measured, mixed and cooked ingredients following directions and{"\n         "}nutritional restrictions.
          </Text>

          <Text position={[-0.53, 0.232, 0.73]} fontSize={0.04} color="white">
            Election Assistant
          </Text>
          <Text position={[-0.49, 0.175, 0.73]} fontSize={0.04} fontStyle="italic" color="white">
            March 2023 - July 2023
          </Text>
          <Text position={[-0.55, 0.125, 0.73]} fontSize={0.04} color="white">
            City Of Toronto
          </Text>
          <Text position={[0.01, 0.05, 0.73]} fontSize={0.04} color="white">
            {"-        "}Computed, record and proofread data and other information, such as{"\n         "}records, and reports
          </Text>
          <Text position={[-0.06, -0.055, 0.73]} fontSize={0.04} color="white">
            {"-        "}Compiled, copied, sorted and filed office documents, business{"\n         "}transactions, and other activities
          </Text>
          <Text position={[-0.04, -0.16, 0.73]} fontSize={0.04} color="white">
            {"-        "}Operated office machines, such as photocopiers and scanners,{"\n         "}facsimile machines, voice mail systems, and personal computers
          </Text>
          <Text position={[-0.54, -0.24, 0.73]} fontSize={0.04} color="white">
            Project Manager
          </Text>
          <Text position={[-0.41, -0.29, 0.73]} fontSize={0.04} fontStyle="italic" color="white">
            August 2020 - Sepetember 2023
          </Text>
          <Text position={[-0.48, -0.34, 0.73]} fontSize={0.04} color="white">
            CSP Business Solutions
          </Text>
          <Text position={[0, -0.39, 0.73]} fontSize={0.04} color="white">
            {"-        "}Used Microsoft Word, PowerPoint, Excel, and Adobe Acrobat Reader
          </Text>
          <Text position={[-0.042, -0.45, 0.73]} fontSize={0.04} color="white">
            {"-        "}Organized & filed high profile case files for law firms in Toronto
          </Text>
          <Text position={[0.023, -0.54, 0.73]} fontSize={0.04} color="white">
            {"-        "}Managed large digitalization projects to assist with property and asset{"\n         "}cases using Kyocera and Ricohscan
          </Text>
        </>
        )
    }
  }

  return (
    tvModel && (
      <animated.group ref={tvRef} position={position} show={showTV} {...springProps}  >
        <primitive object={tvModel} />
        <mesh position={[0, 0, 0]}  >
        <planeGeometry args={[1, 1]} />
          <meshStandardMaterial map={screenTexture}  />
            {renderContent()}
        </mesh>
      </animated.group>
    )
  )
}

export default TVModel