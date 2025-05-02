import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashBarRounded from "../../assets/dashboard/assets-dash-rounded.png";
import defaultPic from "../../assets/profile/icon-user-for-profile.png";
import { ModifyingUser } from "../../services/userServices.js";
import { GetUserById } from "../../services/userServices.js";
import { ROLES } from "../../constants/roles.js";
import Dialog from "../misc/dialog";

const handleReturn = () => {
    window.history.back();
};

const ModifyUser = () => {
    const [userToModify, setUserToModify] = useState("");
    const { id } = useParams();
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

    // console.log("id: ", id);

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
                console.error("Error fetching User at GetUserByID: ", error);
                setError("Error fetching User at GetUserByID.");
                //  Set Dialog fields
                setDialogTitle("User not found");
                setDialogMessage(error);
                setIsDialogOpen(true);
                setDialogIsError(true);
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
    }, [id]);

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

    return (
        <>
            <div className="css-flex css-content-ticket">
                <Dialog
                    title={dialogTitle}
                    message={dialogMessage}
                    error={dialogIsError}
                    isOpen={isDialogOpen}
                    onClose={() => setIsDialogOpen(false)}
                />
                ;
                <div className="css-dashboard-div css-margin-right-0">
                    <h1 className="css-color-darkOrange css-margin-none">
                        Modify User
                    </h1>
                    <img
                        className="css-dashbarRounded"
                        src={DashBarRounded}
                        alt="Dash Rounded"
                    />
                </div>
                <div className="css-flex">
                    <div>
                        <img src={defaultPic} alt="Profile" />
                    </div>
                    <div className="css-margin-left-40px">
                        <div className="css-margin-bottom-30px">
                            <span className="css-black-bold">Username:</span>
                            <input
                                className="css-input-insert"
                                type="text"
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                            />
                            <br></br>
                        </div>
                        <div className="css-margin-bottom-30px">
                            <span className="css-black-bold">Email:</span>
                            <input
                                className="css-input-insert"
                                type="text"
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                            <br></br>
                            <div className="css-margin-bottom-30px"></div>
                            <div className="css-margin-bottom-30px">
                                <span className="css-black-bold">
                                    Password:
                                </span>
                                <input
                                    className="css-input-insert"
                                    type="password"
                                    value={inputPasswordValue}
                                    onChange={handlePasswordChange}
                                    disabled
                                />
                                <br></br>
                            </div>
                            <span className="css-black-bold">Role:</span>
                            <input
                                className="css-input-insert css-tickets-width"
                                type="text"
                                min={ROLES.ADMIN}
                                max={ROLES.USER}
                                value={inputRole}
                                onChange={(e) =>
                                    setInputRole(e.target.valueAsNumber)
                                }
                            />
                            <select
                                value={inputRole}
                                onChange={(e) => setInputRole(Number(e.target.value))}
                                className="css-input-insert css-tickets-width"
                            >
                                <option value={ROLES.ADMIN}>
                                    Administrator
                                </option>
                                <option value={ROLES.USER}>Regular user</option>
                            </select>
                            <br></br>
                            <button
                                className="button-modify"
                                onClick={handleSubmit}
                                style={{ marginRight: "40px" }}
                            >
                                Modify User
                            </button>
                            <button
                                onClick={handleReturn}
                                className="button-back"
                            >
                                Return
                            </button>
                            {error && (
                                <p style={{ color: "red", fontSize: 15 }}>
                                    {error}
                                </p>
                            )}
                            {success && (
                                <span style={{ color: "green", fontSize: 15 }}>
                                    <br />{success}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div></div>
        </>
    );
};

export default ModifyUser;
