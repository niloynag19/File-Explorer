"use client";

import React, { useState } from "react";
import { XIcon } from "@/components/Icons";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, type: "folder" | "text") => void;
  parentName: string;
}

export default function CreateModal({
  isOpen,
  onClose,
  onSubmit,
  parentName,
}: CreateModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"folder" | "text">("folder");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onSubmit(trimmed, type);
    setName("");
    setType("folder");
    onClose();
  };

  const handleClose = () => {
    setName("");
    setType("folder");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        id="create-modal"
        className="relative w-full max-w-md bg-slate-800 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div>
            <h2 className="text-lg font-semibold text-white">Create New</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Inside{" "}
              <span className="text-indigo-400 font-medium">{parentName}</span>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <XIcon size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Type selector */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
              Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType("folder")}
                className={`
                  py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${
                    type === "folder"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-lg shadow-amber-500/10"
                      : "bg-white/5 text-slate-400 border border-transparent hover:bg-white/10"
                  }
                `}
              >
                📁 Folder
              </button>
              <button
                type="button"
                onClick={() => setType("text")}
                className={`
                  py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer
                  ${
                    type === "text"
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/10"
                      : "bg-white/5 text-slate-400 border border-transparent hover:bg-white/10"
                  }
                `}
              >
                📄 Text File
              </button>
            </div>
          </div>

          {/* Name input */}
          <div className="space-y-2">
            <label
              htmlFor="create-name-input"
              className="text-xs font-medium text-slate-400 uppercase tracking-wider"
            >
              Name
            </label>
            <input
              id="create-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={
                type === "folder" ? "New Folder" : "new-file.txt"
              }
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-white/10 rounded-xl text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              autoFocus
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium text-slate-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
