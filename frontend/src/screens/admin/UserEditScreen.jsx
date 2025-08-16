import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../redux/slices/usersApiSlice";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setIsAdmin(!!user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        email,
        isAdmin,
      };
      await updateUser({ userId, data }).unwrap();
      toast.success("User updated successfully.");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Update failed");
    }
  };

  return (
    <>
      <div className="mb-4">
        <Link to="/admin/userlist" className="btn btn-ghost">
          ← Go Back
        </Link>
      </div>
      <FormContainer>
        <h1 className="text-3xl font-bold mb-6 text-center">Edit User</h1>

        {/* Initial data loading */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="alert alert-error mb-4" role="alert">
            <span>
              {error?.data?.message || error?.error || "Failed to load user."}
            </span>
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            {/* Name */}
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email Address</span>
              </label>
              <input
                id="email"
                type="email"
                className="input input-bordered w-full"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Is Admin */}
            <div className="form-control">
              <label
                className="label cursor-pointer justify-start gap-3"
                htmlFor="isAdmin"
              >
                <input
                  id="isAdmin"
                  type="checkbox"
                  className="checkbox"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
                <span className="label-text">Is Admin</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loadingUpdate}
            >
              {loadingUpdate ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2" />
                  Updating…
                </>
              ) : (
                "Update"
              )}
            </button>

            {loadingUpdate && <Loader />}
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
