import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import {
  useGetProductsDetailsQuery,
  useUpdateProductMutation,
} from '../../redux/slices/productsApiSlice';

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const  [image,setImage] = useState('')
  const [file, setFile] = useState(null);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');


  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductsDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();


  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("description", description);
    if (file) {
      formData.append("image", file); 
    }
   for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
}
      await updateProduct({productId,formData }).unwrap();
      toast.success('Product updated successfully');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Link to="/admin/productlist" className="btn btn-ghost">
          ← Go Back
        </Link>
      </div>

      <FormContainer>
        <h2 className="text-3xl font-bold mb-6 text-center">Edit Product</h2>

        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">{error?.data?.message || error.error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="form-control">
              <label htmlFor="name" className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                id="name"
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="price" className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                id="price"
                type="number"
                className="input input-bordered w-full"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* Optional Image Input */}

            <div className="form-control">
              <label htmlFor="image" className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>


            <div className="form-control">
              <label htmlFor="brand" className="label">
                <span className="label-text">Brand</span>
              </label>
              <input
                id="brand"
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="countInStock" className="label">
                <span className="label-text">Count In Stock</span>
              </label>
              <input
                id="countInStock"
                type="number"
                className="input input-bordered w-full"
                placeholder="Enter count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="category" className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                id="category"
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="description" className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                id="description"
                className="textarea textarea-bordered w-full"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">
              Update
            </button>
          </form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
