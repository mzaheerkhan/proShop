import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import Rating from '../components/Rating';
import { useGetProductsDetailsQuery } from '../redux/slices/productsApiSlice';
import Loader from '../components/Loader';
const ProductScreen = () => {
  const { id: productId } = useParams();
  const { data: product, isLoading, isError, error } = useGetProductsDetailsQuery(productId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  return (
    <>
      {isLoading ? (<Loader />) : (
        <>
          <Link
            to="/"
            className="btn btn-ghost"
          >
          ←  Go Back
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2">
            {/* Image */}
            <div className="md:col-span-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded"
              />
            </div>

            {/* Product details */}
            <div className="md:col-span-4 space-y-4 ">
              <div>
                <h3 className="text-2xl font-semibold">{product.name}</h3>
              </div>
              <div>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>
              <div className="text-lg font-bold">Price: ${product.price}</div>
              <div className="text-base">{product.description}</div>
            </div>

            {/* Purchase card */}
            <div className="md:col-span-4">
              <div className="card bg-base-100 shadow rounded-box p-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-bold">${product.price}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span>
                      {product.countInStock > 0 ? (
                        <span className="text-green-600 font-semibold">In Stock</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Out Of Stock</span>
                      )}
                    </span>
                  </div>

                  {/* qty section */}

                  {product.countInStock > 0 && (
                    <div className="bg-base-100 p-4 rounded-lg shadow-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Qty</span>
                        <select
                          className="select select-bordered w-24"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}


                  <button
                    className={`btn btn-primary w-full ${product.countInStock === 0 ? 'btn-disabled' : ''}`}
                    type="button"
                    disabled={product.countInStock === 0}
                     onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div></>
      )}

    </>
  );
};

export default ProductScreen;
