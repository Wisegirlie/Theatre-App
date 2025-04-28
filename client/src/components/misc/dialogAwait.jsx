import { useEffect, useRef } from "react";
import '../../css/misc/dialog.css';
import Check from '../../assets/misc/icon_check.png'
import Cancel from '../../assets/misc/icon_cancel.png'

export default function DialogAwait({ isOpen, title = "Message", message = "", error = false, onClose, resolvePromise }) {
        const dialogRef = useRef();
      
        useEffect(() => {
          if (isOpen && dialogRef.current) {
            dialogRef.current.showModal();
          }
        }, [isOpen]);
      
        const handleClose = () => {
            if (dialogRef.current?.open) {
              dialogRef.current.close();
            }
            resolvePromise?.(); 
            onClose?.();       
          };

    return (        
        <dialog ref={dialogRef} onClose={onClose}>
            <form method="dialog">
                <div className="dialog-innercontainer">
                    <img
                        className="dialog-icon"
                        src={error ? Cancel : Check}
                        alt="Dialog Message Icon"
                    />
                    <div className="dialog-title">{title}</div>
                    <div
                        className="dialog-message"
                        style={{ whiteSpace: "pre-line" }}
                    >
                        {message}
                    </div>
                    <button className="dialog-close-button" onClick={handleClose}>Close</button>
                </div>
            </form>
        </dialog>
    );    
}


// ======================================================
//  TO BE USED WHEN CALLING DIALOG FROM OTHER COMPONENTS 
// ======================================================


// import DialogAwait from './misc/dialogAwait';

//   Dialog Modal Fields
    // const [dialogTitle, setDialogTitle] = useState("");
    // const [dialogMessage, setDialogMessage] = useState("");
    // const [dialogIsError, setDialoIsgError] = useState("false");
    // const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const [dialogPromiseResolver, setDialogPromiseResolver] = useState(null);

// Add this function
    // const showDialog = (title, message, errorState) => {
    //     return new Promise((resolve) => {
    //         setDialogTitle(title);
    //         setDialogMessage(message);
    //         setIsDialogOpen(true);
    //         setDialogIsError(errorState);
    //         setDialogPromiseResolver(() => () => {
    //             resolve(); 
    //         });
    //     });
    // };

//   Handle Process
    // await showDialog(
    //     "Sign Up Successful",
    //     "Your account has been successfully created. \nYou will now be redirected to the home page",
    //     false
    // );

//  Dialog in Dom
    // <DialogAwait
    //     title={dialogTitle}
    //     message={dialogMessage}
    //     error={dialogError}
    //     isOpen={isDialogOpen}
    //     onClose={() => setIsDialogOpen(false)}
    //     resolvePromise={dialogPromiseResolver}
    // />;