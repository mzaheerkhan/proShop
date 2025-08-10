import { Link,useNavigate } from 'react-router-dom';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
 import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../redux/slices/productsApiSlice';


const ProductListScreen = () => {
  const navigate = useNavigate()
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct , {isLoading:loadingCreate}] = useCreateProductMutation()
  const [deleteProduct , {isLoading:deleteLoading}] = useDeleteProductMutation()


  // const deleteHandler = async(id) => {
  //   if(  window.confirm("Are you sure to delete this products?")){
  //   await deleteProduct(id)
  //   refetch()
  //   } 
  // };

 

const deleteHandler = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure, you want to delet this product?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    try {
      await deleteProduct(id).unwrap();
      refetch();
      Swal.fire("Deleted!", "The product has been removed.", "success");
    } catch (err) {
      Swal.fire("Error!", "Something went wrong while deleting.", "error");
    }
  }
};




  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="btn btn-primary" onClick={()=>navigate("/admin/product/new")}>
          <FaPlus className="mr-2" /> Create Product
        </button>
      </div>

      {isLoading || loadingCreate || deleteLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="btn btn-sm btn-outline"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
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

export default ProductListScreen;
