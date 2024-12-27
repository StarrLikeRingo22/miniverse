import React from "react";
import Planecard from "./Planecard";



const Mobile = ({ handleCardClick, activeCard, setActiveCard }) => {
  const cardSize = [0.5, 0.7, 0.5] // Adjusted size for mobile
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
      <Planecard
        position={[0, -2, 0]}
        args={cardSize}
        onClick={(position) => handleCardClick(position, 1)}
        cardId={1}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <Planecard
        position={[0, -4, 0]}
        args={cardSize}
        onClick={(position) => handleCardClick(position, 2)}
        cardId={2}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <Planecard
        position={[0, -6, 0]}
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