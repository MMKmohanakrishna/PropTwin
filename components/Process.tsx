import { Container, SectionHeading } from "@/components/ui";

export const steps = [
  {
    number: "01",
    title: "Brief & Source Files",
    text: "Share floor plans, CAD/BIM files, elevations, specifications and reference images. We confirm scope and level of detail.",
    output: "Scope & timeline",
  },
  {
    number: "02",
    title: "Geometry & Modeling",
    text: "We build scale-accurate 3D geometry for structure, walls, openings, joinery and furniture.",
    output: "Clay model review",
  },
  {
    number: "03",
    title: "Materials & Lighting",
    text: "PBR materials, finishes and lighting are applied to match your specification and brand.",
    output: "Render previews",
  },
  {
    number: "04",
    title: "Optimize & Deploy",
    text: "The model is optimized for real time and published to web, mobile and VR, plus final renders.",
    output: "Live digital twin",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-sand py-24 md:py-36"
    >
      <div className="bg-blueprint-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <Container className="relative">
        <SectionHeading
          index="04"
          eyebrow="Modeling Pipeline"
          title={
            <>
              From property data{" "}
              <span className="text-black/35">to digital experience.</span>
            </>
          }
          description="A clear, four-stage pipeline with a review at every step, so the model is right before anything goes live."
        />

        <ol className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.number}
              className="flex flex-col rounded-3xl border border-black/5 bg-white/70 p-7 backdrop-blur"
            >
              <span className="font-mono text-sm text-brass">
                {step.number}
              </span>

              <h3 className="mt-10 text-xl font-semibold tracking-tight">
                {step.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-black/55">
                {step.text}
              </p>

              <p className="mt-8 border-t border-black/10 pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-black/45">
                → {step.output}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
