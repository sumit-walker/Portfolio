import { Send } from "lucide-react";

export default function ThankYou({ email, onReset }) {
  return (
    <div className="flex flex-col items-start pt-10 max-w-[340px]">
      <div className="text-[18px] text-text mb-2">Thank you! 🤝</div>
      <div className="text-[12px] text-text-dim mb-5 leading-[1.7]">
        Your message has been received. I'll get back to you soon at{" "}
        {email.replace(/(.{2}).+(@.+)/, "$1***$2")}.
      </div>
      <button
        onClick={onReset}
        className="bg-orange text-[#1a1206] font-semibold border-none rounded-[5px] px-4 py-[9px] font-mono text-[12.5px] cursor-pointer inline-flex items-center gap-[7px] hover:brightness-110"
      >
        <Send size={13} />
        send-new-message
      </button>
    </div>
  );
}
