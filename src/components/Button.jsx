const Button = ({ icon: Icon, label, onClickHandler, ...restProps }) => {
  return (
    <button onClick={onClickHandler} {...restProps}>
      {Icon && <Icon />}
      {Icon ? "" : label}
    </button>
  );
};

export default Button;
