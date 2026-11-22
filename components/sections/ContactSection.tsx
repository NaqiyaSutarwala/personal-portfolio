import { CopyButton } from "@/components/ui/CopyButton";
import { SOCIAL_LINKS } from "@/constants/portfolio";

export function ContactSection() {
  const email = SOCIAL_LINKS.find((link) => link.id === "email");
  const others = SOCIAL_LINKS.filter((link) => link.id !== "email");

  return (
    <section id="contact" className="contact">
      <h2 className="contact-title">
        <span data-motion="left">Add me to</span> <span data-motion="right">your stack.</span>
      </h2>
      {email && (
        <a className="contact-email" data-motion="left" href={email.href}>
          {email.label}
        </a>
      )}
      <div className="actions">
        {email && <CopyButton value={email.label} />}
        {others.map((link) => (
          <a
            className="button button-outline"
            key={link.id}
            href={link.href}
            target={link.isExternal ? "_blank" : undefined}
            rel={link.isExternal ? "noopener noreferrer" : undefined}
          >
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
