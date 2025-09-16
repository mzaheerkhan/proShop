import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import Rating from '../components/Rating';
import { useGetProductsDetailsQuery,useCreateProductReviewMutation } from '../redux/slices/productsApiSlice';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
const ProductScreen = () => {
  const { id: productId } = useParams();
   const { userInfo } = useSelector((state) => state.auth);
  const { data: product, isLoading, isError, error ,refetch} = useGetProductsDetailsQuery(productId);
  const [createProductReview, { isLoading: loadingProductReview }] = useCreateProductReviewMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

 const hasReviewed = product?.reviews?.some(
  (review) => review.user === userInfo._id
);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  if (!rating || !comment.trim()) {
    alert('Please select a rating and write a comment.');
    return;
  }

  try {
    await createProductReview({
      productId,
      review: { rating: Number(rating), comment },
    }).unwrap();

    setRating(0);
    setComment('');
    await refetch();
    toast.success('Review Submitted!');
  } catch (err) {
    alert(err?.data?.message || err.error);
  }
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
          </div>
          {/* Reviews Section */}
          {userInfo &&  (
             <div className="mt-3 ">
            <h2 className="text-2xl font-semibold mt-2 max-w-2xl  ">Reviews</h2>
            {product.reviews.length === 0 && <div>No Reviews</div>}
            <div className=" space-y-4    ">
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="card bg-base-100 shadow-md p-4 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-lg">{review.name}</strong>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mb-2">
                      <Rating value={review.rating} />
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>

              {userInfo && !hasReviewed && (
                <div className="mt-6 max-w-2xl">
                <h2 className="text-xl font-semibold mb-4 card bg-gray-300 p-2 border">Write a Customer Review</h2>
                {loadingProductReview && <Loader />}
                <form
                  onSubmit={handleSubmit}
                >
                  <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="rating">Rating</label>
                    <select
                      id="rating"
                      className="select select-bordered w-full"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      required
                    >
                      <option value="">Select rating</option> 
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </select> 
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 font-medium" htmlFor="comment">Comment</label>
                    <textarea
                      id="comment"
                      className="textarea textarea-bordered w-full"
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <button className="btn btn-primary" type="submit">Submit</button>
                </form>
              </div>
              )}
              
            </div>
          </div>)
            }
         
          </>
      )}

    </>
  );
};

export default ProductScreen;
