import { Container, Table, Button } from 'react-bootstrap';
import { useGetUsersQuery, useDeleteUserMutation } from '../../store/api_users';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/loader';
import { ACCESS_LEVELS, printAccessLevel } from '../../constants';
import Message from '../../components/message';
import { useParams } from 'react-router-dom';
import PaginateNav from '../../components/paginate_nav';
import Metadata from '../../components/metadata.jsx';

const UsersListView = () => {
    const params = useParams();
    const pageNumber = params?.pageNumber || 1;
    const pageCount = params?.pageCount || 5;

    const userQuery = useGetUsersQuery({ pageNumber, pageCount });
    const users = userQuery.isSuccess ? userQuery.data.users : [];
    const userCount = userQuery.isSuccess ? userQuery.data.userCount : 0;
    const usersLoading = userQuery.isLoading;

    const [deleteUser, deleteUserStatus] = useDeleteUserMutation();

    const deleteHandler = async (e, user) => {
        console.log(`delete handler for '${user.name}'`);
        if (window.confirm(`Delete user '${user.name}'?`)) {
            try {
                const res = await deleteUser({ userId: user._id });
                if (res?.data?.success) {
                    toast.success('User was deleted');
                } else {
                    toast.error(
                        res?.data?.message ||
                            res?.error?.data?.message ||
                            'Error deleting user'
                    );
                }
            } catch (err) {
                toast.error(err?.data?.message || err?.error);
            }
        }
    };

    const userRow = (user) => {
        return (
            <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{printAccessLevel(user.accessLevel)}</td>
                <td>
                    <LinkContainer to={`/admin/users/edit/${user._id}`}>
                        <Button variant="info" size="sm">
                            <FaEdit />
                        </Button>
                    </LinkContainer>
                </td>
                <td>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => deleteHandler(e, user)}
                        disabled={
                            user.accessLevel >= ACCESS_LEVELS.ADMIN ||
                            deleteUserStatus.isLoading
                        }
                    >
                        <FaTrash />
                    </Button>
                </td>
            </tr>
        );
    };
    const usersTable = (users) => {
        return (
            <Table striped responsive hover className="table-sm">
                <thead align="center">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>ACCESS</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody align="center">
                    {users.map((user) => userRow(user))}
                </tbody>
            </Table>
        );
    };
    return (
        <Container>
            <Metadata title="Admin - Users" />
            <ToastContainer />
            <h1>Users</h1>
            {usersLoading ? <Loader /> : null}
            {userQuery.isError ? (
                <Message variant="danger">
                    {'Error loading users: '}
                    {userQuery?.error?.error || userQuery?.error?.data?.message}
                </Message>
            ) : null}
            {users ? usersTable(users) : null}
            {userCount && (
                <PaginateNav
                    baseUrl="/admin/users/list"
                    currentPage={pageNumber}
                    initialPageCount={pageCount}
                    totalCount={userCount}
                />
            )}
        </Container>
    );
};

export default UsersListView;
