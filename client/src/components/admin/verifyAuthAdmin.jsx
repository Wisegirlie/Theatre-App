import { useAppContext } from '../../context/useAppContext.jsx';
import { ROLES } from '../../constants/roles.js';
import AccessDenied from "../layout/accessDenied.jsx";

const VerifyAuth = ({ children }) => {
    const { isLogged, role } = useAppContext();

    // console.log("isLogged: " + isLogged);
    // console.log("role: " + role);

    return (
        <>
            {isLogged && role === ROLES.ADMIN ? children : <AccessDenied />}
        </>
    );
};

export default VerifyAuth;