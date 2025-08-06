import { Link } from 'react-router-dom';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from '../../redux/slices/productsApiSlice';


const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct , {isLoading:loadingCreate}] = useCreateProductMutation()
  const [deleteProduct , {isLoading:deleteLoading}] = useDeleteProductMutation()

  const createProductHandler = async()=>{
  try {
    await createProduct();
    refetch()
  } catch (error) {
    toast.error(error?.data?.message || error?.error)
  }
  }

  const deleteHandler = async(id) => {
    if(  window.confirm("Are you sure to delete this products?")){
    await deleteProduct(id)
    refetch()
    } 
  };



  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="btn btn-primary" onClick={createProductHandler}>
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
