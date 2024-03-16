const useTraverseFolder = () => {
  const insertNode = function (node, folderId, name, isFolder) {
    if (node.id === folderId && (node.isFolder || !isFolder)) {
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
      return insertNode(child, folderId, name, isFolder);
    });

    return { ...node, children: newChildren };
  };

  const deleteNode = (node, nodeId) => {
    if (!node) {
      return null;
    }

    if (node.id === nodeId) {
      return null;
    }

    const updatedChildren = node.children
      .map((child) => deleteNode(child, nodeId))
      .filter((child) => child !== null);

    return { ...node, children: updatedChildren };
  };

  const renameNode = (node, nodeId, updatedName) => {
    if (node.id === nodeId) {
      return { ...node, name: updatedName };
    }

    const updatedChildren = node.children.map((child) =>
      renameNode(child, nodeId, updatedName)
    );

    return { ...node, children: updatedChildren };
  };

  const changeColor = (node, nodeId, updatedColor) => {
    if (node.id === nodeId) {
      return { ...node, color: updatedColor };
    }

    const updatedChildren = node.children.map((child) =>
      changeColor(child, nodeId, updatedColor)
    );

    return { ...node, children: updatedChildren };
  };

  return { insertNode, deleteNode, renameNode, changeColor };
};

export default useTraverseFolder;
