function CustomLoading({ children }) {
  return (
    <div className="loader-container">
      <div className="loader">{children}</div>
    </div>
  );
}

export default CustomLoading;
