import { AppContext } from "./AppContext";

import { useState } from "react";



export const AppProvider = ({ children }) => {
    const [events, setEvents] = useState(" ");

    return (
        <AppContext.Provider value={{ events, setEvents }}>
          {children}
        </AppContext.Provider>
      );
    };