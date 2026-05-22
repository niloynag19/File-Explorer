"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { FileNode, FileType } from "@/types";
import { initialFileSystem } from "@/data/initialData";
import {
  addNode,
  renameNode,
  deleteNode,
  updateFileContent,
  findNodeById,
} from "@/utils/fileSystem";

const STORAGE_KEY = "mini-file-explorer-data";

interface FileExplorerContextType {
  fileSystem: FileNode;
  selectedFolderId: string;
  openFileId: string | null;
  expandedFolders: Set<string>;
  createItem: (parentId: string, name: string, type: FileType) => void;
  renameItem: (nodeId: string, newName: string) => void;
  deleteItem: (nodeId: string) => void;
  saveFileContent: (nodeId: string, content: string) => void;
  selectFolder: (folderId: string) => void;
  openFile: (fileId: string | null) => void;
  toggleFolder: (folderId: string) => void;
  getNode: (nodeId: string) => FileNode | undefined;
}

const FileExplorerContext = createContext<FileExplorerContextType | null>(null);

export function FileExplorerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fileSystem, setFileSystem] = useState<FileNode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // If corrupted, fall back to initial data
        }
      }
    }
    return initialFileSystem;
  });

  const [selectedFolderId, setSelectedFolderId] = useState<string>("root");
  const [openFileId, setOpenFileId] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    () => new Set(["root"])
  );

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fileSystem));
  }, [fileSystem]);

  const createItem = useCallback(
    (parentId: string, name: string, type: FileType) => {
      setFileSystem((prev) => addNode(prev, parentId, name, type));
      // Auto-expand parent
      setExpandedFolders((prev) => new Set(prev).add(parentId));
    },
    []
  );

  const renameItem = useCallback((nodeId: string, newName: string) => {
    setFileSystem((prev) => renameNode(prev, nodeId, newName));
  }, []);

  const deleteItem = useCallback(
    (nodeId: string) => {
      // If the deleted node is the currently selected folder, go to root
      if (nodeId === selectedFolderId) {
        setSelectedFolderId("root");
      }
      // If the deleted node is the open file, close it
      if (nodeId === openFileId) {
        setOpenFileId(null);
      }
      setFileSystem((prev) => deleteNode(prev, nodeId));
    },
    [selectedFolderId, openFileId]
  );

  const saveFileContent = useCallback((nodeId: string, content: string) => {
    setFileSystem((prev) => updateFileContent(prev, nodeId, content));
  }, []);

  const selectFolder = useCallback((folderId: string) => {
    setSelectedFolderId(folderId);
    setOpenFileId(null);
  }, []);

  const openFileFn = useCallback((fileId: string | null) => {
    setOpenFileId(fileId);
  }, []);

  const toggleFolder = useCallback((folderId: string) => {
    setExpandedFolders((prev) => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  }, []);

  const getNode = useCallback(
    (nodeId: string) => findNodeById(fileSystem, nodeId),
    [fileSystem]
  );

  return (
    <FileExplorerContext.Provider
      value={{
        fileSystem,
        selectedFolderId,
        openFileId,
        expandedFolders,
        createItem,
        renameItem,
        deleteItem,
        saveFileContent,
        selectFolder,
        openFile: openFileFn,
        toggleFolder,
        getNode,
      }}
    >
      {children}
    </FileExplorerContext.Provider>
  );
}

export function useFileExplorer(): FileExplorerContextType {
  const ctx = useContext(FileExplorerContext);
  if (!ctx) {
    throw new Error(
      "useFileExplorer must be used within a FileExplorerProvider"
    );
  }
  return ctx;
}
