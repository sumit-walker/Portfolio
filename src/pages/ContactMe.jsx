import { useState } from "react";
import { Mail, Phone, ExternalLink, Send } from "lucide-react";
import { profile } from "../data/portfolioData";
import AccordionSection from "../components/AccordionSection";
import ContactForm from "../components/ContactForm";
import ThankYou from "../components/ThankYou";
import useMediaQuery from "../hooks/useMediaQuery";

/* ---------- mobile layout ---------- */
function MobileContact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = form.name.trim() && emailRegex.test(form.email) && form.message.trim();

  const today = new Date().toDateString().slice(0, 10);

  if (submitted) {
    return (
      <div className="flex flex-col min-h-0">
        <div className="px-[18px] h-8 flex items-center border-b border-border text-[12px] text-teal">
          _contact-me
        </div>
        <div className="px-[18px] py-10 flex-1">
          <ThankYou email={profile.email} onReset={() => setSubmitted(false)} />
        </div>
      </div>
    );
  }

  


  return (
    <div className="flex flex-col min-h-0">
      <div className="px-[18px] h-8 flex items-center border-b border-border text-[12px] text-teal">
        _contact-me
      </div>

      <AccordionSection label="contacts" icon="📇" defaultOpen={true}>
        <div className="px-[18px] py-4 bg-bg-inset space-y-3">
          <div className="flex items-center gap-3 text-[13px] text-text-dim">
            <Mail size={14} />
            <a href={`mailto:${profile.email}`} className="text-text-dim no-underline hover:text-teal">
              {profile.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-[13px] text-text-dim">
            <Phone size={14} />
            <a href={`tel:${profile.phone}`} className="text-text-dim no-underline hover:text-teal">
              {profile.phone}
            </a>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection label="find-me-also-in" icon="🔗" defaultOpen={true}>
        <div className="px-[18px] py-4 bg-bg-inset space-y-3">
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[13px] text-text-dim no-underline hover:text-teal">
            <ExternalLink size={14} /> GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-[13px] text-text-dim no-underline hover:text-teal">
            <ExternalLink size={14} /> LinkedIn
          </a>
        </div>
      </AccordionSection>

      <div className="px-[18px] py-5">
        <div className="mb-[18px]">
          <label className="text-[12px] text-text-dim mb-[6px] block">_name:</label>
          <input
            className="w-full bg-bg-inset border border-border-soft rounded-[5px] px-[11px] py-[9px] text-text font-mono text-[13px] outline-none focus:border-teal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </div>
        <div className="mb-[18px]">
          <label className="text-[12px] text-text-dim mb-[6px] block">_email:</label>
          <input
            className="w-full bg-bg-inset border border-border-soft rounded-[5px] px-[11px] py-[9px] text-text font-mono text-[13px] outline-none focus:border-teal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-[18px]">
          <label className="text-[12px] text-text-dim mb-[6px] block">_message</label>
          <textarea
            className="w-full bg-bg-inset border border-border-soft rounded-[5px] px-[11px] py-[9px] text-text font-mono text-[13px] outline-none focus:border-teal resize-vertical min-h-[90px]"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="your message here ..."
          />
        </div>

        <div className="text-[11px] leading-[1.9] text-text-dim mb-4 bg-bg-inset border border-border-soft rounded-[6px] p-3">
          <div><span className="text-text-faint">1 </span><span className="text-[#c792ea]">const</span> message = {"{"}</div>
          <div><span className="text-text-faint">2 </span>&nbsp;&nbsp;<span className="text-[#82aaff]">name</span>: <span className="text-[#7ec699]">"{form.name}"</span>,</div>
          <div><span className="text-text-faint">3 </span>&nbsp;&nbsp;<span className="text-[#82aaff]">email</span>: <span className="text-[#7ec699]">"{form.email}"</span>,</div>
          <div><span className="text-text-faint">4 </span>&nbsp;&nbsp;<span className="text-[#82aaff]">message</span>: <span className="text-[#7ec699]">"{form.message}"</span>,</div>
          <div><span className="text-text-faint">5 </span>&nbsp;&nbsp;<span className="text-[#82aaff]">date</span>: <span className="text-[#7ec699]">"{today}"</span></div>
          <div><span className="text-text-faint">6</span>{"}"}</div>
        </div>

        <button
          onClick={() => { if (isValid) setSubmitted(true); }}
          disabled={!isValid}
          className={`w-full font-mono text-[13px] py-[12px] rounded-[6px] flex items-center justify-center gap-2 font-semibold border-none ${
            isValid ? "bg-orange text-[#1a1206] cursor-pointer hover:brightness-110" : "bg-border text-text-faint cursor-not-allowed"
          }`}
        >
          <Send size={14} />
          submit-message
        </button>
      </div>
    </div>
  );
}

