import { Linkedin } from "lucide-react";
import { profile } from "../data/portfolioData";

function XIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  );
}

export default function Footer() {
  return (
    <div className="flex items-center h-10 px-[18px] gap-3 border-t border-border bg-bg-panel text-[11.5px] text-text-faint shrink-0">
      <span className="text-text-dim">find me in:</span>
      <a
        href={profile.x}
        className="w-[26px] h-[26px] flex items-center justify-center border border-border-soft rounded text-text-dim hover:text-teal hover:border-teal no-underline text-[12px]"
        target="_blank"
        rel="noreferrer"
      >
        <XIcon size={13} />
      </a>
      <a
        href={profile.linkedin}
        className="w-[26px] h-[26px] flex items-center justify-center border border-border-soft rounded text-text-dim hover:text-teal hover:border-teal no-underline text-[12px]"
        target="_blank"
        rel="noreferrer"
      >
        <Linkedin size={13} />
      </a>
      <a
        href={profile.github}
        className="w-[26px] h-[26px] flex items-center justify-center border border-border-soft rounded text-text-dim hover:text-teal hover:border-teal no-underline text-[12px]"
        target="_blank"
        rel="noreferrer"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      </a>
      <div className="ml-auto text-text-dim">@{profile.githubUser}</div>
    </div>
  );
}
