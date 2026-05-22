"use client";

import React from "react";
import { XIcon, TrashIcon } from "@/components/Icons";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  itemType: "folder" | "text";
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType,
}: DeleteModalProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        id="delete-modal"
        className="relative w-full max-w-sm bg-slate-800 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-in"
      >
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">Confirm Delete</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <XIcon size={18} />
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-start gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0">
              <TrashIcon size={20} className="text-red-400" />
            </div>
            <div>
              <p className="text-sm text-slate-300">
                Are you sure you want to delete{" "}
                <span className="text-white font-semibold">{itemName}</span>?
              </p>
              {itemType === "folder" && (
                <p className="text-xs text-red-400/80 mt-1.5">
                  ⚠ This will also delete all contents inside this folder.
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium text-slate-400 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-2.5 px-4 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 transition-all shadow-lg shadow-red-500/25 cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
