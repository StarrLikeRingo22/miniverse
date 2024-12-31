import React, { useEffect } from "react";
import Planecard from "./Planecard";



const Mobile = ({ handleCardClick, activeCard, setActiveCard }) => {
  const cardSize = [1, 1.5, 0.1] // Adjusted size for mobile

  return (
    <>
      <Planecard
        position={[0, 0, 0]}
        args={cardSize}
        onClick={(position) => handleCardClick(position, 0)}
        cardId={0}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
    </>
  )
}

export default Mobile