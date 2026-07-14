import { useState } from "react";
import { Check, ExternalLink, Github } from "lucide-react";
import { projects, allTags } from "../data/portfolioData";
import AccordionSection from "../components/AccordionSection";
import useMediaQuery from "../hooks/useMediaQuery";

/* ---------- mobile layout ---------- */
function MobileProjects() {
  const [activeFilters, setActiveFilters] = useState([]);

  function toggleFilter(tagName) {
    setActiveFilters((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
  }

  const visibleProjects =
    activeFilters.length === 0
      ? projects
      : projects.filter((p) => activeFilters.every((f) => p.tags.includes(f)));

  return (
    <div className="flex flex-col min-h-0">
      {/* breadcrumb */}
      <div className="px-[18px] h-8 flex items-center border-b border-border text-[12px] text-teal">
        _projects
      </div>

      {/* filter accordion */}
      <AccordionSection label="projects" icon="🔽" defaultOpen={false}>
        <div className="px-[18px] py-3 bg-bg-inset">
          {allTags.map((t) => (
            <div
              key={t}
              onClick={() => toggleFilter(t)}
              className="flex items-center gap-3 py-[10px] cursor-pointer hover:bg-bg-inset border-b border-border/30 last:border-none"
            >
              <div
                className={`w-[18px] h-[18px] border-2 rounded-[3px] flex items-center justify-center shrink-0 ${
                  activeFilters.includes(t) ? "bg-teal border-teal" : "border-border-soft"
                }`}
              >
                {activeFilters.includes(t) && <Check size={12} color="#08131a" />}
              </div>
              <span className="text-[13px] text-text-dim">{t}</span>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* project cards */}
      <div className="px-[18px] py-5 space-y-5">
        {visibleProjects.length === 0 ? (
          <div className="text-text-faint text-[12px] py-10 text-center">
            No projects match the selected tags.
          </div>
        ) : (
          visibleProjects.map((p, i) => (
            <div key={p.id}>
              <div className="text-[12px] text-purple mb-2">Project {i + 1} // {p.slug}</div>

              <div className="border border-border-soft rounded-[8px] overflow-hidden bg-bg-inset">
                <div
                  className="h-[120px] flex items-center justify-center text-[36px] relative"
                  style={{ background: p.gradient, color: "rgba(255,255,255,0.5)" }}
                >
                  {p.glyph}
                  <span
                    className="absolute top-2 right-2 w-[24px] h-[24px] flex items-center justify-center rounded-full text-[11px] font-bold"
                    style={{ background: "rgba(16,22,42,0.85)", color: "#4fd8c4" }}
                  >
                    {p.tags[0]?.slice(0, 2) || "⚙"}
                  </span>
                </div>
                <div className="px-4 pt-4 pb-4">
                  <div className="text-[13px] text-text font-semibold mb-1">{p.name}</div>
                  <div className="text-[11px] text-text-dim leading-[1.6] mb-3 line-clamp-2">
                    {p.desc}
                  </div>
                  <div className="flex flex-wrap gap-[5px] mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[9.5px] text-text-faint border border-border-soft px-[6px] py-[2px] rounded-[3px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {p.demo && (
                      <a
                        className="flex-1 text-[12px] px-3 py-[10px] rounded-[6px] no-underline flex items-center justify-center gap-[5px] bg-orange text-[#1a1206] font-semibold hover:brightness-110"
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink size={12} />
                        live-demo
                      </a>
                    )}
                    <a
                      className="flex-1 text-[12px] px-3 py-[10px] rounded-[6px] border border-border-soft text-text-dim no-underline flex items-center justify-center gap-[5px] hover:text-teal hover:border-teal"
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github size={12} />
                      view-code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ---------- desktop layout ---------- */
function DesktopProjects() {
  const [activeFilters, setActiveFilters] = useState([]);

  function toggleFilter(tagName) {
    setActiveFilters((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]
    );
  }

  const visibleProjects =
    activeFilters.length === 0
      ? projects
      : projects.filter((p) => activeFilters.every((f) => p.tags.includes(f)));

  return (
    <div className="flex-1 grid grid-cols-[210px_1fr] min-h-0">
      <div className="border-r border-border px-[14px] py-4 overflow-y-auto">
        <div className="text-text-dim text-[12px] mb-3">▾ projects</div>
        {allTags.map((t) => (
          <div key={t} onClick={() => toggleFilter(t)} className="flex items-center gap-2 text-[12px] text-text-faint py-[6px] cursor-pointer hover:text-text">
            <div className={`w-[13px] h-[13px] border border-border-soft rounded-[3px] flex items-center justify-center shrink-0 ${activeFilters.includes(t) ? "bg-teal border-teal" : ""}`}>
              {activeFilters.includes(t) && <Check size={10} color="#08131a" />}
            </div>
            {t}
          </div>
        ))}
      </div>
      <div className="px-[26px] py-[22px] overflow-y-auto">
        {visibleProjects.length === 0 ? (
          <div className="text-text-faint text-[12px] py-10 text-center">No projects match the selected tags.</div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {visibleProjects.map((p, i) => (
              <div key={p.id} className="border border-border-soft rounded-[8px] overflow-hidden bg-bg-inset flex flex-col">
                <div className="h-[100px] flex items-center justify-center text-[30px] relative" style={{ background: p.gradient, color: "rgba(255,255,255,0.5)" }}>
                  {p.glyph}
                  <span className="absolute top-2 right-[10px] text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>{p.year}</span>
                </div>
                <div className="px-[14px] pt-[14px] pb-4 flex-1 flex flex-col">
                  <div className="text-[13px] text-purple mb-[2px]">Project {i + 1} // {p.slug}</div>
                  <div className="text-text-faint text-[11px] mb-[10px]">{p.name}</div>
                  <div className="text-[11px] text-text-dim leading-[1.6] flex-1 mb-3">{p.desc}</div>
                  <div className="flex flex-wrap gap-[5px] mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="text-[9.5px] text-text-faint border border-border-soft px-[6px] py-[2px] rounded-[3px]">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {p.demo && (
                      <a className="text-[11px] px-[10px] py-[6px] rounded-[5px] no-underline flex items-center gap-[5px] bg-orange text-[#1a1206] border border-orange font-semibold hover:brightness-110" href={p.demo} target="_blank" rel="noreferrer">
                        <ExternalLink size={11} />live-demo
                      </a>
                    )}
                    <a className="text-[11px] px-[10px] py-[6px] rounded-[5px] border border-border-soft text-text-dim no-underline flex items-center gap-[5px] hover:text-teal hover:border-teal" href={p.repo} target="_blank" rel="noreferrer">
                      <Github size={11} />view-code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? <DesktopProjects /> : <MobileProjects />;
}
