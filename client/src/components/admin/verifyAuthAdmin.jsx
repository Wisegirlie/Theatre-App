import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/useAppContext.jsx';
import { ROLES } from '../../constants/roles.js';
import AccessDenied from "../layout/accessDenied.jsx";
import Spinner from '../misc/Spinner';

const VerifyAuth = ({ children }) => {
    const { isLogged, role, isAuthLoading } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        // Only redirect to login if user is not logged in (after auth check is complete)
        if (!isAuthLoading && !isLogged) {
            navigate('/login');
        }
    }, [isLogged, isAuthLoading, navigate]);

    // Show spinner while checking authentication
    if (isAuthLoading) {
        return <Spinner size={64} ariaLabel="Checking authentication" />;
    }

    // Redirect to login if not logged in
    if (!isLogged) {
        return null;
    }

    // Show Access Denied if logged in but not admin
    if (role !== ROLES.ADMIN) {
        return <AccessDenied />;
    }

    // Show children only if logged in as admin
    return <>{children}</>;
};

export default VerifyAuth;