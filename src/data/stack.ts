import { CodeXml, Database, LayoutTemplate, Server, Wrench } from "lucide-react";
import type { StackCategory } from "@/types";

export const stack: StackCategory[] = [
  {
    name: "Languages",
    icon: CodeXml,
    items: ["JavaScript", "TypeScript", "Python", "Java", "SQL"],
  },
  {
    name: "Frontend",
    icon: LayoutTemplate,
    items: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    name: "Backend",
    icon: Server,
    items: ["Node.js", "Socket.IO", "Express.js", "REST APIs"],
  },
  {
    name: "Database",
    icon: Database,
    items: ["Redis", "MongoDB", "MySQL", "Firebase"],
  },
  {
    name: "Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "VS Code", "Postman", "Figma"],
  },
];
