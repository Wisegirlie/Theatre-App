import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccessDenied = () => {

    const navigate = useNavigate();
    useEffect(() => {
        navigate("/login");
    },[navigate]);

    // The following code is commented out, but it can be used if you want to display a message instead of redirecting.
    // return (        
        // <div className="event-details-main-container addEvent-main-container container">
        //     <h1 className="page-main-title">Access Denied</h1>
        //     <div className="admin-events-text">                
        //         <p>You don't have permission to acces this page. </p> 
        //     </div>
        // </div>
    // );
};

export default AccessDenied;
