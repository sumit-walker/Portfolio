import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function AccordionSection({
  label,
  icon,
  defaultOpen = false,
  children,
  headerRight,
  nested = false,
  onToggle,
}) {
  const [open, setOpen] = useState(!!defaultOpen);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    onToggle?.(next);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`w-full flex items-center gap-2 px-[18px] py-3 bg-none border-none cursor-pointer text-left font-mono ${
          nested ? "pl-[38px]" : ""
        } hover:bg-bg-inset`}
        style={{ borderBottom: "1px solid rgba(28,38,52,0.5)" }}
      >
        <span className="text-text-dim shrink-0">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        {icon && <span className="text-text-dim shrink-0 text-[13px]">{icon}</span>}
        <span className="text-[13px] text-text-dim flex-1">{label}</span>
        {headerRight && <span className="text-text-faint text-[11px]">{headerRight}</span>}
      </button>

      {open && <div>{children}</div>}
    </div>
  );
}
