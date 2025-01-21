import { useSpring } from "@react-spring/three"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import { TextureLoader, Raycaster, Vector2 } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { Text } from "@react-three/drei"
import { animated } from "@react-spring/three"
import '../App.css'
import { useZoom } from "./ZoomProvider"

const Phone = ({ position, show, onClick, activePhone, setActivePhone, activePlanet, setActivePlanet }) => {

  const screenTexture = useLoader(TextureLoader, '/img/blueCard.png')
  const phoneRef = useRef()
  const [phoneModel, setPhoneModel] = useState(null)
  const [showPhone, setShowPhone] = useState(false);
  const [hovered, setHover] = useState(false)
  const [phoneClicked, setPhoneClicked] = useState(false);
  const { zoom, setZoom } = useZoom();


  useEffect(() => {
    new GLTFLoader().load('/models/lowpoly_phone.glb', (gltf) => {
      const model = gltf.scene
      setPhoneModel(model)
      console.log('Phone Model Structure:', model)
      // Traverse the model to find the mesh by name and apply the texture to the screen
      model.traverse((child) => {
        if (child.isMesh) {
          // Log the mesh name and material for each child
          console.log('Child Mesh:', child.name)
          console.log('CHild material:', child.material.name)
          if (child.material.name === 'Material.001') { //screen
            console.log('Applying texture to mesh:', child.name)
            child.material.map = screenTexture // Apply the screen texture

            child.material.needsUpdate = true  // Update the material to reflect the texture change
          }


        }
        model.rotation.set(0, 0.7, 0)
        model.position.set(0, 0, 1)

      })
      // Create the tooltip element dynamically
      const tooltip = document.createElement("span");
      tooltip.id = "phone-tooltip";
      document.body.appendChild(tooltip);

      return () => {
        // Clean up the tooltip on unmount
        document.body.removeChild(tooltip);
      };

    })
  }, [screenTexture])

  const springProps = useSpring({
    position: position, // Maintain the target position
    scale: show || showPhone ? [1, 1, 1] : [0, 0, 0], // Shrink effect when disappearing
    opacity: hovered ? 1 : 0.5,
    config: { tension: 190, friction: 26 },
    reset: true

  })

  const renderContent = () => {
    switch (activePlanet) {
      case 0:
        return (
          <>
            <Text position={[-0.1, 1.3, 1.08]} fontSize={0.15} fontStyle="underline" color="silver">
              Abdalla Abdelgadir
            </Text>
            <Text position={[-0.25, 0.8, 1.08]} fontSize={0.07} color="silver">
              Phone: +1 {'('}647{')'} 607-2965{"\n\n"}
              Email: aabdelgadir@myseneca.ca{"\n\n"}

            </Text>
            <Text position={[-0.01, 0.41, 1.08]} fontSize={0.07} color="silver">

              linkedin.com/in/abdalla-abdelgadir-35587b243/{"\n\n"}
              github.com/StarrLikeRingo22/{"\n\n"}
            </Text>
          </>
        )
      case 1:
        return (
          <>
            <Text position={[-0.3, 1.3, 1.08]} fontSize={0.15} fontStyle="underline" color="silver">
              Qualifications
            </Text>

            <Text position={[-0.55, 1, 1.08]} fontSize={0.08} color="silver">
              Languages:
            </Text>

            <Text position={[-0.48, 0.78, 1.08]} fontSize={0.06} color="silver">
              C, Bash, SQL, C++,{"\n"}Javascript,{"\n"}Typescript
            </Text>

            <Text position={[0.35, 1, 1.08]} fontSize={0.08} color="silver">
              Software & Tools:
            </Text>

            <Text position={[0.43, 0.74, 1.08]} fontSize={0.06} color="silver">
              Visual Studio, React,{"\n"}Github, Visual Paradigm,{"\n"}Figma, Microsoft Office,{"\n"}Linux
            </Text>
            <Text position={[0.30, 0.3, 1.08]} fontSize={0.08} color="silver">
              Certifications:
            </Text>

            <Text position={[0.44, 0.12, 1.08]} fontSize={0.06} color="silver">
              C++ LinkedIn Assessment,{"\n"}etc.
            </Text>

            <Text position={[-0.65, 0.3, 1.08]} fontSize={0.08} color="silver">
              Skills:
            </Text>

            <Text position={[-0.43, 0.08, 1.08]} fontSize={0.06} color="silver">
              Communication Skills, {"\n"}Critical Thinking, {"\n"}Project Management
            </Text>
          </>


        )
      case 2:
        return (
          <>
            <Text position={[-0.53, 1.35, 1.08]} fontSize={0.15} fontStyle="underline" color="silver">
              Projects
            </Text>
            <Text position={[-0.61, 1.15, 1.08]} fontSize={0.06} color="silver">
              Lego Website
            </Text>
            <Text position={[-0.3, 1.05, 1.08]} fontSize={0.05} fontStyle="italic" color="silver">
              https://github.com/StarrLikeRingo22/web322
            </Text>

            <Text position={[-0.03, 0.92, 1.08]} fontSize={0.05} color="silver">
              {"-        "}A web app for browsing, adding, editing, and deleting LEGO{"\n         "}sets based on themes and set numbers
            </Text>
            <Text position={[-0.12, 0.76, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Features secure user registration, login, and session{"\n         "}management with personalized user history
            </Text>
            <Text position={[-0.06, 0.6, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Displays LEGO sets with EJS templates, with theme-based{"\n         "}filtering and detailed set information
            </Text>

            <Text position={[-0.55, 0.45, 1.08]} fontSize={0.06} color="silver">
              fuel-cost-analyzer
            </Text>
            <Text position={[-0.19, 0.36, 1.08]} fontSize={0.05} fontStyle="italic" color="silver">
              https://github.com/StarrLikeRingo22/fuel-cost-analyzer
            </Text>
            <Text position={[-0.06, 0.24, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Calculates fuel consumption and costs for a trip based on{"\n         "} distance, fuel efficiency, and fuel type.
            </Text>
            <Text position={[-0.023, 0.08, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Fetches up-to-date fuel prices for Canada using the RapidAPI{"\n         "}service.
            </Text>
            <Text position={[-0.145, -0.07, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Computes trip income and profit margin based on{"\n         "}user-defined income per kilometer
            </Text>

            <Text position={[-0.42, -0.22, 1.08]} fontSize={0.06} color="silver">
              Baymax AI Assistant Model
            </Text>
            <Text position={[-0.36, -0.32, 1.08]} fontSize={0.05} fontStyle="italic" color="silver">
              https://github.com/noahabebe/baymax
            </Text>
            <Text position={[-0.04, -0.45, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Baymax includes voice recognition and continuous learning{"\n         "}for enhanced productivity
            </Text>
            <Text position={[-0.113, -0.58, 1.08]} fontSize={0.05} color="silver">
              {"-        "}It integrates with Unix systems to optimize workflows
            </Text>
            <Text position={[-0.055, -0.75, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Emotion recognition software using TensorFlow to provide{"\n         "}personalized support and recommendations based on{"\n         "}user emotions.
            </Text>
          </>
        )
      case 3:
        return (
          <>
            <Text position={[-0.4, 1.35, 1.08]} fontSize={0.15} fontStyle="underline" color="silver">
              Experience
            </Text>
            <Text position={[-0.44, 1.15, 1.08]} fontSize={0.06} color="silver">
              Crew Member{' (Part-Time)'}
            </Text>
            <Text position={[-0.475, 1.05, 1.08]} fontSize={0.06} fontStyle="italic" color="silver">
              October 2023 - Ongoing
            </Text>
            <Text position={[-0.502, 0.95, 1.08]} fontSize={0.06} color="silver">
              McDonald's Canada
            </Text>
            <Text position={[-0.001, 0.85, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Guaranteed customer satisfaction by quickly delivering orders
            </Text>
            <Text position={[-0.025, 0.73, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Kept workstation and equipment clean, organized, sanitized{"\n         "}and sufficiently stocked
            </Text>
            <Text position={[-0.13, 0.58, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Measured, mixed and cooked ingredients following{"\n         "}directions and nutritional restrictions.
            </Text>

            <Text position={[-0.543, 0.42, 1.08]} fontSize={0.06} color="silver">
              Election Assistant
            </Text>
            <Text position={[-0.485, 0.32, 1.08]} fontSize={0.06} fontStyle="italic" color="silver">
              March 2023 - July 2023
            </Text>
            <Text position={[-0.58, 0.22, 1.08]} fontSize={0.06} color="silver">
              City Of Toronto
            </Text>
            <Text position={[-0.16, 0.08, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Computed, record and proofread data and other{"\n         "}information, such as records, and reports
            </Text>
            <Text position={[-0.113, -0.07, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Compiled, copied, sorted and filed office documents,{"\n         "}business transactions, and other activities
            </Text>
            <Text position={[-0.114, -0.255, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Operated office machines, such as photocopiers and{"\n         "}scanners, facsimile machines, voice mail systems,{"\n         "}and personal computers
            </Text>
            <Text position={[-0.56, -0.43, 1.08]} fontSize={0.06} color="silver">
              Project Manager
            </Text>
            <Text position={[-0.37, -0.52, 1.08]} fontSize={0.06} fontStyle="italic" color="silver">
              August 2020 - Sepetember 2023
            </Text>
            <Text position={[-0.47, -0.61, 1.08]} fontSize={0.06} color="silver">
              CSP Business Solutions
            </Text>
            <Text position={[-0.006, -0.74, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Used Microsoft Word, PowerPoint, Excel, and Adobe Acrobat{"\n         "}Reader
            </Text>
            <Text position={[-0.07, -0.885, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Organized & filed high profile case files for law firms in{"\n         "}Toronto
            </Text>
            <Text position={[-0.01, -1.035, 1.08]} fontSize={0.05} color="silver">
              {"-        "}Managed large digitalization projects to assist with property{"\n         "}and asset cases using Kyocera and Ricohscan
            </Text>
          </>
        )
      default:
        return (
          <>
            <Text position={[0, 1, 1.08]} fontSize={0.08} fontStyle="underline" color="silver">
              Advanced Diploma Coming Soon
            </Text>
          </>
        )
    }
  }

  const handlePointEnter = (e) => {

    setHover(true);
    const tooltip = document.getElementById("phone-tooltip");

    if (hovered) {
      tooltip.style.display = "block";
      tooltip.style.left = '${mousePos[0]}px'
      tooltip.style.top = '${mousePos[1]}px'
      tooltip.textContent = "Phone";

      // Update tooltip styles and content
      tooltip.style.left = `${e.clientX + 10}px`; // Offset to avoid overlapping cursor
      tooltip.style.top = `${e.clientY + 10}px`;
      tooltip.textContent = "Phone";
      document.body.style.cursor = "pointer";
    }
  };

  const handlePointerMove = (e) => {
    const tooltip = document.getElementById("phone-tooltip");
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

    const tooltip = document.getElementById("phone-tooltip");
    if (tooltip) {
      tooltip.style.display = "none";
      tooltip.textContent = "";
      document.body.style.cursor = "default";
    }
  }

  const handleClick = () => {
    console.log("phone clicked.")
    setZoom(false)

    if (onClick) {
      onClick(position)
    }

  };

  return (
    phoneModel && (
      <animated.group
        ref={phoneRef}
        position={position}
        show={showPhone}
        tvId="lowPolyTV"
        activePhone={activePhone}
        setActivePhone={setActivePhone}
        activePlanet={activePlanet}
        setActivePlanet={setActivePlanet}
        {...springProps}
        onPointerEnter={(e) => handlePointEnter(e)}
        onPointerMove={(e) => handlePointerMove(e)}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}

      >
        <primitive object={phoneModel} />
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={screenTexture}
          position={[0, 0, 0]}
          onPointerEnter={(e) => handlePointEnter(e)}
          onPointerMove={(e) => handlePointerMove(e)}
          onPointerLeave={handlePointerLeave}
          pointerEvents="all"
          onClick={handleClick}





        />
        {renderContent()}

      </animated.group>
    )
  )
}

export default Phone