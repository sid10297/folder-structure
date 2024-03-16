export function validateName(fileName, isFolder) {
  const maxLength = 100;
  if (isFolder || !isFolder) {
    if (fileName.trim() === "") {
      return false;
    }
    if (fileName.length > maxLength) {
      return false;
    }

    if (isFolder) {
      return true;
    }
  }
  const allowedCharacters = /^[a-zA-Z0-9_.-]*$/;

  if (!allowedCharacters.test(fileName)) {
    return false;
  }
  if (fileName.indexOf(".") === -1) {
    return false;
  }
  return true;
}
