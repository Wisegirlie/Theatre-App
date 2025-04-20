import { AppContext } from "./AppContext";
import { useState } from "react";

export const AppProvider = ({ children }) => {
    const [events, setEvents] = useState(" ");
    const [isLogged, setIsLogged] = useState(false);
    const [role, setRole] = useState(0);

    return (
      <AppContext.Provider 
        value={{ 
          events, 
          setEvents,
          isLogged,
          setIsLogged,
          role,
          setRole
      }}>
          {children}
        </AppContext.Provider>
      );
    };