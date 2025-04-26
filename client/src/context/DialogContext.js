//  ==========================================
//   COMPONENT MADE FOR FUTURE IMPLEMENTATION
//            Not currently in use
//  ==========================================

// src/context/DialogContext.js
import { createContext, useContext, useRef, useState } from "react";
import Dialog from '../components/misc/dialog';

const DialogContext = createContext();

export function useDialog() {
  return useContext(DialogContext);
}

export function DialogProvider({ children }) {
  const dialogRef = useRef(null);

  const [dialogState, setDialogState] = useState({
    isOpen: false,
    title: "",
    message: "",
    isError: false,
    resolve: null,
  });

  const showDialog = (title, message, isError = false) => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        title,
        message,
        isError,
        resolve,
      });
      setTimeout(() => {
        dialogRef.current?.showModal?.(); 
      }, 0);
    });
  };

  const handleClose = () => {
    dialogRef.current?.close?.();
    dialogState.resolve?.(); 
    setDialogState((prev) => ({ ...prev, isOpen: false, resolve: null }));
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Dialog  ref={dialogRef}          
                  title={dialogState.title}
                  message={dialogState.message}
                  error={dialogState.isError} 
                  isOpen={dialogState.isOpen}
                  onClose={() => handleClose}                  
        />


      {/* <dialog ref={dialogRef} className={`app-dialog ${dialogState.isError ? "error" : "success"}`}>
        <h2>{dialogState.title}</h2>
        <p style={{ whiteSpace: "pre-line" }}>{dialogState.message}</p>
        <button onClick={handleClose}>Close</button>
      </dialog> */}
    </DialogContext.Provider>
  );
}