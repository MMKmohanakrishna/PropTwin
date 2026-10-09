import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Tone = "dark" | "light";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** Small mono label with an index, e.g. "01 — SERVICES". */
export function Eyebrow({
  children,
  index,
  tone = "light",
}: {
  children: React.ReactNode;
  index?: string;
  tone?: Tone;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] ${
        tone === "dark" ? "text-white/45" : "text-black/45"
      }`}
    >
      {index && <span className="text-brass">{index}</span>}
      {index && (
        <span
          className={`h-px w-8 ${tone === "dark" ? "bg-white/20" : "bg-black/20"}`}
        />
      )}
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  tone = "light",
  align = "left",
  className = "",
}: {
  eyebrow: string;
  index?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto text-center [&>p:first-child]:justify-center" : ""} max-w-3xl ${className}`}
    >
      <Eyebrow index={index} tone={tone}>
        {eyebrow}
      </Eyebrow>

      <h2
        className={`mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl lg:text-[3.5rem] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-6 text-pretty text-lg leading-8 ${
            centered ? "mx-auto" : ""
          } max-w-2xl ${tone === "dark" ? "text-white/55" : "text-black/55"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Dark hero used at the top of every inner page. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  children?: React.ReactNode;
  /** Optional visual (e.g. a 3D model) shown to the right on large screens. */
  aside?: React.ReactNode;
}) {
  return (
    <section
      className={`relative overflow-hidden bg-ink text-white ${
        // With a 3D model the hero fills the first screen, so the next
        // (light) section never peeks in at the bottom edge.
        aside ? "lg:min-h-[100svh]" : ""
      }`}
    >
      <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
      <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brass/10 blur-3xl" />

      <Container
        className={`relative pb-24 pt-32 md:pb-32 md:pt-36 ${
          aside ? "grid items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-4 lg:pb-16 lg:pt-28" : ""
        }`}
      >
        <div>
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>

          <h1
            className={`mt-6 max-w-5xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.04em] ${
              aside ? "md:text-6xl xl:text-7xl" : "md:text-7xl"
            }`}
          >
            {title}
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-white/60">
            {description}
          </p>

          {children}
        </div>

        {aside && (
          <div className="relative -mx-5 h-[360px] sm:mx-0 sm:h-[460px] lg:-mr-16 lg:-mt-6 lg:h-[540px]">
            {aside}
          </div>
        )}
      </Container>
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  tone = "dark",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  tone?: Tone;
}) {
  const styles =
    variant === "primary"
      ? tone === "dark"
        ? "bg-white text-ink hover:bg-brass-light"
        : "bg-ink text-white hover:bg-black/80"
      : tone === "dark"
        ? "border border-white/25 text-white hover:border-white hover:bg-white/5"
        : "border border-black/20 text-ink hover:border-black hover:bg-black/5";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition ${styles}`}
    >
      {children}
      {variant === "primary" && (
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

/** Closing call-to-action band used at the bottom of inner pages. */
export function CTABanner({
  title = "Have a project ready for 3D?",
  description = "Send us your plans or CAD files. We'll scope the model, the level of detail and the right delivery channels for your project.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-paper py-20 md:py-28">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-14 text-white md:px-14 md:py-20">
          <div className="bg-blueprint absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />

          <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <Eyebrow tone="dark">Start a project</Eyebrow>

              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                {title}
              </h2>

              <p className="mt-5 text-pretty leading-7 text-white/55">
                {description}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink href="/contact">Request a Quote</ButtonLink>
              <ButtonLink href="/experience" variant="secondary">
                See Live Project
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
