const Message = ({ variant = 'info', children, className = '' }) => {
  const variantClasses = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    danger: 'alert-error',
  };

  return (
    <div className={`alert ${variantClasses[variant] || 'alert-warning'} shadow-lg ${className}`}>
      <span className="text-lg font-medium">{children}</span>
    </div>
  );
};

export default Message;
