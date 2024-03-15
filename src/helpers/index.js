export function validateFileName(fileName) {
  var allowedCharacters = /^[a-zA-Z0-9_.-]*$/;
  var maxLength = 100;
  if (fileName.trim() === "") {
    return false;
  }
  if (fileName.length > maxLength) {
    return false;
  }
  if (!allowedCharacters.test(fileName)) {
    return false;
  }
  if (fileName.indexOf(".") === -1) {
    return false;
  }
  return true;
}
