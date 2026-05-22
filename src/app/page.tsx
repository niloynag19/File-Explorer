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
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <MainPanel
          onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        />
      </div>
    </FileExplorerProvider>
  );
}
