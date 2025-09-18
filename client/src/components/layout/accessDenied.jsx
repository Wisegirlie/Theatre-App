// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

const AccessDenied = () => {

   // FUTURE UPDATE - to redirect to login page some fixes are needed. Because when refreshing, it will go to the login page, but it should stay on the same page.
    // const navigate = useNavigate();
    // useEffect(() => {
    //     navigate("/login");
    // },[navigate]);

    // The following code is commented out, but it can be used if you want to display a message instead of redirecting.
    return (        
        <div className="event-details-main-container addEvent-main-container container">
            <h1 className="page-main-title">Access Denied</h1>
            <div className="admin-events-text">                
                <p>You don't have permission to acces this page. </p> 
            </div>
        </div>
    );
};

export default AccessDenied;
