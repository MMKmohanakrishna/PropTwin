import type { Metadata } from "next";
import {
  ArrowUpRight,
  Clock,
  FileBox,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Container, PageHero } from "@/components/ui";
import { contact, inputFormats } from "@/components/site";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Contact PropTwin on WhatsApp, email or phone for a scope and quote for 3D modeling, renders and interactive digital twins.",
};

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: contact.phone,
    note: "Fastest reply. Send your plans right in the chat.",
    href: contact.whatsappHref,
    cta: "Chat on WhatsApp",
    primary: true,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: contact.email,
    note: "Best for CAD/BIM files and detailed briefs.",
    href: `mailto:${contact.email}?subject=${encodeURIComponent("3D model quote request")}`,
    cta: "Send an email",
    primary: false,
    external: false,
  },
  {
    icon: Phone,
    label: "Phone",
    value: contact.phone,
    note: "Talk to the studio directly.",
    href: contact.phoneHref,
    cta: "Call now",
    primary: false,
    external: false,
  },
];

const checklist = [
  "Project location and type (apartment, villa, township…)",
  "Floor plans, CAD or BIM files you already have",
  "What you need: model, renders, web walkthrough, VR",
  "Your timeline or launch date",
];

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
        description="Message us on WhatsApp, email or call. Share your plans and we'll come back with a scope, timeline and quote."
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {channels.map((channel) => {
              const Icon = channel.icon;

              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group flex flex-col rounded-[2rem] p-8 transition hover:-translate-y-0.5 md:p-10 ${
                    channel.primary
                      ? "bg-ink text-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]"
                      : "border border-black/5 bg-white hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      channel.primary ? "bg-white/10 text-brass" : "bg-ink text-brass"
                    }`}
                  >
                    <Icon size={22} strokeWidth={1.6} />
                  </span>

                  <p
                    className={`mt-10 font-mono text-[11px] uppercase tracking-[0.22em] ${
                      channel.primary ? "text-brass" : "text-black/40"
                    }`}
                  >
                    {channel.label}
                  </p>

                  <p className="mt-2 break-all text-xl font-semibold tracking-tight">
                    {channel.value}
                  </p>

                  <p
                    className={`mt-3 flex-1 text-sm leading-6 ${
                      channel.primary ? "text-white/55" : "text-black/55"
                    }`}
                  >
                    {channel.note}
                  </p>

                  <span
                    className={`mt-8 inline-flex items-center gap-2 self-start rounded-full px-5 py-3 text-sm font-medium transition ${
                      channel.primary
                        ? "bg-white text-ink group-hover:bg-brass-light"
                        : "bg-ink text-white group-hover:bg-black/80"
                    }`}
                  >
                    {channel.cta}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              );
            })}
          </div>

          <div className="mt-16 grid gap-12 border-t border-black/10 pt-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                What to send us
              </h2>

              <ol className="mt-8 space-y-4">
                {checklist.map((item, index) => (
                  <li key={item} className="flex gap-4">
                    <span className="font-mono text-sm text-brass">
                      0{index + 1}
                    </span>
                    <span className="text-black/70">{item}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-10 rounded-2xl border border-black/10 p-6">
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
            </div>

            <ul className="space-y-8 self-start">
              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-brass">
                  <MapPin size={18} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Studio
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-black/75">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
              </li>

              <li className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-brass">
                  <Clock size={18} />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                    Response time
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-black/75">
                    Within one business day
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
}
