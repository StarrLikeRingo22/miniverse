import React, { createContext, useState, useContext } from 'react';

const ZoomContext = createContext();  // Create the context

// Custom hook for using zoom context
const useZoom = () => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error('useZoom must be used within a ZoomProvider');
  }
  return context;
};

// ZoomProvider: This component wraps your app to provide the zoom state
const ZoomProvider = ({ children }) => {
  const [zoom, setZoom] = useState(false);  // Default zoom state

  return (
    <ZoomContext.Provider value={{ zoom, setZoom }}>
      {children}
    </ZoomContext.Provider>
  );
};

export { ZoomProvider, useZoom };
