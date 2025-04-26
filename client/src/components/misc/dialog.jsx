import '../../css/misc/dialog.css';
import Check from '../../assets/misc/icon_check.png'
import Cancel from '../../assets/misc/icon_cancel.png'

export default function Dialog({ title = "Message", message = "", error = false,  onClose }) {

    function closeDialog () {     
        if (onClose) {
            onClose();
        }
    }

    return (
        <div className="dialog-container" id="popup">
            <div className="dialog-innercontainer">                 
                <img className="dialog-icon" src={error ? Cancel : Check } alt="Dialog Message Icon" />  
                <div className="dialog-title">                    
                    {title}
                </div>
                <div className="dialog-message" style={{ whiteSpace: 'pre-line' }}>
                    {message}
                </div>
                <button className="dialog-close-button"  type="submit" onClick={closeDialog}>Close</button>
            </div>
        </div>
    );    
}

// ======================================================
//  TO BE USED WHEN CALLING DIALOG FROM OTHER COMPONENTS
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

        {/* Render Dialog conditionally */}
        // {showDialog && (
        //     <Dialog
        //         title={dialogTitle}
        //         message={dialogMessage}
        //         error={isError}
        //         onClose={() => setShowDialog(false)} 
        //     />
        // )}  

