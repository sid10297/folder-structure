const ColorInput = ({ colorInputValue, setColorInputValue }) => {
  return (
    <input
      className="color-input"
      type="color"
      value={colorInputValue}
      onChange={(event) => setColorInputValue(event.target.value)}
    />
  );
};

export default ColorInput;
