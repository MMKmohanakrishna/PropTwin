import { Mail, MapPin, Phone } from "lucide-react";
import { Container, ButtonLink, Eyebrow } from "@/components/ui";
import { contact } from "@/components/site";

export default function CTA() {
  return (
    <section id="contact" className="bg-paper py-24 md:py-36">
      <Container className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <Eyebrow index="06">Start a Project</Eyebrow>

          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Ready to see your project in 3D?
          </h2>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-8 text-black/60">
            Share your drawings and tell us what you need: a single
            apartment model, a full township or a VR sales gallery. We&apos;ll
            come back with scope, timeline and a quote.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact" tone="light">
              Request a Quote
            </ButtonLink>
            <ButtonLink href={`mailto:${contact.email}`} tone="light" variant="secondary">
              Email the studio
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_1px_0_rgba(0,0,0,0.04),0_20px_60px_-30px_rgba(0,0,0,0.25)] md:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">
            PropTwin Studio
          </p>

          <ul className="mt-8 space-y-7">
            <li className="flex gap-4">
              <MapPin size={20} className="mt-0.5 shrink-0 text-brass" />
              <div>
                <p className="text-sm font-medium">Office</p>
                <p className="mt-1 text-sm leading-6 text-black/55">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </li>

            <li className="flex gap-4">
              <Phone size={20} className="mt-0.5 shrink-0 text-brass" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <a
                  href={contact.phoneHref}
                  className="mt-1 block text-sm text-black/55 transition hover:text-ink"
                >
                  {contact.phone}
                </a>
              </div>
            </li>

            <li className="flex gap-4">
              <Mail size={20} className="mt-0.5 shrink-0 text-brass" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 block text-sm text-black/55 transition hover:text-ink"
                >
                  {contact.email}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}
