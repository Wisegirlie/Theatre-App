import "../css/header.css";
import Logo from "../assets/logos/LOGO-for-DARK-background.png";
import SignoutIcon from "../assets/header/icon-signout.png";
import { ROLES } from "../constants/roles";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../services/authSignOut";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context/useAppContext";
import userImg from "../assets/profile/icon-user-for-profile.png";
import DialogAwait from "./misc/dialogAwait";
import { isTokenExpired } from '../services/jwt';

const Header = () => {
    const [user, setUser] = useState({ name: "" });
    const menuRef = useRef(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isLogged, setIsLogged, role, setRole } = useAppContext();
    const navigate = useNavigate();

    //   Declare Dialog Modal Fields
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogIsError, setDialogIsError] = useState("false");
    const [isDialogOpenAwait, setIsDialogOpenAwait] = useState(false);
    const [dialogPromiseResolver, setDialogPromiseResolver] = useState(null);

    // Determine role class for responsive behavior
    const roleClass = isLogged
        ? role === ROLES.ADMIN
            ? "role-admin"
            : "role-user"
        : "";


    const handleSessionExpired = async () => {
        await showDialog(
            "Session Expired",
            "Your session has expired.\nPlease log in again.",
            true
        );
        handleSignOut();
    };

    // Set initial user infor for header
    useEffect(() => {
        const userName = localStorage.getItem("name");
        const role_stored = localStorage.getItem("role");
        const token = localStorage.getItem("token");
        if (token) {
            if (isTokenExpired(token)) {
                // Token expired: sign out user
                setDialogTitle("Session Expired");
                setDialogMessage("Your session has expired.\nPlease log in again.");
                setDialogIsError(true);
                setIsDialogOpenAwait(true); // Open Await dialog
                handleSessionExpired();          
                return;
            }
            setIsLogged(true); // Restore auth state
        }
        setRole(Number(role_stored));
        if (userName) {
            setUser({ name: userName });
        } else {
            setUser({ name: "User" });
        }
        // console.log('Logged: ', isLogged);
        //   console.log('Role: ', role, ' Name: ', userName)
    }, []);

    const showDialog = (title, message, errorState) => {
        return new Promise((resolve) => {
            setDialogTitle(title);
            setDialogMessage(message);            
            setDialogIsError(errorState);
            setIsDialogOpenAwait(true);
            setDialogPromiseResolver(() => () => {
                resolve(); 
            });
        });
    };

    useEffect(() => {
        const userName = localStorage.getItem("name");
        const role_stored = localStorage.getItem("role");
        setRole(Number(role_stored));
        if (userName) {
            setUser({ name: userName });
        } else {
            setUser({ name: "Username" });
        }
        // console.log('Logged: ', isLogged);
        // console.log('Role: ', role, ' Name: ', userName)
    }, [isLogged]);

    const handleSignOut = async () => {
        try {
            const result = await signOut();
            console.log(result.message);
            // Clear all client-side state
            localStorage.clear();
            sessionStorage.clear();
            setIsLogged(false);
            setUser({ name: "" });
            navigate("/login");
        } catch (error) {
            console.error("An error occurred while signing out:", error);
        }
    };

    const handleSignIn = async () => {
        navigate("/login");
    };

    // Close responsive menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        // Add event listener when menu is open
        if (isMobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        // Clean up
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    // Close menu when a menu item is clicked
    const closeMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <header className={roleClass}>
                <div className="header-container container" ref={menuRef}>
                    {/* logo */}
                    <div className="header-logo-container">
                        <Link to="/">
                            <img
                                className="header-logo-img"
                                src={Logo}
                                alt="Theatre-App Logo"
                            />
                        </Link>
                    </div>

                    {/* Mobile Toggle Button */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className="mobile-toggle-bar"></span>
                        <span className="mobile-toggle-bar"></span>
                        <span className="mobile-toggle-bar"></span>
                    </button>

                    {/* Menu options */}
                    <nav
                        className="menu-options-div"
                        aria-label="Main navigation"
                    >
                        <ul
                            className={`menu-ul ${
                                isMobileMenuOpen ? "active" : ""
                            }`}
                        >
                            <li className="menu-li">
                                <Link to="/" onClick={closeMenu}>
                                    <span aria-hidden="true">
                                        <i className="fa fa-star"></i>
                                    </span>
                                    What's on
                                </Link>
                            </li>
                            {/*  Menu options only for logged user  */}
                            {isLogged && role === ROLES.USER && (
                                <>
                                    <li className="menu-li">
                                        <Link
                                            to="/my-tickets"
                                            onClick={closeMenu}
                                        >
                                            My Tickets
                                        </Link>
                                    </li>
                                    <li className="menu-li">
                                        <Link to="/profile" onClick={closeMenu}>
                                            Account
                                        </Link>
                                    </li>
                                </>
                            )}
                            {/*  Menu options only for logged admins  */}
                            {isLogged && role === ROLES.ADMIN && (
                                <>
                                    {/* <li className="menu-li">
                                    <Link to="/dashboard-super">Dashboard</Link>
                                  </li> */}
                                    <li className="menu-li">
                                        <Link
                                            to="/manage-events"
                                            onClick={closeMenu}
                                        >
                                            Events
                                        </Link>
                                    </li>
                                    <li className="menu-li">
                                        <Link
                                            to="/manage-tickets"
                                            onClick={closeMenu}
                                        >
                                            Tickets
                                        </Link>
                                    </li>
                                    <li className="menu-li">
                                        <Link
                                            to="/manage-users"
                                            onClick={closeMenu}
                                        >
                                            Users
                                        </Link>
                                    </li>
                                    <li className="menu-li">
                                        <Link to="/profile" onClick={closeMenu}>
                                            Account
                                        </Link>
                                    </li>
                                </>
                            )}

                            {/*  MOBILE user info */}
                            {isLogged && (
                                <>
                                    <div className="signout-div mobile-user-info">
                                        <div className="header-user-info">
                                            Hello,
                                            <span className="header-user-name">
                                                {user.name}
                                            </span>
                                        </div>
                                        <img
                                            className="header-signout-img"
                                            src={SignoutIcon}
                                            onClick={handleSignOut}
                                            alt="Sign Out button"
                                            aria-label="Sign out"
                                        />
                                        <span className="tooltip">
                                            Sign out
                                        </span>
                                    </div>
                                </>
                            )}
                            {/*  MOBILE User not Logged - sign in/up  */}
                            {!isLogged && (
                                <>
                                    <div className="signout-div mobile-user-info">
                                        <Link
                                            to="/login"
                                            className="signout-text"
                                        >
                                            Sign In
                                        </Link>
                                        <span
                                            className="signout-text"
                                            style={{
                                                marginRight: "3px",
                                                marginLeft: "3px",
                                            }}
                                        >
                                            /
                                        </span>
                                        <Link
                                            to="/register"
                                            className="signout-text"
                                        >
                                            Sign-up
                                        </Link>
                                        {/* <Link to="/login" className="header-user-img">  */}
                                        <img
                                            className="header-signout-img"
                                            src={userImg}
                                            alt="User Avatar to Sign In"
                                            onClick={handleSignIn}
                                        />
                                        <span className="tooltip tooltip-orange">
                                            Sign In
                                        </span>
                                        {/* </Link> */}
                                    </div>
                                </>
                            )}
                        </ul>
                    </nav>
                    {/*   User logged info   */}
                    {isLogged && (
                        <>
                            <div className="signout-div desktop-user-info">
                                <div className="header-user-info">
                                    Hello,
                                    <span className="header-user-name">
                                        {user.name}
                                    </span>
                                </div>
                                <img
                                    className="header-signout-img"
                                    src={SignoutIcon}
                                    onClick={handleSignOut}
                                    alt="Sign Out button"
                                    aria-label="Sign out"
                                />
                                <span className="tooltip">Sign out</span>
                            </div>
                        </>
                    )}
                    {/*  User not Logged - sign in/up  */}
                    {!isLogged && (
                        <>
                            <div className="signout-div desktop-user-info">
                                <Link to="/login" className="signout-text">
                                    Sign In
                                </Link>
                                <span
                                    className="signout-text"
                                    style={{
                                        marginRight: "3px",
                                        marginLeft: "3px",
                                    }}
                                >
                                    /
                                </span>
                                <Link to="/register" className="signout-text">
                                    Sign-up
                                </Link>
                                {/* <Link to="/login" className="header-user-img">  */}
                                <img
                                    className="header-signout-img"
                                    src={userImg}
                                    alt="User Avatar to Sign In"
                                    onClick={handleSignIn}
                                />
                                <span className="tooltip tooltip-orange">
                                    Sign In
                                </span>
                                {/* </Link> */}
                            </div>
                        </>
                    )}
                </div>
                <div className="orange-line"></div>
            </header>
            {/* //  Dialog Await for user close to proceed */}
            <DialogAwait
                title={dialogTitle}
                message={dialogMessage}
                error={dialogIsError}
                isOpen={isDialogOpenAwait}
                onClose={() => setIsDialogOpenAwait(false)}
                resolvePromise={dialogPromiseResolver}
            />
        </>
    );
};

export default Header;
