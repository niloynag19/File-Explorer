# Mini File Explorer

A web-based Mini File Explorer application built for Webbly Media. This application allows users to manage folders and text files in a simple, hierarchical structure, similar to a basic desktop file manager.

## 🚀 Features

- **Folder & File Management:** Create, rename, and delete both folders and text files.
- **Hierarchical Tree View:** Navigate through nested folders via an intuitive collapsible sidebar.
- **Main Panel Grid:** View the contents of the currently selected folder in a clean, modern grid layout.
- **Text File Editor:** Open text files to read and seamlessly edit their contents directly in the browser (supports `Ctrl+S` / `Cmd+S` to save).
- **Cascading Deletion:** Deleting a folder safely cascades the deletion to all of its nested children.
- **Persistent Storage:** All data and file structures are saved automatically to your browser's local storage. Your files remain intact even after refreshing the page.
- **Dynamic & Responsive Design:** Beautifully crafted with a glassmorphic dark theme, sleek micro-animations, and full mobile responsiveness.

## 🛠️ Technology Stack

- **Framework:** React.js / Next.js 16 (App Router)
- **Language:** TypeScript for end-to-end type safety
- **Styling:** Tailwind CSS v4 for utility-first styling and robust custom themes
- **State Management:** React Context API + LocalStorage
- **Icons:** Custom-built zero-dependency SVG components

## 📂 Project Structure

```
mini-file-explorer/
├── src/
│   ├── app/                # Next.js App Router entry points (layout, page, globals.css)
│   ├── components/         # Reusable UI Components
│   │   ├── Sidebar.tsx     # Tree view navigation panel
│   │   ├── MainPanel.tsx   # Folder content grid and breadcrumbs
│   │   ├── FileEditor.tsx  # Text file content editor
│   │   ├── Icons.tsx       # Reusable SVG assets
│   │   └── *Modal.tsx      # Create, Rename, and Delete modals
│   ├── context/            # React Context for global state (FileExplorerContext)
│   ├── data/               # Initial mock data structure
│   ├── types/              # TypeScript interfaces (FileNode, FileType)
│   └── utils/              # Pure functions for tree operations (add, delete, find)
```

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js (v18 or higher) installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/niloynag19/File-Explorer.git
   cd File-Explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## ☁️ Deployment (Vercel)

The easiest way to deploy this Next.js application is to use the [Vercel Platform](https://vercel.com/):

1. Push your code to your GitHub repository.
2. Go to Vercel and log in with your GitHub account.
3. Click **Add New...** -> **Project**.
4. Import the `File-Explorer` repository.
5. Click **Deploy**. Vercel will automatically configure the build settings and provide you with a live URL.

## 📝 Design Philosophy

This project strictly adheres to clean coding practices:
- **Immutability:** All file system operations (`src/utils/fileSystem.ts`) return deep-cloned immutable objects to ensure predictable React state updates.
- **Separation of Concerns:** Pure logic operations are decoupled from React components and global state context.
- **Zero Extraneous Dependencies:** Animations, modals, and SVGs were built entirely from scratch without bloating the application with external libraries.

---
*Developed for the Webbly Media frontend evaluation task.*
