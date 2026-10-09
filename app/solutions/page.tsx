import type { Metadata } from "next";
import { Check } from "lucide-react";
import {
  ButtonLink,
  CTABanner,
  Container,
  PageHero,
  SectionHeading,
} from "@/components/ui";
import { services } from "@/components/Solutions";
import VillaModel from "@/components/VillaModel";
import { inputFormats, outputFormats } from "@/components/site";

export const metadata: Metadata = {
  title: "3D Modeling Services",
  description:
    "Architectural and interior 3D modeling, photoreal rendering, interactive web 3D, mobile AR and VR walkthroughs for real-estate projects.",
};

const serviceDetails: Record<string, string[]> = {
  "Architectural 3D Modeling": [
    "Exterior & façade modeling",
    "Floor-by-floor geometry",
    "Site, landscape & amenities",
    "BIM / IFC compatible",
  ],
  "Interior Modeling & Staging": [
    "Furniture & fixture modeling",
    "Material-accurate finishes",
    "Multiple design options",
    "Kitchen & bath detailing",
  ],
  "Photoreal Rendering": [
    "4K still renders",
    "360° panoramas",
    "Day / dusk / night lighting",
    "Animated flythroughs",
  ],
  "Interactive Web 3D": [
    "Embeddable 3D viewer",
    "Room-to-room navigation",
    "Hotspots & unit info",
    "Works on any browser",
  ],
  "Mobile & AR": [
    "Android & iOS ready",
    "AR tabletop models",
    "Touch-first controls",
    "Optimized file sizes",
  ],
  "VR Walkthroughs": [
    "Headset walkthroughs",
    "True 1:1 scale",
    "Sales-gallery setups",
    "WebXR browser VR",
  ],
};

const levels = [
  {
    level: "LOD 200",
    name: "Massing",
    text: "Volumes, heights and site context. Ideal for early-stage launches and master plans.",
  },
  {
    level: "LOD 300",
    name: "Detailed",
    text: "Accurate walls, openings, slabs and façade elements. Ready for marketing renders and walkthroughs.",
  },
  {
    level: "LOD 400",
    name: "Show-flat",
    text: "Fully furnished interiors, fixtures and finishes, for photoreal and VR experiences.",
  },
];

const propertyTypes = [
  "Residential apartments",
  "Villas & row houses",
  "Luxury residences",
  "Gated communities",
  "Townships & master plans",
  "Commercial & office",
];

export default function SolutionsPage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="Services"
        title={
          <>
            3D modeling that turns{" "}
            <span className="text-white/40">plans into experiences.</span>
          </>
        }
        description="One accurate 3D model of your property becomes renders, web walkthroughs, mobile AR and VR, all from a single source of truth."
        aside={<VillaModel />}
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Request a Quote</ButtonLink>
          <ButtonLink href="/experience" variant="secondary">
            See Live Project
          </ButtonLink>
        </div>
      </PageHero>

      {/* SERVICES */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="What we deliver"
            title="Six services. One model behind them all."
          />

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="group rounded-3xl border border-black/5 bg-white p-8 transition hover:-translate-y-0.5 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-brass">
                      <Icon size={22} strokeWidth={1.6} />
                    </span>

                    <span className="font-mono text-xs text-black/30">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>

                  <p className="mt-3 leading-7 text-black/55">
                    {service.text}
                  </p>

                  <ul className="mt-7 grid gap-x-4 gap-y-2.5 border-t border-black/10 pt-6 sm:grid-cols-2">
                    {serviceDetails[service.title]?.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-sm text-black/65"
                      >
                        <Check size={15} className="shrink-0 text-brass" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* LEVEL OF DETAIL */}
      <section className="bg-ink py-24 text-white md:py-32">
        <Container>
          <SectionHeading
            tone="dark"
            index="02"
            eyebrow="Level of detail"
            title={
              <>
                The right detail{" "}
                <span className="text-white/40">for the right stage.</span>
              </>
            }
            description="We scope every model to the level of detail your launch needs, so you never pay for detail you won't use."
          />

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {levels.map((item, index) => (
              <div
                key={item.level}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8"
              >
                <div className="flex items-center gap-1.5">
                  {levels.map((_, dot) => (
                    <span
                      key={dot}
                      className={`h-1.5 w-8 rounded-full ${
                        dot <= index ? "bg-brass" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                <p className="mt-10 font-mono text-sm text-brass">
                  {item.level}
                </p>

                <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                  {item.name}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PIPELINE: INPUT → TWIN → OUTPUT */}
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="How it connects"
            title="Your files in. A digital twin out."
          />

          <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <FlowCard label="Input" title="Your source files">
              <ul className="flex flex-wrap gap-2">
                {inputFormats.map((format) => (
                  <li key={format} className="rounded-full bg-sand px-3 py-1 font-mono text-xs text-black/65">
                    {format}
                  </li>
                ))}
              </ul>
            </FlowCard>

            <FlowArrow />

            <FlowCard label="PropTwin" title="Digital twin" dark>
              <p className="text-sm leading-6 text-white/55">
                One scale-accurate, optimized 3D model with materials,
                lighting and room metadata.
              </p>
            </FlowCard>

            <FlowArrow />

            <FlowCard label="Output" title="Every channel">
              <ul className="flex flex-wrap gap-2">
                {outputFormats.map((format) => (
                  <li key={format} className="rounded-full bg-sand px-3 py-1 font-mono text-xs text-black/65">
                    {format}
                  </li>
                ))}
              </ul>
            </FlowCard>
          </div>
        </Container>
      </section>

      {/* PROPERTY TYPES */}
      <section className="border-t border-black/10 py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            index="04"
            eyebrow="Property types"
            title="Built for every kind of real-estate project."
          />

          <ul className="grid gap-px self-end overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2">
            {propertyTypes.map((type) => (
              <li key={type} className="bg-paper p-6 font-medium">
                {type}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABanner />
    </main>
  );
}

function FlowCard({
  label,
  title,
  dark = false,
  children,
}: {
  label: string;
  title: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-3xl p-8 ${
        dark
          ? "bg-ink text-white"
          : "border border-black/5 bg-white"
      }`}
    >
      <p className={`font-mono text-[11px] uppercase tracking-[0.22em] ${dark ? "text-brass" : "text-black/40"}`}>
        {label}
      </p>

      <h3 className="mb-6 mt-3 text-2xl font-semibold tracking-tight">
        {title}
      </h3>

      {children}
    </div>
  );
}

function FlowArrow() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center font-mono text-2xl text-black/25 lg:px-2"
    >
      <span className="rotate-90 lg:rotate-0">→</span>
    </div>
  );
}
