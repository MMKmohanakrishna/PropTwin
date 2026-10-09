import type { Metadata } from "next";
import { Hand, Maximize2, MousePointerClick, Navigation } from "lucide-react";
import DigitalTwin from "@/components/DigitalTwin";
import {
  CTABanner,
  Container,
  PageHero,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Interactive 3D Demo",
  description:
    "Explore a real-time 2BHK digital twin in your browser. Orbit the 3D model, jump between rooms and see how buyers experience a PropTwin property.",
};

const features = [
  {
    icon: Navigation,
    title: "Room navigation",
    text: "Jump between the living room, bedrooms, kitchen and balcony with a single click.",
  },
  {
    icon: MousePointerClick,
    title: "Interactive hotspots",
    text: "Select glowing markers inside the model to fly the camera into each space.",
  },
  {
    icon: Hand,
    title: "Free orbit & zoom",
    text: "Drag to orbit and scroll to zoom. Inspect the layout from any angle.",
  },
  {
    icon: Maximize2,
    title: "Full-screen presentation",
    text: "Go full-screen for sales meetings, exhibitions and client walkthroughs.",
  },
];

export default function ExperiencePage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="Interactive 3D demo"
        title={
          <>
            Step inside the{" "}
            <span className="text-white/40">digital twin.</span>
          </>
        }
        description="A real-time 2BHK model running directly in your browser, built the same way we build every client project."
      />

      <section className="-mt-12 pb-24 md:-mt-16 md:pb-32">
        <Container className="relative">
          <DigitalTwin />

          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-black/40">
            Prototype model · Runs in any modern browser · No install required
          </p>
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Demo features"
            title="Explore the property your way."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-black/5 bg-white p-7"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-brass">
                    <Icon size={20} strokeWidth={1.6} />
                  </span>

                  <h3 className="mt-8 text-lg font-semibold tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-black/55">
                    {feature.text}
                  </p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-ink py-24 text-white md:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            tone="dark"
            index="02"
            eyebrow="What your project gets"
            title={
              <>
                This demo is a prototype.{" "}
                <span className="text-white/40">Yours goes further.</span>
              </>
            }
          />

          <ul className="space-y-px self-end overflow-hidden rounded-2xl border border-white/10 bg-white/10">
            {[
              "Your exact floor plans, modeled to scale",
              "Real materials, finishes and furniture",
              "Your branding, unit data and pricing hotspots",
              "Deployment to your website, app and VR headsets",
              "Matching photoreal renders and 360° panoramas",
            ].map((item, index) => (
              <li
                key={item}
                className="flex items-center gap-5 bg-ink px-6 py-5"
              >
                <span className="font-mono text-xs text-brass">
                  0{index + 1}
                </span>
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABanner
        title="Want this for your project?"
        description="Share your floor plans and we'll show you what your property looks like as an interactive digital twin."
      />
    </main>
  );
}
