import React, { useEffect } from "react";
import Planecard from "./Planecard";
import { useThree } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";



const Mobile = ({ handleCardClick, activeCard, setActiveCard }) => {
  const cardSize = [0.5, 0.7, 0.5] // Adjusted size for mobile

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = useMediaQuery({ query: '(max-width: 800px)' });
    setIsMobile(checkMobile);
  }, []);


  return (
    // <>
    //   <Planecard
    //     position={[0, 0, 0]}
    //     args={cardSize}
    //     onClick={(position) => handleCardClick(position, 0)}
    //     cardId={0}
    //     activeCard={activeCard}
    //     setActiveCard={setActiveCard}
    //   />
    //   <Planecard
    //     position={[-2, 0, 0]}
    //     args={cardSize}
    //     onClick={(position) => handleCardClick(position, 1)}
    //     cardId={1}
    //     activeCard={activeCard}
    //     setActiveCard={setActiveCard}
    //   />
    //   <Planecard
    //     position={[-4, 0, 0]}
    //     args={cardSize}
    //     onClick={(position) => handleCardClick(position, 2)}
    //     cardId={2}
    //     activeCard={activeCard}
    //     setActiveCard={setActiveCard}
    //   />
    //   <Planecard
    //     position={[-6, 0, 0]}
    //     args={cardSize}
    //     onClick={(position) => handleCardClick(position, 3)}
    //     cardId={3}
    //     activeCard={activeCard}
    //     setActiveCard={setActiveCard}
    //   />
    // </>
    <div className={isMobile ? 'mobile-view' : 'desktop-view'}>
    {/* Your content goes here */}
    <p>This is a {isMobile ? 'mobile' : 'desktop'} view.</p>
  </div>
  )
}

export default Mobile