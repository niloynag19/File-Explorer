"use client";

import React, { useState, useEffect } from "react";
import { FileNode } from "@/types";
import { useFileExplorer } from "@/context/FileExplorerContext";
import {
  ArrowLeftIcon,
  SaveIcon,
  FileTextIcon,
  EditIcon,
} from "@/components/Icons";

interface FileEditorProps {
  file: FileNode;
}

export default function FileEditor({ file }: FileEditorProps) {
  const { saveFileContent, openFile } = useFileExplorer();
  const [content, setContent] = useState(file.content || "");
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContent(file.content || "");
    setIsEditing(false);
    setSaved(false);
  }, [file.id, file.content]);

  const handleSave = () => {
    saveFileContent(file.id, content);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  const lineCount = content.split("\n").length;

  return (
    <div
      id="file-editor"
      className="flex flex-col h-full bg-slate-900/30 rounded-2xl border border-white/5 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-slate-800/30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => openFile(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Back to folder"
          >
            <ArrowLeftIcon size={16} />
          </button>
          <div className="flex items-center gap-2">
            <FileTextIcon size={16} className="text-blue-400" />
            <span className="text-sm font-medium text-white">{file.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs text-emerald-400 font-medium animate-pulse">
              ✓ Saved
            </span>
          )}

          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <SaveIcon size={14} />
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <EditIcon size={14} />
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {isEditing ? (
          <div className="flex h-full">
            <div className="flex-shrink-0 py-4 px-3 text-right border-r border-white/5 select-none bg-slate-900/50">
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i}
                  className="text-xs text-slate-600 leading-6 font-mono"
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <textarea
              id="file-content-editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 w-full p-4 bg-transparent text-sm text-slate-200 font-mono leading-6 resize-none focus:outline-none placeholder:text-slate-600"
              placeholder="Start typing..."
              spellCheck={false}
            />
          </div>
        ) : (
          <div className="flex h-full">
            <div className="flex-shrink-0 py-4 px-3 text-right border-r border-white/5 select-none bg-slate-900/50">
              {Array.from({ length: lineCount }, (_, i) => (
                <div
                  key={i}
                  className="text-xs text-slate-600 leading-6 font-mono"
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <pre className="flex-1 p-4 text-sm text-slate-300 font-mono leading-6 whitespace-pre-wrap overflow-auto">
              {content || (
                <span className="text-slate-600 italic">Empty file</span>
              )}
            </pre>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-4 py-1.5 border-t border-white/5 bg-slate-800/30 text-[10px] text-slate-500">
        <span>
          {isEditing ? "EDITING" : "READ-ONLY"} • {lineCount} lines
        </span>
        <span className="text-slate-600">Ctrl+S to save</span>
      </div>
    </div>
  );
}
