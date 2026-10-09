import type { Metadata } from "next";
import { Clock, FileBox, Mail, MapPin, Phone } from "lucide-react";
import { Container, PageHero } from "@/components/ui";
import ContactForm from "@/components/ContactForm";
import { contact, inputFormats } from "@/components/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Tell PropTwin about your apartment, villa or real-estate project and get a scope and quote for 3D modeling, renders and interactive digital twins.",
};

export default function ContactPage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="Request a quote"
        title={
          <>
            Let&apos;s model your{" "}
            <span className="text-white/40">next project.</span>
          </>
        }
        description="Tell us about your property and the files you have. We'll come back with a scope, timeline and quote."
      />

      <section className="py-20 md:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <aside className="space-y-10">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Talk to the studio.
              </h2>

              <p className="mt-4 max-w-md leading-7 text-black/55">
                Whether it&apos;s a single show flat or an entire township,
                we&apos;ll help you choose the right level of detail and the
                right channels: web, mobile or VR.
              </p>
            </div>

            <ul className="space-y-6">
              <ContactItem icon={<Phone size={18} />} title="Phone" href={contact.phoneHref}>
                {contact.phone}
              </ContactItem>

              <ContactItem icon={<Mail size={18} />} title="Email" href={`mailto:${contact.email}`}>
                {contact.email}
              </ContactItem>

              <ContactItem icon={<MapPin size={18} />} title="Office">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </ContactItem>

              <ContactItem icon={<Clock size={18} />} title="Response time">
                Within one business day
              </ContactItem>
            </ul>

            <div className="rounded-2xl border border-black/10 p-6">
              <p className="flex items-center gap-2 text-sm font-medium">
                <FileBox size={18} className="text-brass" />
                Files we work from
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {inputFormats.map((format) => (
                  <li
                    key={format}
                    className="rounded-full bg-sand px-3 py-1 font-mono text-xs text-black/65"
                  >
                    {format}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.04),0_30px_80px_-40px_rgba(0,0,0,0.3)] md:p-10">
            <ContactForm />
          </div>
        </Container>
      </section>
    </main>
  );
}

function ContactItem({
  icon,
  title,
  href,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  const body = (
    <span className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-brass">
        {icon}
      </span>

      <span>
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
          {title}
        </span>
        <span className="mt-1 block text-sm leading-6 text-black/75">
          {children}
        </span>
      </span>
    </span>
  );

  return (
    <li>
      {href ? (
        <a href={href} className="block transition hover:opacity-70">
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}
