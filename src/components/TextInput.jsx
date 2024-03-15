const TextInput = ({
  isRenaming,
  renameInputValue,
  inputValue,
  handleBlur,
  onRename,
  onAdd,
  handleChange,
}) => {
  return (
    <input
      className="text-input"
      type="text"
      autoFocus
      value={isRenaming ? renameInputValue : inputValue}
      onBlur={handleBlur}
      onKeyDown={isRenaming ? onRename : onAdd}
      onChange={handleChange}
    />
  );
};

export default TextInput;
