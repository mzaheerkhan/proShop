import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetUsersQuery, useDeleteUserMutation } from '../../redux/slices/usersApiSlice'
import { toast } from "react-toastify"
import Swal from "sweetalert2";


const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser] = useDeleteUserMutation();



  const deleteHandler = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure, you want to delet this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    });
  
    if (result.isConfirmed) {
      try {
         await deleteUser(id).unwrap();
        refetch();
        Swal.fire("Deleted!", "The product has been removed.", "success");
      } catch (err) {
        Swal.fire("Error!",err?.data?.message || err.error);
      }
    }
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td className="flex gap-2">
                    {!user.isAdmin && (
                      <>
                        <Link
                          to={`/admin/user/${user._id}/edit`}
                          className="btn btn-sm btn-outline"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => deleteHandler(user._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          <FaTrash />
                        </button>

                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListScreen;
