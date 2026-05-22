"use client";

import { useState } from "react";
import { FileExplorerProvider } from "@/context/FileExplorerContext";
import Sidebar from "@/components/Sidebar";
import MainPanel from "@/components/MainPanel";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <FileExplorerProvider>
      <div id="app-container" className="flex h-full bg-background">
        {/* Sidebar tree view */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main content panel */}
        <MainPanel
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
      </div>
    </FileExplorerProvider>
  );
}
