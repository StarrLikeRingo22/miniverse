import React, { useEffect } from "react";
import Planecard from "./Planecard";
import { useThree } from "@react-three/fiber";



const Mobile = ({ handleCardClick, activeCard, setActiveCard }) => {
  const cardSize = [0.5, 0.7, 0.5] // Adjusted size for mobile

  const { camera } = useThree();

  // Ensure the camera is close enough to view the cards on mobile
  React.useEffect(() => {
    if (camera) {
      camera.position.set(0, 1.5, 3); // Adjust the Z position to ensure it's zoomed out
      camera.lookAt(0, 1.5, 0); // Point camera towards the cards
    }
  }, [camera]);


  return (
    <>
      <Planecard
        position={[0, 1.5, 0]}
        args={cardSize}
        onClick={(position) => handleCardClick(position, 0)}
        cardId={0}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <Planecard
        position={[0, 0, 0]}
        args={cardSize}
        onClick={(position) => handleCardClick(position, 1)}
        cardId={1}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <Planecard
        position={[0, -1.5, 0]}
        args={cardSize}
        onClick={(position) => handleCardClick(position, 2)}
        cardId={2}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <Planecard
        position={[0, -3, 0]}
        args={cardSize}
        onClick={(position) => handleCardClick(position, 3)}
        cardId={3}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
    </>
  )
}

export default Mobile