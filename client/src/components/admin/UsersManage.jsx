import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/admin/usersManage.css';
import { deleteUser, getAllUsers } from '../../services/userServices.js';
import { ROLES } from '../../constants/roles.js';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../misc/DeleteConfirmationModal';
import Spinner from '../misc/Spinner';
// import UserIcon from '../../assets/login/icon-user.png';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
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
        return (
            <Spinner size={64} ariaLabel="Loading users" />            
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!userToDelete) return;

        setIsDeleting(true);
        try {
            await deleteUser(userToDelete._id);
            setUsers(users.filter((user) => user._id !== userToDelete._id));
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
        } catch (error) {
            console.error("Failed to delete user:", error);
            setError(error.message);
        } finally {
            setIsDeleting(false);
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
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
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
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.userName}</td>
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
                                        onClick={() => handleDeleteClick(user)}
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

            <DeleteConfirmationModal
                title="Delete User"
                itemType="user"
                itemName={
                    userToDelete
                        ? `${userToDelete.firstName} ${userToDelete.lastName}\n${userToDelete.email}`
                        : ""
                }
                message={`Are you sure you want to delete this user account?\n\nAll associated tickets and data will be permanently removed.`}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteConfirm}
                isLoading={isDeleting}
            />
        </section>
    );
}

export default ManageUsers;
