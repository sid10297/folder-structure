const ColorInput = ({ colorInputValue, setColorInputValue }) => {
  return (
    <input
      type="color"
      value={colorInputValue}
      onChange={(event) => setColorInputValue(event.target.value)}
    />
  );
};

export default ColorInput;
