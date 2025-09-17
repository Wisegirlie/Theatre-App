import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ModifyingUser } from "../../services/userServices.js";
import { GetUserById } from "../../services/userServices.js";
import { ROLES } from "../../constants/roles.js";
import Dialog from "../misc/dialog";
import DialogAwait from "../misc/dialogAwait";
import "../../css/admin/userModify.css";
import { signOut } from "../../services/authSignOut";
import { useAppContext } from "../../context/useAppContext";

const ModifyUser = () => {

    const [userToModify, setUserToModify] = useState("");
    const { id } = useParams();
    const { setIsLogged } = useAppContext();
    const navigate = useNavigate();

    // const navigate = useNavigate();
    const [inputName, setInputName] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [inputPasswordValue, setInputPasswordValue] = useState("not visible"); // Valor ficticio para la entrada de contraseña
    const [inputRole, setInputRole] = useState("");

    //   Declare Dialog Modal Fields
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogIsError, setDialogIsError] = useState("false");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDialogOpenAwait, setIsDialogOpenAwait] = useState(false);
    const [dialogPromiseResolver, setDialogPromiseResolver] = useState(null);

    // console.log("id: ", id);
    
    const handleSignOut = async () => {
        try {
            const result = await signOut();
            console.log(result.message);
            // Clear all client-side state
            localStorage.clear();
            sessionStorage.clear();
            setIsLogged(false);            
            navigate("/");
        } catch (error) {
            console.error("An error occurred while signing out:", error);
        }
    };

    const showDialog = (title, message, errorState) => {
        return new Promise((resolve) => {
            setDialogTitle(title);
            setDialogMessage(message);
            setIsDialogOpen(true);
            setDialogIsError(errorState);
            setDialogPromiseResolver(() => () => {
                resolve(); 
            });
        });
    };

    useEffect(() => {
        const fetchUser = async (id) => {
            try {
                const userToModify = await GetUserById(id);
                setUserToModify(userToModify);

                if (!userToModify) {
                    setError("ID not found");
                    //  Set Dialog fields
                    setDialogTitle("User not found");
                    setDialogMessage(error);
                    setIsDialogOpen(true);
                    setDialogIsError(true);
                }
                if (userToModify) {
                    setInputName(userToModify.name);
                    setInputEmail(userToModify.email);
                    setInputRole(userToModify.role);
                }
            } catch (error) {
                //  Session expired
                if (error.message && error.message.includes("Session expired or unauthorized")) {
                    setDialogTitle("Session Expired");
                    setDialogMessage(
                        "Your session has expired.\nPlease log in again."
                    );
                    setDialogIsError(true);
                    setIsDialogOpenAwait(true);  // Open Await dialog
                    await showDialog(
                        dialogTitle,
                        dialogMessage,
                        dialogIsError
                    );
                    handleSignOut();         
                    navigate("/login");                               
                } else {
                    setDialogTitle("Error fetching User");
                    setDialogMessage(error.message);
                    setIsDialogOpen(true);
                    setDialogIsError(true);
                }
                console.error(
                    "Modify User - Error fetching User at GetUserByID: ",
                    error.message
                );
            }
        };
        if (id) {
            fetchUser(id);
        } else {
            console.error("User ID not found in parameters");
            setError("User ID not found in parameters");
            //  Set Dialog fields
            setDialogTitle("User not found");
            setDialogMessage(error);
            setIsDialogOpen(true);
            setDialogIsError(true);
        }
    }, [id, error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputRole !== ROLES.ADMIN && inputRole !== ROLES.USER) {
            setError(
                `Invalid role value. Please choose between ADMIN (${ROLES.ADMIN}) or REGULAR USER (${ROLES.USER}).`
            );
            return;
        }
        try {
            console.log(
                // `attempting modifying user with ${id}, ${inputName}, ${inputEmail}, ${inputPassword}, ${inputRole}`
            );     
            const updatedUser = await ModifyingUser(
                id,
                inputName,
                inputEmail,
                inputPassword,
                inputRole
            );       
            console.log(`User Successfully updated`);   // add ${updatedUser} to show new data
            setSuccess("User Successfully updated");
            setError("");
            //  Set Dialog fields SUCCESS
            setDialogTitle("Update Successful");
            setDialogMessage('User Successfully updated');
            setIsDialogOpen(true);
            setDialogIsError(false);
            // navigate("/manage-users");
            // window.history.back();
        } catch (error) {
            console.log("Update failed");
            setError(error.message);
            setSuccess("");
            //  Set Dialog fields
            setDialogTitle("Update failed");
            setDialogMessage(error);
            setIsDialogOpen(true);
            setDialogIsError(true);
        }
    };

    const handlePasswordChange = (e) => {
        setInputPasswordValue(e.target.value);
        setInputPassword(e.target.value);
    };


    const handleReturn = () => {
        window.history.back();
    };

    return (
        <div className="userModify-background">
            <div className="userModify-form-container">
                <Dialog
                    title={dialogTitle}
                    message={dialogMessage}
                    error={dialogIsError}
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                />
                {/* //  Dialog Await for user close to proceed */}
                <DialogAwait
                    title={dialogTitle}
                    message={dialogMessage}
                    error={dialogIsError}
                    isOpen={isDialogOpenAwait}
                    onClose={() => setIsDialogOpen(false)}
                    resolvePromise={dialogPromiseResolver}
                />
                
                <div className="userModify-form-header">
                    <h1 className="page-main-title">Modify User</h1>
                </div>
                <div className="userModify-form-content">
                    {/* User icon */}
                    <div className="profile-user-img-container userModify-user-avatar-space">
                        <span className="fa fa-user-o"></span>
                    </div>

                    <div className="userModify-form-fields">
                        <div className="userModify-form-group">
                            <label
                                htmlFor="username"
                                className="userModify-form-label"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                className="userModify-form-input"
                                type="text"
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                            />
                        </div>

                        <div className="userModify-form-group">
                            <label
                                htmlFor="email"
                                className="userModify-form-label"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                className="userModify-form-input"
                                type="email"
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                        </div>

                        <div className="userModify-form-group">
                            <label
                                htmlFor="password"
                                className="userModify-form-label"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                className="userModify-form-input"
                                type="password"
                                placeholder="Enter new password"
                                value={inputPasswordValue}
                                onChange={handlePasswordChange}
                            />
                            <small className="text-muted">
                                Leave blank to keep current password
                            </small>
                        </div>

                        <div className="userModify-form-group">
                            <label
                                htmlFor="role"
                                className="userModify-form-label"
                            >
                                Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                className="userModify-form-select"
                                value={inputRole}
                                onChange={(e) =>
                                    setInputRole(Number(e.target.value))
                                }
                            >
                                <option value={ROLES.USER}>Regular user</option>
                                <option value={ROLES.ADMIN}>
                                    Administrator
                                </option>
                            </select>
                        </div>

                        <div className="userModify-button-group">
                            <button
                                className="button-modify"
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleReturn}
                                className="button-modify userModify-button-secondary"
                            >
                                Return
                            </button>
                        </div>

                        {error && (
                            <div className="userModify-status-message userModify-error-message">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="userModify-status-message userModify-success-message">
                                {success}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifyUser;
