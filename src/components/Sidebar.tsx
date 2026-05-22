"use client";

import React, { useState, useRef, useEffect } from "react";
import { FileNode } from "@/types";
import { useFileExplorer } from "@/context/FileExplorerContext";
import {
  ChevronRightIcon,
  FolderIcon,
  FolderOpenIcon,
  FileTextIcon,
} from "@/components/Icons";

interface TreeNodeProps {
  node: FileNode;
  depth: number;
}

function TreeNode({ node, depth }: TreeNodeProps) {
  const {
    selectedFolderId,
    expandedFolders,
    toggleFolder,
    selectFolder,
    openFile,
  } = useFileExplorer();

  const isFolder = node.type === "folder";
  const isExpanded = expandedFolders.has(node.id);
  const isSelected = selectedFolderId === node.id;

  const handleClick = () => {
    if (isFolder) {
      selectFolder(node.id);
      if (!isExpanded) toggleFolder(node.id);
    } else {
      openFile(node.id);
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFolder(node.id);
  };

  return (
    <div>
      <button
        id={`tree-node-${node.id}`}
        onClick={handleClick}
        className={`
          w-full flex items-center gap-1.5 py-1.5 px-2 rounded-lg text-sm
          transition-all duration-200 group cursor-pointer
          ${
            isSelected
              ? "bg-indigo-500/20 text-indigo-300 font-medium"
              : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
          }
        `}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        title={node.name}
      >
        {/* Expand/collapse chevron for folders */}
        {isFolder ? (
          <span
            onClick={handleToggle}
            className="flex-shrink-0 p-0.5 rounded hover:bg-white/10 transition-colors"
          >
            <ChevronRightIcon
              size={14}
              className={`transition-transform duration-200 ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          </span>
        ) : (
          <span className="w-5" />
        )}

        {/* Icon */}
        <span className="flex-shrink-0">
          {isFolder ? (
            isExpanded ? (
              <FolderOpenIcon size={16} className="text-amber-400" />
            ) : (
              <FolderIcon size={16} className="text-amber-400" />
            )
          ) : (
            <FileTextIcon size={16} className="text-blue-400" />
          )}
        </span>

        {/* Name */}
        <span className="truncate">{node.name}</span>
      </button>

      {/* Children */}
      {isFolder && isExpanded && node.children && (
        <div className="overflow-hidden">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { fileSystem } = useFileExplorer();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        id="sidebar"
        className={`
          fixed lg:relative z-40 lg:z-auto
          top-0 left-0 h-full
          w-72 flex-shrink-0
          bg-slate-900/80 backdrop-blur-xl
          border-r border-white/5
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar header */}
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <FolderIcon size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">
                File Explorer
              </h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">
                Mini Explorer
              </p>
            </div>
          </div>
        </div>

        {/* Tree view */}
        <nav className="flex-1 overflow-y-auto p-2 scrollbar-thin" id="tree-view">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 py-2">
            Explorer
          </p>
          <TreeNode node={fileSystem} depth={0} />
        </nav>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-white/5">
          <p className="text-[10px] text-slate-600 text-center">
            © Webbly Media
          </p>
        </div>
      </aside>
    </>
  );
}
