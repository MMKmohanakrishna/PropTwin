import { Glasses, Monitor, Smartphone } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";
import { outputFormats } from "@/components/site";

const channels = [
  {
    icon: Monitor,
    title: "Web",
    subtitle: "Explore in the browser",
    description:
      "An embeddable 3D viewer for your website and listings. Buyers open a link and explore, with nothing to install.",
  },
  {
    icon: Smartphone,
    title: "Mobile",
    subtitle: "Property in your pocket",
    description:
      "Touch-friendly models for Android and iOS, with AR so buyers can view a unit at tabletop scale.",
  },
  {
    icon: Glasses,
    title: "VR",
    subtitle: "Step inside the property",
    description:
      "Headset-ready walkthroughs for sales galleries and exhibitions, so buyers feel the true scale of every room.",
  },
];

export default function Channels() {
  return (
    <section id="channels" className="bg-ink py-24 text-white md:py-36">
      <Container>
        <SectionHeading
          tone="dark"
          index="05"
          eyebrow="One Twin · Three Channels"
          title={
            <>
              Your property,{" "}
              <span className="text-white/40">wherever your buyer is.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {channels.map((channel, index) => {
            const Icon = channel.icon;

            return (
              <article
                key={channel.title}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent p-8 md:p-10"
              >
                <div className="flex items-center justify-between">
                  <Icon size={28} strokeWidth={1.5} className="text-brass" />
                  <span className="font-mono text-xs text-white/35">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-16 text-3xl font-semibold tracking-tight">
                  {channel.title}
                </h3>

                <p className="mt-1 text-white/70">{channel.subtitle}</p>

                <p className="mt-5 text-sm leading-6 text-white/45">
                  {channel.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/10 px-6 py-5 md:flex-row md:items-center md:gap-10">
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            Delivered as
          </p>

          <ul className="flex flex-wrap gap-2">
            {outputFormats.map((format) => (
              <li
                key={format}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-white/70"
              >
                {format}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
