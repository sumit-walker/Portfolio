import { useState, useEffect } from "react";
import { heroSnippets } from "../data/portfolioData";

export default function TypingPanel() {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = heroSnippets[snippetIdx];
    let delay = deleting ? 12 : 18;
    const t = setTimeout(() => {
      if (!deleting) {
        if (typed.length < full.length) {
          setTyped(full.slice(0, typed.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        if (typed.length > 0) {
          setTyped(full.slice(0, typed.length - 1));
        } else {
          setDeleting(false);
          setSnippetIdx((i) => (i + 1) % heroSnippets.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [typed, deleting, snippetIdx]);

  return (
    <div className="bg-bg-inset border border-border-soft rounded-[8px] px-5 py-[18px] text-[11.5px] leading-[1.7] text-text-dim min-h-[200px] shadow-[0_0_60px_rgba(94,234,212,0.05)]">
      <div className="text-text-faint mb-[10px]">// stack.js</div>
      <pre className="m-0 whitespace-pre-wrap" style={{ fontFamily: "inherit" }}>
        {typed.split("\n").map((line, i) => (
          <div key={i}>
            {line
              .split(/(".*?"|\bfunction\b|\bconst\b|\breturn\b|\bexport\b)/g)
              .map((chunk, j) => {
                if (["function", "const", "return", "export"].includes(chunk))
                  return <span key={j} className="text-[#c792ea]">{chunk}</span>;
                if (chunk.startsWith('"'))
                  return <span key={j} className="text-[#7ec699]">{chunk}</span>;
                return <span key={j}>{chunk}</span>;
              })}
          </div>
        ))}
        <span className="text-teal animate-blink">▍</span>
      </pre>
    </div>
  );
}
