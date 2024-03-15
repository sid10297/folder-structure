const Button = ({ label, onClickHandler, ...restProps }) => {
  return (
    <button onClick={onClickHandler} {...restProps}>
      {label}
    </button>
  );
};

export default Button;
