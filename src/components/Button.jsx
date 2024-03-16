const Button = ({ icon: Icon, label, onClickHandler, ...restProps }) => {
  return (
    <button className="button" onClick={onClickHandler} {...restProps}>
      {Icon && <Icon size={20} />}
      <span className="label">{label}</span>
    </button>
  );
};

export default Button;
