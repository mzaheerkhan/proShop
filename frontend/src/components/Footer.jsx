const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 ">
      <div className="container mx-auto">
        <div className="flex justify-center py-3">
          <p className="text-center  text-white">ProShop &copy; {currentYear}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
