import { AppContext } from "./AppContext";

import { useState } from "react";



export const AppProvider = ({ children }) => {
    const [events, setEvents] = useState(" ");
    const [isLogged, setIsLogged] = useState(false);

    return (
      <AppContext.Provider 
        value={{ 
          events, 
          setEvents,
          isLogged,
          setIsLogged 
      }}>
          {children}
        </AppContext.Provider>
      );
    };