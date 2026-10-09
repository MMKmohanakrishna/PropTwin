import type { Metadata } from "next";
import {
  BarChart3,
  Building2,
  Check,
  Clock3,
  Globe2,
  Layers,
} from "lucide-react";
import {
  ButtonLink,
  CTABanner,
  Container,
  PageHero,
  SectionHeading,
} from "@/components/ui";
import { steps } from "@/components/Process";

export const metadata: Metadata = {
  title: "For Real-Estate Developers",
  description:
    "Sell projects before they're built. PropTwin gives developers 3D models, virtual show flats and interactive walkthroughs for sales and marketing.",
};

const benefits = [
  {
    icon: Clock3,
    title: "Sell before you build",
    text: "Launch with a fully explorable 3D project while construction is still on paper.",
  },
  {
    icon: Building2,
    title: "Virtual show flats",
    text: "Replace or complement physical model flats with digital ones you can update anytime.",
  },
  {
    icon: Globe2,
    title: "Reach remote buyers",
    text: "NRI and out-of-town buyers can explore every unit type without a site visit.",
  },
  {
    icon: Layers,
    title: "One asset, every channel",
    text: "The same model powers your website, brochures, sales app and VR gallery.",
  },
  {
    icon: BarChart3,
    title: "Sharper sales conversations",
    text: "Walk buyers through layouts, views and finishes in real time during meetings.",
  },
];

const requirements = [
  "Floor plans and unit layouts",
  "CAD (DWG/DXF) or BIM (RVT/IFC) files",
  "Existing 3D models, if available",
  "Elevations and site plan",
  "Material and finish specifications",
  "Amenities and landscape details",
];

export default function DevelopersPage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="For real-estate developers"
        title={
          <>
            Sell projects{" "}
            <span className="text-white/40">before they&apos;re built.</span>
          </>
        }
        description="We turn your drawings into 3D models, virtual show flats and interactive walkthroughs your sales team can use from launch day."
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Build Your Project Twin</ButtonLink>
          <ButtonLink href="/experience" variant="secondary">
            See the Demo
          </ButtonLink>
        </div>
      </PageHero>

      {/* BENEFITS */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Why developers choose 3D"
            title={
              <>
                Buyers want to understand a home{" "}
                <span className="text-black/35">before they visit it.</span>
              </>
            }
          />

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  key={benefit.title}
                  className="rounded-3xl border border-black/5 bg-white p-8"
                >
                  <Icon size={24} strokeWidth={1.6} className="text-brass" />

                  <h3 className="mt-8 text-xl font-semibold tracking-tight">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-black/55">
                    {benefit.text}
                  </p>
                </article>
              );
            })}

            <article className="flex flex-col justify-between rounded-3xl bg-ink p-8 text-white">
              <p className="text-xl font-semibold leading-snug tracking-tight">
                Walk through a real apartment we built in Blender and Unity.
              </p>

              <div className="mt-8">
                <ButtonLink href="/experience">Open the demo</ButtonLink>
              </div>
            </article>
          </div>
        </Container>
      </section>

      {/* WHAT YOU PROVIDE */}
      <section className="bg-ink py-24 text-white md:py-32">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <SectionHeading
            tone="dark"
            index="02"
            eyebrow="What you provide"
            title={
              <>
                Send us what you have.{" "}
                <span className="text-white/40">We&apos;ll model the rest.</span>
              </>
            }
            description="Your existing project documentation becomes the foundation of the 3D model. If something's missing, we'll tell you exactly what we need."
          />

          <ul className="grid gap-3 self-end">
            {requirements.map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass">
                  <Check size={14} />
                </span>
                <span className="text-sm text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="How it works"
            title="From drawings to a live digital twin."
          />

          <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.number} className="border-t border-black/15 pt-6">
                <span className="font-mono text-sm text-brass">
                  {step.number}
                </span>

                <h3 className="mt-6 text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/55">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CTABanner
        title="Launching a project soon?"
        description="Talk to us about 3D models, virtual show flats and walkthroughs for your next launch."
      />
    </main>
  );
}
