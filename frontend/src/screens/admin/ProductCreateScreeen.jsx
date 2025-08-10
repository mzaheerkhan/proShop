import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Message from '../../components/Message';
 import Swal from "sweetalert2";
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import {
  useCreateProductMutation,
} from '../../redux/slices/productsApiSlice';

const ProductCreateScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(''); // for potential URL support later
  const [file, setFile] = useState(null);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const [createProduct, { isLoading: loadingCreate, error: createError }] =
    useCreateProductMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('price', Number(price));
      formData.append('brand', brand.trim());
      formData.append('category', category.trim());
      formData.append('countInStock', Number(countInStock));
      formData.append('description', description.trim());

      // If you support an external image URL, send it when no file is chosen
      if (file) {
        formData.append('image', file);
      } else if (image) {
        formData.append('image', image);
      }


      await createProduct(formData).unwrap();
      Swal.fire("Success","Product created successfully", "success");
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err?.error || 'Failed to create product');
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
        <h2 className="text-3xl font-bold mb-6 text-center">Add Product</h2>

        {loadingCreate && <Loader />}
        {createError && (
          <Message variant="error">{createError?.data?.message || createError?.error}</Message>
        )}

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
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="price" className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              className="input input-bordered w-full"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label htmlFor="imageFile" className="label">
              <span className="label-text">Image (file)</span>
            </label>
            <input
              id="imageFile"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          {/* <div className="form-control">
            <label htmlFor="imageUrl" className="label">
              <span className="label-text">Or Image URL (optional)</span>
            </label>
            <input
              id="imageUrl"
              type="url"
              className="input input-bordered w-full"
              placeholder="https://example.com/image.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div> */}

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
              min="0"
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
            Create
          </button>
        </form>
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
