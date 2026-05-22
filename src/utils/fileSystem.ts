import { FileNode, FileType } from "@/types";

let counter = Date.now();

/**
 * Generate a unique identifier for new nodes
 */
export function generateId(): string {
  return `node-${counter++}-${Math.random().toString(36).substring(2, 8)}`;
}

/**
 * Deep clone a file node tree
 */
export function cloneTree(node: FileNode): FileNode {
  return JSON.parse(JSON.stringify(node));
}

/**
 * Find a node by its ID in the tree
 */
export function findNodeById(
  root: FileNode,
  id: string
): FileNode | undefined {
  if (root.id === id) return root;
  if (root.children) {
    for (const child of root.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Find parent node of a given node ID
 */
export function findParentNode(
  root: FileNode,
  targetId: string
): FileNode | undefined {
  if (root.children) {
    for (const child of root.children) {
      if (child.id === targetId) return root;
      const found = findParentNode(child, targetId);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Add a new child node to a parent folder (returns new tree)
 */
export function addNode(
  root: FileNode,
  parentId: string,
  name: string,
  type: FileType
): FileNode {
  const newTree = cloneTree(root);
  const parent = findNodeById(newTree, parentId);
  if (!parent || parent.type !== "folder") return newTree;

  const newNode: FileNode = {
    id: generateId(),
    name,
    type,
    ...(type === "folder" ? { children: [] } : { content: "" }),
  };

  if (!parent.children) parent.children = [];
  parent.children.push(newNode);
  return newTree;
}

/**
 * Rename a node (returns new tree)
 */
export function renameNode(
  root: FileNode,
  nodeId: string,
  newName: string
): FileNode {
  const newTree = cloneTree(root);
  const node = findNodeById(newTree, nodeId);
  if (node) node.name = newName;
  return newTree;
}

/**
 * Delete a node by ID (returns new tree)
 */
export function deleteNode(root: FileNode, nodeId: string): FileNode {
  const newTree = cloneTree(root);
  const parent = findParentNode(newTree, nodeId);
  if (parent && parent.children) {
    parent.children = parent.children.filter((child) => child.id !== nodeId);
  }
  return newTree;
}

/**
 * Update text content of a file node (returns new tree)
 */
export function updateFileContent(
  root: FileNode,
  nodeId: string,
  content: string
): FileNode {
  const newTree = cloneTree(root);
  const node = findNodeById(newTree, nodeId);
  if (node && node.type === "text") {
    node.content = content;
  }
  return newTree;
}

/**
 * Get the breadcrumb path for a node
 */
export function getBreadcrumbPath(
  root: FileNode,
  targetId: string
): FileNode[] {
  const path: FileNode[] = [];

  function traverse(node: FileNode): boolean {
    if (node.id === targetId) {
      path.push(node);
      return true;
    }
    if (node.children) {
      for (const child of node.children) {
        if (traverse(child)) {
          path.unshift(node);
          return true;
        }
      }
    }
    return false;
  }

  traverse(root);
  return path;
}
