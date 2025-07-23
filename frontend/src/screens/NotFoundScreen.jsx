import { Link } from 'react-router-dom';
const NotFoundScreen = () => {
  return (
    <div className="text-center flex items-center justify-center h-[80dvh] w-full  text-xl font-bold">
        <div className='flex flex-col gap-2'>
      <span className='text-red-600'>404 - Page Not Found</span>
      <Link className="btn btn-primary" to="/">Go to Home</Link>
        </div>

    </div>
  );
};

export default NotFoundScreen;
