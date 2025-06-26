function CustomError({ children }) {
  return (
    <div className="error-container">
      <div className="error-box">
        <span className="error-icon">🚨</span>
        {children}
      </div>
    </div>
  );
}

export default CustomError;
