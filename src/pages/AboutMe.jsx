import { useState } from "react";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { profile, skillGroups, education, achievements, certifications } from "../data/portfolioData";
import {
  FolderOpen, File, Folder, Award
} from "lucide-react";
import AccordionSection from "../components/AccordionSection";
import AccordionTree from "../components/AccordionTree";
import CommentCard from "../components/CommentCard";
import TypingPanel from "../components/TypingPanel";
import useMediaQuery from "../hooks/useMediaQuery";

const codeExample = `function stack() {
  const langs = ["JS", "TS", "Python", "Java"];
  const core  = ["React", "Node", "Express"];
  return { langs, core, status: "shipping" };
}`;

const aboutContent = {
  bio: { title: "bio", body: profile.summary },
  interests: { title: "interests", body: profile.interests },
  "high-school": {
    title: "education / high-school",
    body: `${education[1].school}\n${education[1].degree} — ${education[1].detail}\n${education[1].period}`,
  },
  university: {
    title: "education / university",
    body: `${education[0].school}\n${education[0].degree} — ${education[0].detail}\n${education[0].period}`,
  },
  contacts: {
    title: "contacts",
    body: `${profile.email}\n${profile.phone}\n${profile.location}`,
  },
};

const treeNodes = [
  {
    label: "bio",
    icon: "📕",
    defaultOpen: false,
  },
  // {
  //   label: "interests",
  //   icon: "📗",
  //   defaultOpen: false,
  // },
  {
    label: "education",
    icon: "📁",
    defaultOpen: true,
    children: [
      { label: "high-school", icon: "☐" },
      { label: "university", icon: "☐" },
    ],
  },
];

