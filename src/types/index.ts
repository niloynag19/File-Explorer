export type FileType = "folder" | "text";

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  children?: FileNode[];
  content?: string; // Only for text files
}
