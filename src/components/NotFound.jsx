import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12">
      <div className="bg-bg-inset border border-border-soft rounded-[8px] p-8 max-w-[500px] w-full">
        <div className="text-text-faint text-[12px] mb-2">// 404 — page not found</div>
        <div className="text-[48px] font-bold text-red leading-none mb-4 tracking-[-2px]" style={{ fontFamily: "'Courier New', monospace" }}>
          &lt;404/&gt;
        </div>
        <div className="text-text-dim text-[13px] leading-[1.7] mb-6">
          <span className="text-text-faint">/**</span>
          {"\n"}The requested resource was not found on this server.
          {"\n"}<span className="text-text-faint">*/</span>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-[12px] text-text-dim">
            <span className="text-[#c792ea]">const</span> navigation = {"{"}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="text-left bg-none border-none font-mono text-[12px] text-teal underline cursor-pointer pl-6 hover:opacity-80"
          >
            goBack: () =&gt; navigate(-1),
          </button>
          <button
            onClick={() => navigate("/")}
            className="text-left bg-none border-none font-mono text-[12px] text-teal underline cursor-pointer pl-6 hover:opacity-80"
          >
            goHome: () =&gt; navigate("/"),
          </button>
          <div className="text-[12px] text-text-dim">{"}"}</div>
        </div>
      </div>
    </div>
  );
}
