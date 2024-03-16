const useTraverseFolder = () => {
  const insertNode = function (node, folderId, name, isFolder) {
    if (node.id === folderId && (node.isFolder || !isFolder)) {
      // * if node with same id found, new data will be added to the start of children arr
      node.children.unshift({
        id: new Date().getTime(),
        name,
        isFolder,
        children: [],
        color: "#000000",
      });

      return node;
    }

    const newChildren = node.children.map((child) => {
      // * make recursive call with child
      return insertNode(child, folderId, name, isFolder);
    });

    return { ...node, children: newChildren };
  };

  const deleteNode = (node, nodeId) => {
    if (!node) {
      return null;
    }

    // * return null if same id found to remove the node
    if (node.id === nodeId) {
      return null;
    }

    const updatedChildren = node.children
      .map((child) => deleteNode(child, nodeId))
      .filter((child) => child !== null);

    return { ...node, children: updatedChildren };
  };

  const renameNode = (node, nodeId, updatedName) => {
    // * update name if node is found
    if (node.id === nodeId) {
      return { ...node, name: updatedName };
    }

    // * if not found make recursive calls
    const updatedChildren = node.children.map((child) =>
      renameNode(child, nodeId, updatedName)
    );

    return { ...node, children: updatedChildren };
  };

  const changeColor = (node, nodeId, updatedColor) => {
    // * update color if node is found
    if (node.id === nodeId) {
      return { ...node, color: updatedColor };
    }

    // * make recursive calls to find node
    const updatedChildren = node.children.map((child) =>
      changeColor(child, nodeId, updatedColor)
    );

    return { ...node, children: updatedChildren };
  };

  return { insertNode, deleteNode, renameNode, changeColor };
};

export default useTraverseFolder;
