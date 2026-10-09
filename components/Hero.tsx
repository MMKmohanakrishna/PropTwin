import { Container, ButtonLink } from "@/components/ui";
import VillaModel from "@/components/VillaModel";
import { inputFormats } from "@/components/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_40%,black_10%,transparent_65%)]" />
      <div className="absolute right-[-10%] top-[10%] h-[640px] w-[640px] rounded-full bg-brass/10 blur-[120px]" />

      <Container className="relative grid min-h-[100svh] items-center gap-10 pb-16 pt-32 lg:grid-cols-[1fr_1.05fr] lg:gap-6 lg:pt-24">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brass" />
            3D Modeling Studio for Real Estate
          </p>

          <h1 className="mt-7 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl xl:text-[5.25rem]">
            From floor plan
            <br />
            to{" "}
            <span className="bg-gradient-to-r from-brass-light to-brass bg-clip-text text-transparent">
              digital twin.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-white/60">
            We turn your drawings, CAD and BIM files into precise 3D models,
            photoreal renders and interactive walkthroughs your buyers can
            explore on the web, on mobile and in VR.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Start Your 3D Model</ButtonLink>
            <ButtonLink href="/experience" variant="secondary">
              Walk Through a Project
            </ButtonLink>
          </div>
        </div>

        <div className="relative h-[420px] sm:h-[520px] lg:h-[640px]">
          <VillaModel />
        </div>
      </Container>

      {/* Supported formats strip */}
      <div className="relative border-t border-white/10 bg-black/30">
        <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-10">
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            We model from
          </p>

          <ul className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-sm text-white/70">
            {inputFormats.map((format) => (
              <li key={format}>{format}</li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  );
}
