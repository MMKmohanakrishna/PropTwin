import Link from "next/link";
import {
  ArrowUpRight,
  Box,
  Camera,
  Glasses,
  Monitor,
  Sofa,
  Smartphone,
} from "lucide-react";
import { Container, SectionHeading } from "@/components/ui";

export const services = [
  {
    icon: Box,
    title: "Architectural 3D Modeling",
    text: "Precise exterior and building models built from your CAD, BIM or PDF drawings, true to scale and dimension.",
    tag: "LOD 300–400",
  },
  {
    icon: Sofa,
    title: "Interior Modeling & Staging",
    text: "Fully furnished interiors with real materials, fixtures and finishes that match your specification sheet.",
    tag: "PBR materials",
  },
  {
    icon: Camera,
    title: "Photoreal Rendering",
    text: "Marketing-grade still renders, 360° panoramas and animated flythroughs, all from the same model.",
    tag: "4K · 360°",
  },
  {
    icon: Monitor,
    title: "Interactive Web 3D",
    text: "Real-time, browser-based walkthroughs with room navigation and hotspots. Embed them on any website.",
    tag: "WebGL",
  },
  {
    icon: Smartphone,
    title: "Mobile & AR",
    text: "Optimized models for Android and iOS, including AR so buyers can place a unit on their table.",
    tag: "GLB · USDZ",
  },
  {
    icon: Glasses,
    title: "VR Walkthroughs",
    text: "Immersive walkthroughs for headsets, ready for sales galleries, exhibitions and remote buyers.",
    tag: "WebXR",
  },
];

export default function Solutions() {
  return (
    <section id="services" className="bg-ink py-24 text-white md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="dark"
            index="02"
            eyebrow="3D Modeling Services"
            title={
              <>
                One model.{" "}
                <span className="text-white/40">Every deliverable.</span>
              </>
            }
            description="We build a single, accurate 3D model of your property, then turn it into everything your sales and marketing teams need."
          />

          <Link
            href="/solutions"
            className="group inline-flex shrink-0 items-center gap-2 text-sm text-white/70 transition hover:text-white"
          >
            All services
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group relative bg-ink p-8 transition-colors hover:bg-ink-2 md:p-10"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brass transition group-hover:border-brass/40">
                    <Icon size={22} strokeWidth={1.6} />
                  </span>

                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                    {service.tag}
                  </span>
                </div>

                <h3 className="mt-10 text-xl font-semibold tracking-tight">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  {service.text}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
