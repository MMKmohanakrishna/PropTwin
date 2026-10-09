import type { Metadata } from "next";
import {
  DoorOpen,
  Footprints,
  Lamp,
  MoonStar,
  SlidersHorizontal,
} from "lucide-react";
import UnityWalkthrough from "@/components/UnityWalkthrough";
import {
  CTABanner,
  Container,
  PageHero,
  SectionHeading,
} from "@/components/ui";
import { featuredProject } from "@/components/site";

export const metadata: Metadata = {
  title: "Live Project: Apartment Walkthrough",
  description:
    "Walk through a real 1,457 sq ft apartment in your browser, modeled in Blender and built in Unity by PropTwin.",
};

const features = [
  {
    icon: Footprints,
    title: "Walk freely",
    text: "Walk with WASD and the mouse, or the on-screen joystick on phones, at true eye height and scale.",
  },
  {
    icon: DoorOpen,
    title: "Automatic doors",
    text: "Hinged and sliding doors open as you approach and close behind you.",
  },
  {
    icon: MoonStar,
    title: "Day & night",
    text: "Press N or tap Day / Night to switch between daylight and a fully lit night scene.",
  },
  {
    icon: Lamp,
    title: "Interior lighting",
    text: "Toggle room lights and LED strips with L and K, or the on-screen buttons.",
  },
  {
    icon: SlidersHorizontal,
    title: "Your settings",
    text: "Adjust look sensitivity, walk speed and invert-look from the pause menu.",
  },
];

const pipeline = [
  {
    step: "01",
    tool: "Reference",
    title: "Floor plan",
    text: "The developer's 2D plan sets every wall, opening and room dimension.",
  },
  {
    step: "02",
    tool: "Blender",
    title: "3D modeling",
    text: "Walls, joinery, fixtures and furniture modeled to scale, with PBR materials.",
  },
  {
    step: "03",
    tool: "Unity 6 · URP",
    title: "Interactive build",
    text: "Lighting, day/night modes, automatic doors and a first-person player controller.",
  },
  {
    step: "04",
    tool: "WebGL",
    title: "Published to the web",
    text: "Compiled for the browser and cached after first load, with nothing for buyers to install.",
  },
];

export default function ExperiencePage() {
  return (
    <main className="bg-paper">
      <PageHero
        eyebrow="Live project"
        title={
          <>
            Walk through a{" "}
            <span className="text-white/40">real apartment.</span>
          </>
        }
        description={`${featuredProject.layout}, ${featuredProject.area}. Modeled in Blender, brought to life in Unity, and running right here in your browser.`}
      />

      <section className="-mt-12 pb-24 md:-mt-16 md:pb-32">
        <Container className="relative">
          <UnityWalkthrough />
        </Container>
      </section>

      <section className="pb-24 md:pb-32">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Inside the walkthrough"
            title="Explore the apartment your way."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
        <Container>
          <SectionHeading
            tone="dark"
            index="02"
            eyebrow="How we built it"
            title={
              <>
                From a 2D plan{" "}
                <span className="text-white/40">to a walkable twin.</span>
              </>
            }
          />

          <ol className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pipeline.map((item) => (
              <li
                key={item.step}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-brass">
                    {item.step}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {item.tool}
                  </span>
                </div>

                <h3 className="mt-10 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/50">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <CTABanner
        title="Want this for your project?"
        description="Send us your floor plans and we'll turn them into a walkthrough your buyers can explore from anywhere."
      />
    </main>
  );
}
