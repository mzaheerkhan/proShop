const FormContainer = ({ children }) => {
  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
