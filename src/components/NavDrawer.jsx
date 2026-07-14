import { X, Linkedin } from "lucide-react";
import { NavLink } from "react-router-dom";
import { navItems, profile } from "../data/portfolioData";

function XIcon({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46L20 4" />
    </svg>
  );
}

export default function NavDrawer({ isOpen, onClose }) {
  const items = [...navItems, { key: "contact-me", label: "_contact-me" }];

  return (
    <>
      {/* backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}

      {/* drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-bg-panel border-l border-border transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* header row */}
        <div className="flex items-center justify-between px-[18px] h-[46px] border-b border-border shrink-0">
          <span className="text-text-dim text-[12.5px] tracking-[0.3px]">
            {profile.handle}
          </span>
          <button onClick={onClose} className="text-text-dim bg-none border-none cursor-pointer p-1">
            <X size={18} />
          </button>
        </div>

        {/* # navigate label */}
        <div className="px-[18px] pt-4 pb-2">
          <div className="text-text-faint text-[11px]"># navigate</div>
          <div className="h-[1px] bg-border mt-2" />
        </div>

        {/* nav items */}
        <div className="flex-1 overflow-y-auto">
          {items.map((n) => (
            <NavLink
              key={n.key}
              to={n.key === "hello" ? "/" : `/${n.key}`}
              onClick={onClose}
              className={({ isActive }) =>
                `block px-[18px] py-4 text-[14px] font-mono no-underline border-b border-border/50 ${
                  isActive ? "text-teal bg-[rgba(94,234,212,0.06)]" : "text-text-dim hover:text-text hover:bg-bg-inset"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </div>

        {/* footer pinned at bottom */}
        <div className="px-[18px] py-4 border-t border-border shrink-0">
          <div className="text-text-faint text-[11px] mb-3">find me in:</div>
          <div className="flex gap-3">
            <a
              href={profile.github}
              className="w-[32px] h-[32px] flex items-center justify-center border border-border-soft rounded text-text-dim hover:text-teal hover:border-teal no-underline"
              target="_blank"
              rel="noreferrer"
            >
              <XIcon size={14} />
            </a>
            <a
              href={profile.linkedin}
              className="w-[32px] h-[32px] flex items-center justify-center border border-border-soft rounded text-text-dim hover:text-teal hover:border-teal no-underline"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={14} />
            </a>
            <a
              href={profile.github}
              className="w-[32px] h-[32px] flex items-center justify-center border border-border-soft rounded text-text-dim hover:text-teal hover:border-teal no-underline"
              target="_blank"
              rel="noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