/* ---------- desktop layout ---------- */
function DesktopContact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const today = new Date().toDateString().slice(0, 10);

  return (
    <div className="flex-1 grid grid-cols-[210px_1fr_300px] min-h-0">
      <div className="border-r border-border px-[14px] py-[18px] overflow-y-auto">
        <div className="text-text-dim text-[12px] mb-[10px]">▾ contacts</div>
        <div className="flex items-center gap-2 text-[11.5px] text-text-dim py-[6px] break-all">
          <Mail size={12} />
          <a href={`mailto:${profile.email}`} className="text-text-dim no-underline hover:text-teal">{profile.email}</a>
        </div>
        <div className="flex items-center gap-2 text-[11.5px] text-text-dim py-[6px] break-all">
          <Phone size={12} />
          <a href={`tel:${profile.phone}`} className="text-text-dim no-underline hover:text-teal">{profile.phone}</a>
        </div>
        <div className="h-[1px] bg-border-soft my-[14px]" />
        <div className="text-text-dim text-[12px] mb-[10px]">▾ find-me-also-in</div>
        <div className="flex items-center gap-2 text-[11.5px] py-[6px]">
          <a href={profile.github} target="_blank" rel="noreferrer" className="text-text-dim no-underline flex items-center gap-2 hover:text-teal">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            GitHub
          </a>
        </div>
        <div className="flex items-center gap-2 text-[11.5px] py-[6px]">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-text-dim no-underline flex items-center gap-2 hover:text-teal">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            LinkedIn
          </a>
        </div>
      </div>

      <div className="px-[26px] py-6 overflow-y-auto">
        {!submitted ? (
          <ContactForm onSuccess={() => setSubmitted(true)} onChange={setForm} />
        ) : (
          <ThankYou email={profile.email} onReset={() => setSubmitted(false)} />
        )}
      </div>

      <div className="border-l border-border px-[18px] py-[18px] overflow-y-auto text-[11.5px] leading-[1.9]">
        <div className="whitespace-pre-wrap break-all"><span className="text-text-faint inline-block w-[18px] select-none">1</span><span className="text-[#c792ea]">const</span> message = {"{"}</div>
        <div className="whitespace-pre-wrap break-all"><span className="text-text-faint inline-block w-[18px] select-none">2</span>&nbsp;&nbsp;<span className="text-[#82aaff]">name</span>: <span className="text-[#7ec699]">"{form.name}"</span>,</div>
        <div className="whitespace-pre-wrap break-all"><span className="text-text-faint inline-block w-[18px] select-none">3</span>&nbsp;&nbsp;<span className="text-[#82aaff]">email</span>: <span className="text-[#7ec699]">"{form.email}"</span>,</div>
        <div className="whitespace-pre-wrap break-all"><span className="text-text-faint inline-block w-[18px] select-none">4</span>&nbsp;&nbsp;<span className="text-[#82aaff]">message</span>: <span className="text-[#7ec699]">"{form.message}"</span>,</div>
        <div className="whitespace-pre-wrap break-all"><span className="text-text-faint inline-block w-[18px] select-none">5</span>&nbsp;&nbsp;<span className="text-[#82aaff]">date</span>: <span className="text-[#7ec699]">"{today}"</span></div>
        <div className="whitespace-pre-wrap break-all"><span className="text-text-faint inline-block w-[18px] select-none">6</span>{"}"}</div>
        <div className="whitespace-pre-wrap break-all">&nbsp;</div>
        <div className="whitespace-pre-wrap break-all"><span className="text-text-faint inline-block w-[18px] select-none">7</span><span className="text-[#ffcb6b]">button</span>.addEventListener(<span className="text-[#7ec699]">'click'</span>, () =&gt; {"{"}</div>
        <div className="whitespace-pre-wrap break-all"><span className="text-text-faint inline-block w-[18px] select-none">8</span>&nbsp;&nbsp;form.send(message);</div>
        <div className="whitespace-pre-wrap break-all"><span className="text-text-faint inline-block w-[18px] select-none">9</span>{"}"})</div>
      </div>
    </div>
  );
}

export default function ContactMe() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? <DesktopContact /> : <MobileContact />;
}
