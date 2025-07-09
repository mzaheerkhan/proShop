import Product from '../components/Product';
import { useGetProductsQuery } from '../redux/slices/productsApiSlice';
import Loader from './../components/Loader';

const HomeScreen = () => {
const { data: products, isLoading, isError } = useGetProductsQuery();
 
  return (
      <>
    {isLoading ?(
      <Loader />
    ):(
     <>
      <h1 className="text-2xl font-bold my-4">Latest Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </>
    )}
   </>
  );
};

export default HomeScreen;
