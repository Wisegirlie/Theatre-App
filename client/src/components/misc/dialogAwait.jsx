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
            resolvePromise?.(); // ✅ This is the critical part
            onClose?.();        // Optional state cleanup
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