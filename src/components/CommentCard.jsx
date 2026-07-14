import { useState } from "react";
import { X } from "lucide-react";
import CodeSnippet from "./CodeSnippet";

export default function CommentCard({ avatar, username, userLink, detailLink, starCount, timestamp, code, language, onDismiss }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-bg-inset border border-border-soft rounded-[6px] p-3 mb-3">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {avatar && (
            <img src={avatar} alt="" className="w-5 h-5 rounded-full" />
          )}
          <a href={userLink} className="text-teal text-[11px] no-underline hover:underline">{username}</a>
          {starCount !== undefined && (
            <span className="text-text-faint text-[10px]">★ {starCount}</span>
          )}
        </div>
        <button
          onClick={() => { setVisible(false); onDismiss?.(); }}
          className="bg-none border-none text-text-faint cursor-pointer p-0 hover:text-text-dim"
        >
          <X size={12} />
        </button>
      </div>

      {detailLink && (
        <a href={detailLink} className="text-text-dim text-[11px] no-underline hover:text-teal block mb-2">
          View details →
        </a>
      )}

      {timestamp && (
        <div className="text-text-faint text-[10px] mb-2">{timestamp}</div>
      )}

      {code && <CodeSnippet code={code} language={language} />}
    </div>
  );
}
