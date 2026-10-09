import { Container, SectionHeading, ButtonLink } from "@/components/ui";
import DigitalTwin from "@/components/DigitalTwin";

export default function Experience() {
  return (
    <section id="experience" className="bg-paper py-24 md:py-36">
      <Container>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            index="03"
            eyebrow="Live Demo"
            title={
              <>
                Don&apos;t just look at a property.{" "}
                <span className="text-black/35">Step inside.</span>
              </>
            }
            description="This 2BHK digital twin runs in real time in your browser. Pick a room, orbit the model and see how buyers will experience your project."
          />

          <ButtonLink href="/experience" tone="light" variant="secondary">
            Open full-screen demo
          </ButtonLink>
        </div>

        <div className="mt-14">
          <DigitalTwin />
        </div>
      </Container>
    </section>
  );
}
