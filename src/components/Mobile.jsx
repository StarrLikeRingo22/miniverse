import { useEffect, useState } from "react";

const Mobile = () => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);  // Adjust this based on your mobile threshold
      };
  
      window.addEventListener("resize", handleResize);
      handleResize(); // Call once on mount to set initial value
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return isMobile;
  };

export default Mobile