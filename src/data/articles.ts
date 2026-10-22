import type { Article } from "@/types";

// Your Medium articles, shown in this order. Fields:
//   url          The article's link on Medium (copy it from the browser's address bar).
//   publishedAt  Date as "YYYY-MM-DD".
//   image        Leave "" — the cover image is fetched from Medium automatically
//                (your 10 most recent stories). Set a path or Google Drive link to override it.
export const articles: Article[] = [
  {
    id: "code-runs-not-ready",
    title: "Your Code Runs. That Is Not the Same as Ready.",
    url: "https://medium.com/@achirasandaruwan123/your-code-runs-that-is-not-the-same-as-ready-f6d5244bc7ff",
    publishedAt: "2026-09-06",
    image: "",
    tags: ["Software Testing", "Vibe Coding"],
  },
  {
    id: "nextjs-nestjs-nx-guide",
    title: "Building a Scalable Full-Stack App with Next.js, NestJS, and Nx: A Beginner’s Guide",
    url: "https://medium.com/@achirasandaruwan123/building-a-scalable-full-stack-app-with-next-js-nestjs-and-nx-a-beginners-guide-4b1f4f732071",
    publishedAt: "2026-06-06",
    image: "",
    tags: ["Nx", "Full Stack"],
  },
  {
    id: "managing-agentic-ai",
    title: "Your Next Team Member Won’t Be Human: How to Manage “Agentic AI” Without Losing Control",
    url: "https://medium.com/@achirasandaruwan123/your-next-team-member-wont-be-human-how-to-manage-agentic-ai-without-losing-control-e01e9430e1d6",
    publishedAt: "2026-04-27",
    image: "",
    tags: ["AI", "Leadership"],
  },
  {
    id: "portless",
    title: "Portless: Stop Fighting Port Numbers. Start Using Names.",
    url: "https://medium.com/@achirasandaruwan123/portless-stop-fighting-port-numbers-start-using-names-8c80c13cac50",
    publishedAt: "2026-03-30",
    image: "",
    tags: ["Developer Tools", "JavaScript"],
  },
];
