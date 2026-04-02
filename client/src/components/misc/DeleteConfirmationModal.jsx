/* ------------------------------------------------- */
/*          Deletion Confirmation Modal              */
/* ------------------------------------------------- */

// DeleteConfirmationModal Component
// This component displays a modal dialog to confirm deletion actions.
// Props:
// - title: Title text for the dialog (optional, default: "Confirm Deletion").
// - message: Message text for the dialog (optional).
// - itemType: Type of item being deleted (e.g., "event", "ticket", "user").
// - itemName: Name of the specific item being deleted (optional).
// - isOpen: Boolean to control the visibility of the dialog.
// - onClose: Function to call when the dialog is cancelled or closed.
// - onConfirm: Function to call when the deletion is confirmed.
// - isLoading: Boolean to show loading state during deletion (optional).

import "../../css/misc/deleteConfirmationModal.css";
import WarningIcon from "../../assets/misc/icon_cancel.png";
import { useEffect, useRef } from "react";

export default function DeleteConfirmationModal({
    title = "Confirm Deletion",
    message = "",
    itemType = "",
    itemName = "",
    isOpen,
    onClose,
    onConfirm,
    isLoading = false,
}) {
    const dialogRef = useRef();

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            dialogRef.current.showModal();
        } else if (!isOpen && dialogRef.current?.open) {
            dialogRef.current.close();
        }
    }, [isOpen]);

    const handleClose = () => {
        if (dialogRef.current?.open) {
            dialogRef.current.close();
        }
        onClose?.();
    };

    const handleConfirm = () => {
        onConfirm?.();
    };

    // Generate default message if not provided
    const displayMessage =
        message ||
        (itemName
            ? `Are you sure you want to delete ${itemType} "${itemName}"?`
            : `Are you sure you want to delete this ${itemType}?`);

    return (
        <dialog
            className="delete-dialog-container"
            ref={dialogRef}
            onClose={onClose}
            aria-live="assertive"
        >
            <div className="delete-dialog-innercontainer">
                <img
                    className="delete-dialog-icon"
                    src={WarningIcon}
                    alt="Warning Icon"
                />
                <div className="delete-dialog-title">{title}</div>
                {itemName && (
                    <div className="delete-dialog-item-name">
                        {itemName}
                    </div>
                )}
                <div className="delete-dialog-message">
                    {displayMessage}
                </div>
                <div className="delete-dialog-warning-text">
                    This action cannot be undone.
                </div>
                <div className="delete-dialog-buttons">
                    <button
                        className="delete-dialog-cancel-button"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                    <button
                        className="delete-dialog-confirm-button"
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </dialog>
    );
}

// ======================================================
//  TO BE USED WHEN CALLING DELETE CONFIRMATION MODAL
//          FROM OTHER COMPONENTS
// ======================================================

// import DeleteConfirmationModal from './misc/DeleteConfirmationModal';

//   Declare Delete Modal Fields
// const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
// const [itemToDelete, setItemToDelete] = useState(null);
// const [isDeleting, setIsDeleting] = useState(false);

//  Open Delete Modal
// const handleDeleteClick = (item) => {
//     setItemToDelete(item);
//     setIsDeleteModalOpen(true);
// };

//  Handle Delete Confirmation
// const handleDeleteConfirm = async () => {
//     setIsDeleting(true);
//     try {
//         // Perform deletion API call here
//         // await deleteService(itemToDelete.id);
//         setIsDeleteModalOpen(false);
//         // Refresh data or show success message
//     } catch (error) {
//         console.error("Delete failed:", error);
//         // Show error dialog
//     } finally {
//         setIsDeleting(false);
//     }
// };

// <DeleteConfirmationModal
//     title="Delete Event"
//     itemType="event"
//     itemName={itemToDelete?.name}
//     isOpen={isDeleteModalOpen}
//     onClose={() => setIsDeleteModalOpen(false)}
//     onConfirm={handleDeleteConfirm}
//     isLoading={isDeleting}
// />;

// ======================================================
//  USAGE EXAMPLES FOR DIFFERENT ITEM TYPES
// ======================================================

// FOR EVENTS:
// <DeleteConfirmationModal
//     title="Delete Event"
//     itemType="event"
//     itemName={event.title}
//     isOpen={isDeleteModalOpen}
//     onClose={() => setIsDeleteModalOpen(false)}
//     onConfirm={handleDeleteEvent}
//     isLoading={isDeleting}
// />

// FOR TICKETS:
// <DeleteConfirmationModal
//     title="Delete Ticket"
//     itemType="ticket"
//     itemName={`Ticket #${ticket.ticketNumber}`}
//     isOpen={isDeleteModalOpen}
//     onClose={() => setIsDeleteModalOpen(false)}
//     onConfirm={handleDeleteTicket}
//     isLoading={isDeleting}
// />

// FOR USERS:
// <DeleteConfirmationModal
//     title="Delete User"
//     itemType="user"
//     itemName={user.email}
//     message="Are you sure you want to delete this user account? All associated tickets and data will be permanently removed."
//     isOpen={isDeleteModalOpen}
//     onClose={() => setIsDeleteModalOpen(false)}
//     onConfirm={handleDeleteUser}
//     isLoading={isDeleting}
// />
