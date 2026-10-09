import type { Metadata } from "next";
import { Crosshair, Gauge, Layers, Sparkles } from "lucide-react";
import {
  CTABanner,
  Container,
  PageHero,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "PropTwin is a Bengaluru-based 3D modeling studio building accurate digital twins of real-estate projects for web, mobile and VR.",
};

const principles = [
  {
    icon: Crosshair,
    title: "Accuracy first",
    text: "Every model is built to scale from your drawings. What buyers see is what gets built.",
  },
  {
    icon: Layers,
    title: "Model once, use everywhere",
    text: "A single source model feeds renders, web, mobile and VR, so nothing drifts out of sync.",
  },
  {
    icon: Gauge,
    title: "Built for real time",
    text: "We optimize geometry and textures so experiences load fast and run smoothly on everyday devices.",
  },
  {
    icon: Sparkles,
    title: "Crafted to sell",
    text: "Lighting, materials and staging are tuned to help buyers fall in love with the space.",
  },
];

const clients = [
  "Real-estate developers",
  "Architects & design firms",
  "Interior designers",
  "Real-estate agencies",
  "Marketing agencies",
  "Construction companies",
  "Property consultants",
  "Individual property owners",
];

export default function AboutPage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="About PropTwin"
        title={
          <>
            We build the digital version{" "}
            <span className="text-white/40">of real places.</span>
          </>
        }
        description="PropTwin is a 3D modeling studio for real estate, based in Bengaluru. We combine architectural modeling with real-time 3D technology to create digital twins buyers can actually explore."
      />

      {/* STORY */}
      <section className="py-24 md:py-32">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <SectionHeading
            index="01"
            eyebrow="Our vision"
            title={
              <>
                A property should be experienced,{" "}
                <span className="text-black/35">not just viewed.</span>
              </>
            }
          />

          <div className="space-y-6 self-end text-lg leading-8 text-black/60">
            <p>
              Real-estate marketing still leans on photographs, brochures
              and site visits. These show a property, but they rarely help
              a buyer understand how a space actually feels.
            </p>
            <p>
              We start where architects leave off: with plans, CAD and BIM
              files. From these we build precise 3D models, then bring them
              to life with materials, light and interaction.
            </p>
            <p className="font-medium text-ink">
              One property → one digital twin → every experience.
            </p>
          </div>
        </Container>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-ink py-24 text-white md:py-32">
        <Container>
          <SectionHeading
            tone="dark"
            index="02"
            eyebrow="How we work"
            title="Principles behind every model."
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <article key={principle.title} className="bg-ink p-8 md:p-10">
                  <Icon size={24} strokeWidth={1.6} className="text-brass" />

                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {principle.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-white/50">
                    {principle.text}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* WHO WE SERVE */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Who we work with"
            title="Built for the real-estate ecosystem."
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((client) => (
              <li key={client} className="bg-paper p-6 font-medium">
                {client}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABanner />
    </main>
  );
}
