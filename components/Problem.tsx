import { Container, Eyebrow } from "@/components/ui";

const comparisons = [
  {
    before: "Static photos & brochures",
    after: "Explorable 3D spaces",
  },
  {
    before: "2D floor plans buyers can't read",
    after: "Walkable, true-to-scale layouts",
  },
  {
    before: "Show flats that cost lakhs to build",
    after: "Digital show flats, reused across every channel",
  },
];

export default function Problem() {
  return (
    <section className="bg-paper py-24 md:py-36">
      <Container className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Eyebrow index="01">Why 3D</Eyebrow>

          <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-[3.5rem]">
            A property should be experienced,{" "}
            <span className="text-black/35">not just viewed.</span>
          </h2>

          <p className="mt-8 max-w-xl text-pretty text-lg leading-8 text-black/60">
            Most buyers can&apos;t picture a home from a floor plan. Photos
            and renders show a single angle. An accurate 3D model lets them
            move through the space, judge proportions and understand the
            layout before they ever visit the site.
          </p>
        </div>

        <div className="self-end">
          <div className="grid grid-cols-2 border-b border-black/10 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-black/40">
            <span>Traditional</span>
            <span>With PropTwin</span>
          </div>

          <ul>
            {comparisons.map((row) => (
              <li
                key={row.before}
                className="grid grid-cols-2 gap-6 border-b border-black/10 py-6"
              >
                <span className="text-black/45 line-through decoration-black/20">
                  {row.before}
                </span>
                <span className="font-medium">{row.after}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
