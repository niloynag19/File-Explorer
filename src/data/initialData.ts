import { FileNode } from "@/types";

export const initialFileSystem: FileNode = {
  id: "root",
  name: "Home",
  type: "folder",
  children: [
    {
      id: "1",
      name: "Documents",
      type: "folder",
      children: [
        {
          id: "1-1",
          name: "Projects",
          type: "folder",
          children: [
            {
              id: "1-1-1",
              name: "project-plan.txt",
              type: "text",
              content:
                "Project Plan\n============\n\n1. Research phase - 2 weeks\n2. Design phase - 3 weeks\n3. Development - 6 weeks\n4. Testing - 2 weeks\n5. Deployment - 1 week\n\nTotal estimated timeline: 14 weeks",
            },
            {
              id: "1-1-2",
              name: "meeting-notes.txt",
              type: "text",
              content:
                "Meeting Notes - May 2025\n========================\n\nAttendees: Alice, Bob, Charlie\n\nAgenda:\n- Sprint review\n- Backlog grooming\n- Technical debt discussion\n\nAction Items:\n- Alice: Update documentation\n- Bob: Fix login bug\n- Charlie: Design new dashboard",
            },
          ],
        },
        {
          id: "1-2",
          name: "resume.txt",
          type: "text",
          content:
            "John Doe\nSoftware Engineer\n\nExperience:\n- Full-stack Developer at TechCorp (2022-Present)\n- Frontend Developer at StartupXYZ (2020-2022)\n\nSkills:\n- React, Next.js, TypeScript\n- Node.js, Python\n- PostgreSQL, MongoDB",
        },
      ],
    },
    {
      id: "2",
      name: "Pictures",
      type: "folder",
      children: [
        {
          id: "2-1",
          name: "Vacation",
          type: "folder",
          children: [],
        },
        {
          id: "2-2",
          name: "image-credits.txt",
          type: "text",
          content:
            "Image Credits\n=============\n\nAll photos taken by John Doe.\nLicense: Creative Commons Attribution 4.0",
        },
      ],
    },
    {
      id: "3",
      name: "Downloads",
      type: "folder",
      children: [],
    },
    {
      id: "4",
      name: "readme.txt",
      type: "text",
      content:
        "Welcome to Mini File Explorer!\n==============================\n\nThis is a simple file manager application.\n\nFeatures:\n- Create folders and text files\n- Rename items\n- Delete items\n- Edit text file content\n- Navigate through folders\n\nBuilt with Next.js, TypeScript, and Tailwind CSS.",
    },
  ],
};
