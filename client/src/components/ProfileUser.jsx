import { useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext.jsx';
import { ROLES } from '../constants/roles.js';
import { getUserEventsAndTickets } from '../services/ticketServices';
import BackPicture from '../assets/variety-images/theatre-day_2.jpg';
import '../css/profileUser.css';
import "../css/admin/userModify.css";

// functionality for the return button
const handleReturn = () => {
  window.history.back(); 
};

const ProfileUser = () => {
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
    });
    const [ticketsPurchased, setTicketsPurchased] = useState(0);
    const { isLogged, role } = useAppContext();

    // Set user state from localStorage on mount
    useEffect(() => {
        setUser({
            id: localStorage.getItem("userId"),
            firstName: localStorage.getItem("firstName"),
            lastName: localStorage.getItem("lastName"),
            userName: localStorage.getItem("userName"),
            email: localStorage.getItem("email"),
        });
    }, []);

    // Fetch tickets when user.id is available
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const tickets = await getUserEventsAndTickets(user.id);
                const totalTickets = tickets.reduce(
                    (sum, ticket) => sum + ticket.numberTickets,
                    0
                );
                setTicketsPurchased(totalTickets);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };
        if (user.id) {
            fetchTickets();
        }
    }, [user.id]);

    return (
        <div className="profile-main-container" id="profile">
            {/*  Background  */}
            <img
                className="profile-hero-img"
                alt="Theatre General Image"
                src={BackPicture}
            />

            <div className="userModify-form-container">
                <div className="userModify-form-header">
                    <h1 className="page-main-title">Profile</h1>
                </div>

                <div className="userModify-form-content">
                    {/* User icon */}
                    <div className="profile-user-img-container userModify-user-avatar-space">
                        <span className="fa fa-user-o"></span>
                    </div>

                    <div className="userModify-form">
                        <div className="userModify-form-fields">
                            <div className="userModify-form-group">
                                <label
                                    htmlFor="firstname"
                                    className="userModify-form-label"
                                >
                                    First name
                                </label>
                                <input
                                    id="firstname"
                                    name="firstname"
                                    className="profile-form-input"
                                    type="text"
                                    value={user.firstName}
                                    disabled
                                />
                            </div>
                            <div className="userModify-form-group">
                                <label
                                    htmlFor="lastname"
                                    className="userModify-form-label"
                                >
                                    Last name
                                </label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    className="profile-form-input"
                                    type="text"
                                    value={user.lastName}
                                    disabled
                                />
                            </div>

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
                                    className="profile-form-input"
                                    type="text"
                                    value={user.userName}
                                    disabled
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
                                    className="profile-form-input"
                                    type="email"
                                    value={user.email}
                                    disabled
                                />
                            </div>

                            <div className="userModify-form-group">
                                {/* Role - only admin */}
                                {isLogged && role === ROLES.ADMIN && (
                                    <>
                                        {" "}
                                        <label
                                            htmlFor="role"
                                            className="userModify-form-label"
                                        >
                                            Role
                                        </label>
                                        <input
                                            id="role"
                                            name="role"
                                            type="text"
                                            className="profile-form-input profile-data"
                                            value="System Administrator"
                                            disabled
                                        />
                                    </>
                                )}
                                {/* Role - only general user */}
                                {isLogged && role === ROLES.USER && (
                                    <>
                                        <label
                                            htmlFor="role"
                                            className="userModify-form-label"
                                        >
                                            Total tickets purchased
                                        </label>
                                        <input
                                            id="role"
                                            name="role"
                                            type="number"
                                            className="profile-form-input profile-data profile-tickets"
                                            value={ticketsPurchased}
                                            disabled
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                        <button onClick={handleReturn} className="button-back">
                            Return
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileUser;
