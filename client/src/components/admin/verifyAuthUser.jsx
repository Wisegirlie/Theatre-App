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



// TO TEST AND ADD FOR REDIRECTING TO LOGIN -- future updates

// const VerifyAuthUser = ({ children }) => {
//     const { isLogged, setIsLogged, role } = useAppContext();
//     const navigate = useNavigate();

//     const isTokenExpired = (token) => {
//         try {
//             const payload = JSON.parse(atob(token.split('.')[1]));
//             return payload.exp * 1000 < Date.now(); // Convert seconds to ms
//         } catch (error) {
//             return true; // Invalid token format → treat as expired
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem('token');
        
//         // 1. Check if token exists and is valid (not expired)
//         const isTokenValid = token && !isTokenExpired(token); // See helper function below
//         const isRoleValid = role === ROLES.USER; // Or fetch from localStorage

//         if (!isTokenValid || !isRoleValid) {            
//             setIsLogged(false);
//             localStorage.clear();
//             sessionStorage.clear();
//             navigate('/login');
//         } else if (!isLogged && isTokenValid) {
//             // Token is valid but context state was reset → restore login
//             setIsLogged(true);
//         }
//     }, [isLogged, role, setIsLogged, navigate]);

//     return isLogged && role === ROLES.USER ? children : null;
// };

// export default VerifyAuthUser;