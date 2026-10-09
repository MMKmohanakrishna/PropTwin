import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import UnityWalkthrough from "@/components/UnityWalkthrough";

export default function Experience() {
  return (
    <section id="experience" className="bg-paper py-24 md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="03"
            eyebrow="Live Project"
            title={
              <>
                Don&apos;t just look at a property.{" "}
                <span className="text-black/35">Step inside.</span>
              </>
            }
            description="A real 1,457 sq ft apartment, modeled in Blender from its floor plan and built as a Unity walkthrough. Launch it and walk through every room, right here in your browser."
          />

          <ButtonLink href="/experience" tone="light" variant="secondary">
            How we built it
          </ButtonLink>
        </div>

        <div className="mt-14">
          <UnityWalkthrough />
        </div>
      </Container>
    </section>
  );
}
