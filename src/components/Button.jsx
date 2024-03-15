const Button = ({ icon: Icon, label, onClickHandler, ...restProps }) => {
  return (
    <button className="button" onClick={onClickHandler} {...restProps}>
      {Icon && <Icon size={20} />}
      <span className="label">{label}</span> {/* Wrap label in a span */}
    </button>
  );
};

export default Button;
