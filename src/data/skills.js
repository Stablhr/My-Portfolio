import { createElement } from "react";
import { SiReact, SiJavascript, SiTailwindcss, SiHtml5, SiCss, SiGit, SiGithub, SiVercel, SiFigma } from "react-icons/si";

// react-icons v5 no longer ships an official VS Code glyph (only VSCodium,
// which is a different editor), so the official #007ACC logo is served from
// public/images/icons/vscode.svg instead of hotlinking a CDN at runtime.
// Built with createElement (not JSX) to keep this a plain .js data module.
function VSCodeIcon({ className, style }) {
  return createElement("img", {
    src: "/images/icons/vscode.svg",
    alt: "",
    "aria-hidden": true,
    className,
    style,
  });
}

export const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  // GitHub / Vercel ship near-black marks that disappear on the dark tiles;
  // use their light-on-dark variants so the logo stays readable.
  { name: "GitHub", icon: SiGithub, color: "#F2F4F8" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "VS Code", icon: VSCodeIcon, color: "#007ACC" },
];

export const marqueeSkills = [
  ...skills,
  ...skills,
];
