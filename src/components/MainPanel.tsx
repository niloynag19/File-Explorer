"use client";

import React, { useState, useMemo } from "react";
import { FileNode } from "@/types";
import { useFileExplorer } from "@/context/FileExplorerContext";
import { getBreadcrumbPath } from "@/utils/fileSystem";
import {
  FolderIcon,
  FileTextIcon,
  FolderPlusIcon,
  FilePlusIcon,
  EditIcon,
  TrashIcon,
  ChevronRightIcon,
  HomeIcon,
  MenuIcon,
} from "@/components/Icons";
import CreateModal from "@/components/CreateModal";
import RenameModal from "@/components/RenameModal";
import DeleteModal from "@/components/DeleteModal";
import FileEditor from "@/components/FileEditor";

interface MainPanelProps {
  onToggleSidebar: () => void;
}

export default function MainPanel({ onToggleSidebar }: MainPanelProps) {
  const {
    fileSystem,
    selectedFolderId,
    openFileId,
    selectFolder,
    openFile,
    createItem,
    renameItem,
    deleteItem,
    getNode,
    toggleFolder,
  } = useFileExplorer();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<FileNode | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FileNode | null>(null);

  const selectedFolder = useMemo(
    () => getNode(selectedFolderId),
    [getNode, selectedFolderId]
  );

  const openedFile = useMemo(
    () => (openFileId ? getNode(openFileId) : null),
    [getNode, openFileId]
  );

  const breadcrumbs = useMemo(
    () => getBreadcrumbPath(fileSystem, selectedFolderId),
    [fileSystem, selectedFolderId]
  );

  const handleCreate = (name: string, type: "folder" | "text") => {
    createItem(selectedFolderId, name, type);
  };

  const handleRename = (newName: string) => {
    if (renameTarget) {
      renameItem(renameTarget.id, newName);
    }
  };

  const handleDelete = () => {
    if (deleteTarget) {
      deleteItem(deleteTarget.id);
    }
  };

  const handleItemDoubleClick = (item: FileNode) => {
    if (item.type === "folder") {
      selectFolder(item.id);
      toggleFolder(item.id);
    } else {
      openFile(item.id);
    }
  };

  // If a file is open, show the editor
  if (openedFile && openedFile.type === "text") {
    return (
      <main className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 lg:px-6 border-b border-white/5 bg-slate-900/30">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <MenuIcon size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <FileTextIcon size={16} className="text-blue-400" />
            <span className="text-white font-medium">{openedFile.name}</span>
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-6 overflow-hidden">
          <FileEditor file={openedFile} />
        </div>
      </main>
    );
  }

  const children = selectedFolder?.children || [];
  const folders = children.filter((c) => c.type === "folder");
  const files = children.filter((c) => c.type === "text");

  return (
    <main id="main-panel" className="flex-1 flex flex-col min-w-0 h-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 border-b border-white/5 bg-slate-900/30">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile menu button */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <MenuIcon size={20} />
          </button>

          {/* Breadcrumbs */}
          <nav
            id="breadcrumbs"
            className="flex items-center gap-1 text-sm min-w-0 overflow-x-auto"
          >
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.id}>
                {idx > 0 && (
                  <ChevronRightIcon
                    size={12}
                    className="text-slate-600 flex-shrink-0"
                  />
                )}
                <button
                  onClick={() => selectFolder(crumb.id)}
                  className={`
                    flex items-center gap-1 px-1.5 py-0.5 rounded-md flex-shrink-0 transition-colors cursor-pointer
                    ${
                      idx === breadcrumbs.length - 1
                        ? "text-white font-medium"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }
                  `}
                >
                  {idx === 0 ? (
                    <HomeIcon size={13} className="text-slate-400" />
                  ) : null}
                  <span className="truncate max-w-32">{crumb.name}</span>
                </button>
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            id="create-folder-btn"
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-all cursor-pointer shadow-md shadow-indigo-500/20"
            title="New folder or file"
          >
            <FolderPlusIcon size={14} />
            <span className="hidden sm:inline">New</span>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6">
        {children.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-4">
              <FolderIcon size={36} className="text-slate-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-400 mb-1">
              This folder is empty
            </h3>
            <p className="text-sm text-slate-600 mb-6 max-w-xs">
              Create a new folder or file to get started
            </p>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              <FolderPlusIcon size={16} />
              Create New
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Folders section */}
            {folders.length > 0 && (
              <section>
                <h2 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">
                  Folders ({folders.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {folders.map((folder) => (
                    <div
                      key={folder.id}
                      id={`item-${folder.id}`}
                      onDoubleClick={() => handleItemDoubleClick(folder)}
                      className="group relative flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/30 border border-white/5 hover:border-amber-500/20 hover:bg-slate-800/50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/20 transition-colors">
                        <FolderIcon size={20} className="text-amber-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-200 truncate">
                          {folder.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {folder.children?.length || 0} items
                        </p>
                      </div>

                      {/* Action buttons on hover */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRenameTarget(folder);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          title="Rename"
                        >
                          <EditIcon size={12} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget(folder);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <TrashIcon size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Files section */}
            {files.length > 0 && (
              <section>
                <h2 className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3 px-1">
                  Files ({files.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      id={`item-${file.id}`}
                      onDoubleClick={() => handleItemDoubleClick(file)}
                      className="group relative flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/30 border border-white/5 hover:border-blue-500/20 hover:bg-slate-800/50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                        <FileTextIcon size={20} className="text-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-200 truncate">
                          {file.name}
                        </p>
                        <p className="text-[10px] text-slate-500">Text File</p>
                      </div>

                      {/* Action buttons on hover */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRenameTarget(file);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          title="Rename"
                        >
                          <EditIcon size={12} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget(file);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <TrashIcon size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleCreate}
        parentName={selectedFolder?.name || "Home"}
      />

      <RenameModal
        isOpen={!!renameTarget}
        onClose={() => setRenameTarget(null)}
        onSubmit={handleRename}
        currentName={renameTarget?.name || ""}
      />

      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        itemName={deleteTarget?.name || ""}
        itemType={deleteTarget?.type || "text"}
      />
    </main>
  );
}
