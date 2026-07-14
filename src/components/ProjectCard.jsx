import { ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project, index }) {
  return (
    <div className="border border-border-soft rounded-[8px] overflow-hidden bg-bg-inset flex flex-col">
      <div
        className="h-[100px] flex items-center justify-center text-[30px] relative"
        style={{ background: project.gradient, color: "rgba(255,255,255,0.5)" }}
      >
        {project.glyph}
        <span className="absolute top-2 right-[10px] text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>
          {project.year}
        </span>
      </div>
      <div className="px-[14px] pt-[14px] pb-4 flex-1 flex flex-col">
        <div className="text-[13px] text-purple mb-[2px]">
          Project {index + 1} // {project.slug}
        </div>
        <div className="text-text-faint text-[11px] mb-[10px]">{project.name}</div>
        <div className="text-[11px] text-text-dim leading-[1.6] flex-1 mb-3">{project.desc}</div>
        <div className="flex flex-wrap gap-[5px] mb-3">
          {project.tags.map((t) => (
            <span key={t} className="text-[9.5px] text-text-faint border border-border-soft px-[6px] py-[2px] rounded-[3px]">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {project.demo && (
            <a
              className="text-[11px] px-[10px] py-[6px] rounded-[5px] no-underline flex items-center gap-[5px] bg-orange text-[#1a1206] border border-orange font-semibold hover:brightness-110"
              href={project.demo}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink size={11} />
              live-demo
            </a>
          )}
          <a
            className="text-[11px] px-[10px] py-[6px] rounded-[5px] border border-border-soft text-text-dim no-underline flex items-center gap-[5px] hover:text-teal hover:border-teal"
            href={project.repo}
            target="_blank"
            rel="noreferrer"
          >
            <Github size={11} />
            view-code
          </a>
        </div>
      </div>
    </div>
  );
}
