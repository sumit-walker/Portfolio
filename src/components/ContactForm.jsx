import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import emailjs from "@emailjs/browser"
export default function ContactForm({ onSuccess, onChange }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    onChange?.(form);
  }, [form]); // eslint-disable-line
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(field, value) {
    const next = { ...errors };
    if (field === "name" && !value.trim()) next.name = "Required";
    else if (field === "name") delete next.name;

    if (field === "email" && !value.trim()) next.email = "Required";
    else if (field === "email" && !emailRegex.test(value)) next.email = "Wrong email address";
    else if (field === "email") delete next.email;

    if (field === "message" && !value.trim()) next.message = "Required";
    else if (field === "message") delete next.message;

    setErrors(next);
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) validate(field, value);
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate(field, form[field]);
  }

  const isValid = form.name.trim() && emailRegex.test(form.email) && form.message.trim();

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    validate("name", form.name);
    validate("email", form.email);
    validate("message", form.message);
    if (!isValid) return;

    const templateParser = { 
      name: form.name, 
      email: form.email, 
      message: form.message, 
      date: new Date().toDateString() 
    }

    emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      templateParser, {
      publicKey: import.meta.env.VITE_PUBLIC_KEY
      })
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          console.log('FAILED...', err);
        },
      );
      

        onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-[18px] max-w-[340px]">
        <label className="text-[12px] text-text-dim mb-[6px] block">_name:</label>
        <input
          className={`w-full bg-bg-inset border rounded-[5px] px-[11px] py-[9px] text-text font-mono text-[12.5px] outline-none focus:border-teal ${errors.name && touched.name ? "border-red" : "border-border-soft"}`}
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          placeholder="Your name"
        />
        {errors.name && touched.name && <div className="text-red text-[11px] mt-[6px]">{errors.name}</div>}
      </div>

      <div className="mb-[18px] max-w-[340px]">
        <label className="text-[12px] text-text-dim mb-[6px] block">_email:</label>
        <input
          className={`w-full bg-bg-inset border rounded-[5px] px-[11px] py-[9px] text-text font-mono text-[12.5px] outline-none focus:border-teal ${errors.email && touched.email ? "border-red" : "border-border-soft"}`}
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          placeholder="you@example.com"
        />
        {errors.email && touched.email && <div className="text-red text-[11px] mt-[6px]">{errors.email}</div>}
      </div>

      <div className="mb-[18px] max-w-[340px]">
        <label className="text-[12px] text-text-dim mb-[6px] block">_message</label>
        <textarea
          className={`w-full bg-bg-inset border rounded-[5px] px-[11px] py-[9px] text-text font-mono text-[12.5px] outline-none focus:border-teal resize-vertical min-h-[90px] ${errors.message && touched.message ? "border-red" : "border-border-soft"}`}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          placeholder="your message here ..."
        />
        {errors.message && touched.message && <div className="text-red text-[11px] mt-[6px]">{errors.message}</div>}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`bg-orange text-[#1a1206] font-semibold border-none rounded-[5px] px-4 py-[9px] font-mono text-[12.5px] inline-flex items-center gap-[7px] ${isValid ? "cursor-pointer hover:brightness-110" : "opacity-40 cursor-not-allowed"}`}
      >
        <Send size={13} />
        submit-message
      </button>
    </form>
  );
}
