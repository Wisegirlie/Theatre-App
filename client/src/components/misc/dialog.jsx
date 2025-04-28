import '../../css/misc/dialog.css';
import Check from '../../assets/misc/icon_check.png'
import Cancel from '../../assets/misc/icon_cancel.png'
import { useEffect, useRef } from 'react';

export default function Dialog({ title = "Message", message = "", error,  isOpen, onClose }) {

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
                onClose?.();       
              };

    return (
        <dialog className="dialog-container" id="popup" ref={dialogRef} onClose={onClose}>
            <div className="dialog-innercontainer">      
            {error !== null && (
                <img className="dialog-icon" src={error ? Cancel : Check} alt="Dialog Message Icon" />  
            )}
                <div className="dialog-title">                    
                    {title}
                </div>
                <div className="dialog-message" style={{ whiteSpace: 'pre-line' }}>
                    {message}
                </div>
                <button className="dialog-close-button"  onClick={handleClose}>Close</button>
            </div>
        </dialog>
    );    
}


// ======================================================
//  TO BE USED WHEN CALLING DIALOG FROM OTHER COMPONENTS 
//          Version 2 with Href and <dialog>
// ======================================================

// import Dialog from './misc/dialogAwait';

//   Declare Dialog Modal Fields
    // const [dialogTitle, setDialogTitle] = useState("");
    // const [dialogMessage, setDialogMessage] = useState("");
    // const [dialogIsError, setDialogIsError] = useState("false");
    // const [isDialogOpen, setIsDialogOpen] = useState(false);

//  Set Dialog fields     
    // setDialogTitle('title');
    // setDialogMessage('message');
    // setIsDialogOpen(true);
    // setDialogIsError(errorState);

    // <Dialog
    //     title={dialogTitle}
    //     message={dialogMessage}
    //     error={dialogIsError}
    //     isOpen={isDialogOpen}
    //     onClose={() => setIsDialogOpen(false)}
    // />;





// ======================================================
//  TO BE USED WHEN CALLING DIALOG FROM OTHER COMPONENTS 
//          Version 1 without Href and <dialog>
//          Using regular div
// ======================================================

// import Dialog from './misc/dialogAwait';

//   Dialog Modal Fields
    // const [dialogTitle, setDialogTitle] = useState("");
    // const [dialogMessage, setDialogMessage] = useState("");
    // const [dialogError, setDialogError] = useState("false");
    // const [showDialog, setShowDialog] = useState(false);

    //  Show success dialog
        //   setDialogTitle("Success");
        //   setDialogMessage("File successfully saved.");
        //   setIsError(false);
        //   setShowDialog(true);
          
    // Show error dialog
        //   setDialogTitle("Error");
        //   setDialogMessage("File save cancelled or failed.");
        //   console.log(`Error saving: ${error}`)  
        //   setIsError(true);
        //   setShowDialog(true);

    // Show message dialog with no image
        //   setDialogTitle("Error");
        //   setDialogMessage("File save cancelled or failed.");
        //   console.log(`Error saving: ${error}`)  
        //   setIsError(null);
        //   setShowDialog(true);

        {/* Render Dialog conditionally */}
        // {showDialog && (
        //     <Dialog
        //         title={dialogTitle}
        //         message={dialogMessage}
        //         error={isError}
        //         onClose={() => setShowDialog(false)} 
        //     />
        // )}  

