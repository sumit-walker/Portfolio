import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function AccordionTree({ nodes, level = 0, onSelect }) {
  return (
    <div>
      {nodes.map((node, i) => (
        <AccordionNode key={node.label + i} node={node} level={level} onSelect={onSelect} />
      ))}
    </div>
  );
}

function AccordionNode({ node, level, onSelect }) {
  const [open, setOpen] = useState(node.defaultOpen ?? false);
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setOpen((v) => !v);
    } else {
      onSelect?.(node.label);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-2 px-[18px] py-[10px] bg-none border-none cursor-pointer text-left font-mono hover:bg-bg-inset ${
          node.active ? "text-teal" : "text-text-dim"
        }`}
        style={{
          paddingLeft: `${18 + level * 20}px`,
          borderBottom: "1px solid rgba(28,38,52,0.3)",
          fontSize: "12px",
        }}
      >
        {hasChildren ? (
          <span className="shrink-0">
            {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
          </span>
        ) : (
          <span className="w-[12px] shrink-0" />
        )}
        {node.icon && <span className="shrink-0 text-[13px]">{node.icon}</span>}
        <span className={node.active ? "text-teal" : ""}>{node.label}</span>
      </button>

      {hasChildren && open && (
        <AccordionTree nodes={node.children} level={level + 1} onSelect={onSelect} />
      )}
    </div>
  );
}
