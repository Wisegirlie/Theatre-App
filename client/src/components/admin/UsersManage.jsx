import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/admin/usersManage.css';
import { deleteUser, getAllUsers } from '../../services/userServices.js';
import { ROLES } from '../../constants/roles.js';
import { useNavigate } from 'react-router-dom';
// import UserIcon from '../../assets/login/icon-user.png';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
 
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Failed to delete user:", error);
            setError(error.message);
        }
    };

    // functionality for the return button
    const handleReturn = () => {
        // window.history.back();
        navigate('/');
    };

    return (
        <section className="manageUsers-section-container" id="ManageUsers">
            <h1 className="page-main-title">Manage Users</h1>
            <div className="manageUsers-text">
                <p>Total Users registered: {users.length}</p>
                <Link to="/add-User">
                    <button className="button-add">Add new user</button>
                </Link>
            </div>

            <div className="manageUsers-table-container">
                <table className="manageUsers-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date Created</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.createdAt
                                        ? user.createdAt.slice(0, 10)
                                        : "undefined"}
                                </td>
                                <td>
                                    <span
                                        className={
                                            user.role === ROLES.ADMIN
                                                ? "manageUsers-role-badge manageUsers-admin"
                                                : "manageUsers-role-badge"
                                        }
                                    >
                                        {user.role === ROLES.ADMIN
                                            ? "Administrator"
                                            : "Regular User"}
                                    </span>
                                </td>
                                <td>
                                    <Link to={`/modify-User/${user._id}`}>
                                        <button className="manageUsers-action-btn edit-btn">
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        className="manageUsers-action-btn delete-btn"
                                        onClick={() =>
                                            handleDeleteUser(user._id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={handleReturn} className="manageUsers-button-back">
                Return
            </button>
        </section>
    );
}

export default ManageUsers;
