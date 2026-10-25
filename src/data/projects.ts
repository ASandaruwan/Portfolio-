import type { Project } from "@/types";

// Your projects, shown in this order. Fields:
//   image      Screenshot for the card. Either a file you put in public/images/projects/
//              (write it as "/images/projects/blog-app.png") or a Google Drive share link
//              (shared as "Anyone with the link"). Leave "" for a generated placeholder.
//   sourceUrl  GitHub repository ("View Source" button).
//   liveUrl    Deployed site ("Live Demo" button). Leave "" to hide the button.
export const projects: Project[] = [
  {
    id: "blogapp-development-project",
    title: "Blog App Development Project",
    description:
      "A full-stack blog app with features like posting, commenting, liking and sharing. Implemented using React, Node.js, Express.js, MongoDB, REST APIs, JWT Authentication, and Postman collection.",
    image: "https://drive.google.com/file/d/1sE4W0c51siQPiTEYIrB9nP9M8Yg10ztu/view?usp=sharing",
    tags: ["Node.js", "React", "MongoDB", "REST APIs", "JWT Authentication"],
    sourceUrl: "https://github.com/ASandaruwan/blogapp-development-project.git",
  },
  {
    id: "proptech_platform",
    title: "Proptech Platform for UK Rental Market",
    description:
      "A dedicated platform for the UK rental market empowering property owners and tenants to manage bookings, notifications, and real-time communications seamlessly.",
    image: [
      "https://drive.google.com/file/d/1lQ2iw_kB1lsJb2AOPDh3K0c1CoNgUXyE/view?usp=sharing",
      "https://drive.google.com/file/d/1wk5ph1GRAbVo1IF8BqfTotcFtgFAZMFZ/view?usp=sharing",
      "https://drive.google.com/file/d/1mevdAvEquANe4rCW8VZ8flgodikkciOb/view?usp=sharing",
    ],
    // Optional demo video: Google Drive preview link, YouTube, Vimeo, etc.
    // video: "https://drive.google.com/file/d/<YOUR_DRIVE_VIDEO_ID>/view?usp=sharing",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "REST APIs", "Tailwind CSS", "MERN Stack"],
    sourceUrl: "https://github.com/ASandaruwan",
    liveUrl: "https://example.com",
  },
];
