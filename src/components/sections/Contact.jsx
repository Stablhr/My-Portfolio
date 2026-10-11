import { useState } from "react";
import { Mail, Send, Check, Loader2, MessageSquare, Briefcase } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { profile } from "../../data/profile";
import { SectionTitle } from "../ui/SectionTitle";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { useReveal } from "../../hooks/useReveal";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const SOCIAL_LINKS = [
  { name: "Email", icon: Mail, href: `mailto:${profile.email}`, handle: profile.email, color: "#D44638" },
  { name: "Facebook", icon: FaFacebookF, href: profile.socials.facebook.url, handle: profile.socials.facebook.handle, color: "#1877F2" },
  { name: "Instagram", icon: FaInstagram, href: profile.socials.instagram.url, handle: profile.socials.instagram.handle, color: "#E4405F" },
  { name: "LinkedIn", icon: FaLinkedinIn, href: profile.socials.linkedin.url, handle: profile.socials.linkedin.handle, color: "#0A66C2" },
];

const initialFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const initialErrors = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const reduceMotion = useReducedMotion();
  const [leftRef, leftVisible] = useReveal({ threshold: 0.1 });
  const [rightRef, rightVisible] = useReveal({ threshold: 0.1, rootMargin: "0px 0px -100px 0px" });
  const messageLength = formData.message.length;

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length >= 2 ? "" : "Name must be at least 2 characters";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Please enter a valid email address";
      case "subject":
        return value.trim().length >= 3 ? "" : "Subject must be at least 3 characters";
      case "message":
        return value.trim().length >= 10 ? "" : "Message must be at least 10 characters";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(initialFormState).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        const emailjs = await import("@emailjs/browser");
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: profile.email,
          },
          publicKey
        );
      } else {
        const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
        window.location.href = mailtoLink;
      }

      setShowSuccess(true);
      setFormData(initialFormState);
    } catch (error) {
      console.error("Failed to send message:", error);
      setErrors({ ...errors, form: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setShowSuccess(false);
  };

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-main">
        <SectionTitle id="contact-title" eyebrow="GET IN TOUCH" title="CONTACT ME" className="mb-10 md:mb-14" />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <div
            ref={leftRef}
            className="space-y-8"
            style={{
              animation: leftVisible && !reduceMotion ? "reveal 700ms ease-out forwards" : "none",
              opacity: leftVisible || reduceMotion ? 1 : 0,
            }}
          >
            <div className="space-y-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 bg-surface border border-line rounded-xl transition-all duration-300 hover:border-blue/50 hover:-translate-x-1"
                  aria-label={`${social.name}: ${social.handle}`}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${social.color}20`, color: social.color }}
                  >
                    <social.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-label uppercase tracking-[0.1em] text-ink-dim">{social.name}</p>
                    <p className="text-ink font-medium">{social.handle}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-line">
              <h3 className="text-label uppercase tracking-[0.2em] text-ink-muted mb-4">QUICK LINKS</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" href="#projects" icon={<MessageSquare className="w-4 h-4" />}>
                  View Projects
                </Button>
                <Button variant="outline" size="sm" href="#resume" icon={<Briefcase className="w-4 h-4" />}>
                  Download CV
                </Button>
                <Button variant="outline" size="sm" href={`mailto:${profile.email}`} icon={<Mail className="w-4 h-4" />}>
                  Email Me
                </Button>
              </div>
            </div>
          </div>

          <div
            ref={rightRef}
            style={{
              animation: rightVisible && !reduceMotion ? "reveal 700ms ease-out 150ms forwards" : "none",
              opacity: rightVisible || reduceMotion ? 1 : 0,
            }}
          >
            <Card className="p-4 sm:p-6 md:p-8">
              {showSuccess ? (
                <div className="text-center py-12" role="status" aria-live="polite">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
                    <Check className="w-8 h-8 text-success" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-heading text-chrome mb-2">Thank You!</h3>
                  <p className="text-ink-muted mb-6 max-w-md mx-auto">
                    Your message has been sent successfully. I'll get back to you as soon as possible.
                  </p>
                  <Button variant="primary" onClick={handleSendAnother} icon={<MessageSquare className="w-5 h-5" />}>
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                      Name <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input-field ${errors.name ? "border-danger focus:ring-danger/60" : ""}`}
                      placeholder="Your name"
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1.5 text-xs text-danger" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                      Email <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input-field ${errors.email ? "border-danger focus:ring-danger/60" : ""}`}
                      placeholder="your@email.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-danger" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">
                      Subject <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`input-field ${errors.subject ? "border-danger focus:ring-danger/60" : ""}`}
                      placeholder="What's this about?"
                      aria-invalid={errors.subject ? "true" : "false"}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      disabled={isSubmitting}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="mt-1.5 text-xs text-danger" role="alert">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                      Message <span className="text-danger" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      className={`input-field resize-none ${errors.message ? "border-danger focus:ring-danger/60" : ""}`}
                      placeholder="Your message (minimum 10 characters)..."
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-describedby={errors.message ? "message-error" : "message-counter"}
                      disabled={isSubmitting}
                    />
                    <div className="flex justify-between mt-1.5">
                      {errors.message && (
                        <p id="message-error" className="text-xs text-danger" role="alert">
                          {errors.message}
                        </p>
                      )}
                      <p id="message-counter" className="text-xs text-ink-dim" aria-live="polite">
                        {messageLength}/500
                      </p>
                    </div>
                  </div>

                  {errors.form && (
                    <p className="text-sm text-danger text-center p-3 bg-danger/10 rounded-lg" role="alert">
                      {errors.form}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isSubmitting}
                    iconRight={isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}