/* ---------- mobile layout ---------- */
function MobileAbout() {
  const [bioSection, setBioSection] = useState("bio");

  const displayContent = aboutContent[bioSection];

  return (
    <div className="flex flex-col min-h-0">
      {/* breadcrumb */}
      <div className="px-[18px] h-8 flex items-center border-b border-border text-[12px] text-teal">
        _about-me
      </div>

      {/* accordion sections */}
      <div>
        {/* personal-info */}
        <AccordionSection label="personal-info" icon="📋" defaultOpen={true}>
          <div className="bg-bg-inset">
            <AccordionTree
              nodes={treeNodes.map((n) => ({
                ...n,
                active: n.label === bioSection,
                children: n.children?.map((c) => ({
                  ...c,
                  active: c.label === bioSection,
                })),
              }))}
              onSelect={(label) => setBioSection(label)}
            />
          </div>
        </AccordionSection>

        {/* professional-info */}
        <AccordionSection label="professional-info" icon="💼" defaultOpen={false}>
          <div className="px-[18px] py-4 bg-bg-inset">
            <div className="text-text-dim text-[12px] mb-3">// skills</div>
            <div className="flex flex-wrap gap-2">
              {skillGroups.map((g) => (
                <div key={g.label} className="bg-bg-inset border border-border-soft rounded-[6px] p-3 w-full">
                  <div className="flex items-center gap-[7px] text-teal text-[12px] mb-[6px]">
                    <BadgeCheck size={13} />{g.label}
                  </div>
                  <div className="flex flex-wrap gap-[6px]">
                    {g.items.map((it) => (
                      <span key={it} className="text-[10.5px] text-text-dim border border-border-soft px-[7px] py-[3px] rounded-[4px]">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-text-dim text-[12px] mb-3 mt-4">// achievements</div>
            {achievements.map((a, i) => (
              <div key={i} className="bg-bg-inset border border-border-soft rounded-[6px] p-3 mb-3">
                <div className="flex items-center gap-[7px] text-teal text-[12px] mb-[6px]">
                  <Award size={13} />hackathon
                </div>
                <div className="text-text-dim text-[11px] leading-[1.6]">{a.title}</div>
              </div>
            ))}
            <div className="text-text-dim text-[12px] mb-3 mt-4">// certifications</div>
            <div className="bg-bg-inset border border-border-soft rounded-[6px] p-3 mb-3">
              {certifications.map((c, i) => (
                <div key={i} className="text-text-dim text-[11px] leading-[1.6]" style={{ marginBottom: i < certifications.length - 1 ? 6 : 0 }}>
                  <GraduationCap size={11} className="inline align-middle mr-[5px]" />{c}
                </div>
              ))}
            </div>
          </div>
        </AccordionSection>

        {/* hobbies */}
        <AccordionSection label="interests" icon="🎯" defaultOpen={false}>
          <div className="px-[18px] py-4 bg-bg-inset">
            <div className="text-text-dim text-[12px] leading-[1.7]">
              {"• System Design\n• AI-assisted Development\n• Full-Stack Development\n• Developer Tooling\n• Clean Architecture\n• Open Source\n• CI/CD & DevOps"}
            </div>
          </div>
        </AccordionSection>

        {/* contacts */}
        <AccordionSection label="contacts" icon="📞" defaultOpen={false}>
          <div className="px-[18px] py-4 bg-bg-inset">
            <div className="text-text-dim text-[12px] leading-[1.7] whitespace-pre-line">
              {profile.email}{"\n"}{profile.phone}{"\n"}{profile.location}
            </div>
          </div>
        </AccordionSection>
      </div>

      {/* bio content area */}
      <div className="px-[18px] py-5">
        <div className="text-text-dim text-[12px] mb-3">{displayContent.title}</div>
        <div className="text-text text-[12px] leading-[1.8] whitespace-pre-line">
          <span className="text-text-faint">/**</span>{"\n"}
          {displayContent.body}
          {"\n"}<span className="text-text-faint">*/</span>
        </div>
      </div>

      {/* CommentCard */}
      <div className="px-[18px] pb-5">
        <CommentCard
          avatar={null}
          username="@sumit-raj"
          userLink="#"
          detailLink="#"
          starCount={3}
          timestamp="Created 5 months ago"
          code={codeExample}
          language="stack.js"
        />
      </div>

      {/* typing panel */}
      <div className="px-[18px] pb-5">
        <TypingPanel />
      </div>
    </div>
  );
}

/* ---------- desktop layout ---------- */
function DesktopAbout() {
  const [aboutSection, setAboutSection] = useState("bio");
  const [eduOpen, setEduOpen] = useState(true);

  return (
    <div className="flex-1 grid grid-rows-[1fr_auto] min-h-0">
      <div className="grid grid-cols-[210px_1fr_260px] min-h-0 overflow-hidden">
        {/* tree */}
        <div className="border-r border-border px-[10px] py-4 overflow-y-auto">
          <div className="flex items-center gap-[6px] text-text-dim text-[12px] px-[6px] py-[6px]">
            <FolderOpen size={13} />personal-info
          </div>
          {["bio",
           "interests"

          ].map((s) => (
            <div
              key={s}
              onClick={() => setAboutSection(s)}
              className={`flex items-center gap-[7px] text-[12px] px-[6px] py-[6px] pl-[26px] rounded-[4px] cursor-pointer ${
                aboutSection === s ? "text-teal bg-[rgba(94,234,212,0.06)]" : "text-text-faint hover:text-text"
              }`}
            >
              <File size={12} />{s}
            </div>
          ))}
          <div onClick={() => setEduOpen((v) => !v)} className="flex items-center gap-[6px] text-text-dim text-[12px] px-[6px] py-[6px] pl-5 cursor-pointer">
            <span className="text-text-dim shrink-0">{eduOpen ? "▼" : "▶"}</span>
            <Folder size={13} />education
          </div>
          {eduOpen && (
            <div className="pl-[14px]">
              {[
                // "high-school",
                 "university"].map((s) => (
                <div
                  key={s}
                  onClick={() => setAboutSection(s)}
                  className={`flex items-center gap-[7px] text-[12px] px-[6px] py-[6px] pl-[26px] rounded-[4px] cursor-pointer ${
                    aboutSection === s ? "text-teal bg-[rgba(94,234,212,0.06)]" : "text-text-faint hover:text-text"
                  }`}
                >
                  <File size={12} />{s}
                </div>
              ))}
            </div>
          )}
          <div onClick={() => setAboutSection("contacts")} className="flex items-center gap-[6px] text-text-dim text-[12px] px-[6px] py-[6px] cursor-pointer" style={{ color: aboutSection === "contacts" ? "#5eead4" : undefined }}>
            <Folder size={13} />contacts
          </div>
        </div>

        {/* main */}
        <div className="px-[26px] py-[22px] overflow-y-auto text-[12.5px] leading-[1.9]">
          <div className="text-text-dim text-[12px] mb-[14px]">{aboutContent[aboutSection].title}</div>
          <div className="text-text whitespace-pre-line">
            <span className="text-text-faint">/**</span>{"\n"}{aboutContent[aboutSection].body}{"\n"}<span className="text-text-faint">*/</span>
          </div>
        </div>

        {/* side */}
        <div className="border-l border-border px-4 py-[18px] overflow-y-auto">
          <div className="text-text-dim text-[12px] mb-3">// achievements</div>
          {achievements.map((a, i) => (
            <div key={i} className="bg-bg-inset border border-border-soft rounded-[6px] p-3 mb-3">
              <div className="flex items-center gap-[7px] text-teal text-[12px] mb-[6px]"><Award size={13} />hackathon</div>
              <div className="text-text-dim text-[11px] leading-[1.6]">{a.title}</div>
            </div>
          ))}
          <div className="text-text-dim text-[12px] mb-3">// certifications</div>
          <div className="bg-bg-inset border border-border-soft rounded-[6px] p-3 mb-3">
            {certifications.map((c, i) => (
              <div key={i} className="text-text-dim text-[11px] leading-[1.6]" style={{ marginBottom: i < certifications.length - 1 ? 6 : 0 }}>
                <GraduationCap size={11} className="inline align-middle mr-[5px]" />{c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="border-t border-border flex flex-col gap-5 px-6 py-5">
        <div>
          <div className="text-text-dim text-[12px] mb-3">// skills</div>
          <div className="flex flex-wrap gap-3">
            {skillGroups.map((g) => (
              <div key={g.label} className="bg-bg-inset border border-border-soft rounded-[6px] p-3 flex-1 min-w-[140px]">
                <div className="flex items-center gap-[7px] text-teal text-[12px] mb-[6px]"><BadgeCheck size={13} />{g.label}</div>
                <div className="flex flex-wrap gap-[6px]">
                  {g.items.map((it) => (
                    <span key={it} className="text-[10.5px] text-text-dim border border-border-soft px-[7px] py-[3px] rounded-[4px]">{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <TypingPanel />
      </div>
    </div>
  );
}

export default function AboutMe() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? <DesktopAbout /> : <MobileAbout />;
}
