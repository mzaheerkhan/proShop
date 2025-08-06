import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <div className="card w-full bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 my-1 rounded-box">
      <Link to={`/product/${product._id}`}>
        <figure className="p-3 h-[300px] flex justify-center items-center overflow-hidden">
          <img src={product.image} alt={product.name} className="rounded object-contain w-full h-full" />
        </figure>
      </Link>
      <div className="card-body px-4 pt-0 ">
        <Link to={`/product/${product._id}`}>
          <h2 className="card-title text-base font-semibold truncate">{product.name}</h2>
        </Link>
        <p className="text-xl font-bold">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
