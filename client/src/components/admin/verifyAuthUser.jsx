import { useAppContext } from '../../context/useAppContext.jsx';
import { ROLES } from '../../constants/roles.js';
import AccessDenied from "../accessDenied.jsx";

const VerifyAuthUser = ({ children }) => {
    const { isLogged, role } = useAppContext();

    return (
        <>
            {isLogged && role === ROLES.USER ? children : <AccessDenied />}
        </>
    );
};

export default VerifyAuthUser;