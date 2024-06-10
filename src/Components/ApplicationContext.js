import React, { createContext, useState } from "react";

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [isApplication, setIsApplication] = useState(false);

  return (
    <ApplicationContext.Provider value={{ isApplication, setIsApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};
