import { useAppContext } from '../../context/useAppContext.jsx';
import { ROLES } from '../../constants/roles.js';
import AccessDenied from "../accessDenied.jsx";

const verifyAuth = ({ children }) => {
    const { isLogged, role } = useAppContext();

    return (
        <>
            {isLogged && role === ROLES.ADMIN ? children : <AccessDenied />}
        </>
    );
};

export default verifyAuth;