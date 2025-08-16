import { Link } from 'react-router-dom';
import { FaTimes,FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Swal from "sweetalert2";
import {useGetOrdersQuery,useDeleteOrderMutation} from '../../redux/slices/orderApiSlice'


const OrderListScreen = () => {
  const { data: orders, isLoading, error,refetch } = useGetOrdersQuery();

  const [deleteOrder] = useDeleteOrderMutation();


  const deleteHandler = async (id) => {
      const result = await Swal.fire({
        title: "Are you sure, you want to delet this order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      });
    
      if (result.isConfirmed) {
        try {
           await deleteOrder(id).unwrap();
          refetch();
          Swal.fire("Deleted!", "The order has been removed.", "success");
        } catch (err) {
          Swal.fire("Error!",err?.data?.message || err.error);
        }
      }
    };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="text-sm">{order._id}</td>
                  <td className="text-sm">{order.user?.name}</td>
                  <td className="text-sm">{order.createdAt.substring(0, 10)}</td>
                  <td className="text-sm">${order.totalPrice}</td>
                  <td className="text-sm">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                  <td className="text-sm">
                    {order.isDelivered ? (
                      order?.deliveredAt?.substring(0, 10)
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </td>
                   <td className="flex gap-2">
                    <Link
                      to={`/order/${order._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      Details
                    </Link>
                     <button
                          onClick={() => deleteHandler(order._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          <FaTrash />
                        </button>
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

export default OrderListScreen;
