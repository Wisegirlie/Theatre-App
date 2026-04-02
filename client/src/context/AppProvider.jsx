import { AppContext } from "./AppContext";
import { useState, useEffect } from "react";

export const AppProvider = ({ children }) => {
    const [events, setEvents] = useState(" ");
    const [isLogged, setIsLogged] = useState(false);
    const [role, setRole] = useState(0);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    // Restore authentication state from localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        
        if (token && storedRole) {
            setIsLogged(true);
            setRole(parseInt(storedRole));
        }
        
        setIsAuthLoading(false);
    }, []);

    return (
      <AppContext.Provider 
        value={{ 
          events, 
          setEvents,
          isLogged,
          setIsLogged,
          role,
          setRole,
          isAuthLoading
      }}>
          {children}
        </AppContext.Provider>
      );
    };