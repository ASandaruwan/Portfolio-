import { BriefcaseBusiness, GraduationCap, School } from "lucide-react";
import type { TimelineItem } from "@/types";

export const journey: TimelineItem[] = [
  {
    period: "2023 – Present (Expected 2028)",
    title: "B.Sc. (Hons) in Information Technology & Management",
    description:
      "University of Moratuwa, Sri Lanka. Major in Information Technology & Management.",
    icon: GraduationCap,
  },
  {
    period: "2023 – Present",
    title: "Corporate Level Student, CA Sri Lanka",
    description:
      "Institute of Chartered Accountants of Sri Lanka. Focus: Accounting and finance, financial reporting, auditing, taxation, management accounting, and corporate finance.",
    icon: BriefcaseBusiness,
  },
  {
    period: "2019 – 2023",
    title: "Secondary Education, Ibbagamuwa Central College",
    description:
      "G.C.E. Advanced Level (Commerce Stream): Accounting (A), Business Studies (B), Information Technology (C).",
    icon: School,
  },
];
