"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Maximize, Minimize, MonitorSmartphone, Play, X } from "lucide-react";
import { featuredProject as project } from "@/components/site";

/**
 * The Unity WebGL walkthrough. The build is only downloaded once the visitor
 * clicks Launch, and runs in an iframe so Unity's keyboard capture and memory
 * stay isolated from the rest of the page.
 */
export default function UnityWalkthrough() {
  const [launched, setLaunched] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await containerRef.current?.requestFullscreen();
    } catch {
      // Fullscreen unavailable (e.g. iOS Safari).
    }
    frameRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-ink ${
        fullscreen
          ? "h-screen"
          : launched
            ? "aspect-[4/5] rounded-3xl sm:aspect-video"
            : // Before launch the card sizes to its content on smaller screens,
              // so the controls and Launch button are never cut off.
              "rounded-3xl lg:aspect-video"
      }`}
    >
      {launched ? (
        <>
          <iframe
            ref={frameRef}
            src={project.playerUrl}
            title={`${project.name}: interactive Unity walkthrough`}
            allow="fullscreen; autoplay"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
            onLoad={() => frameRef.current?.focus()}
          />

          <div className="absolute right-3 top-3 flex gap-2">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {fullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
              <span className="hidden sm:inline">
                {fullscreen ? "Exit" : "Fullscreen"}
              </span>
            </button>

            {!fullscreen && (
              <button
                type="button"
                onClick={() => setLaunched(false)}
                className="flex items-center rounded-full border border-white/15 bg-black/60 p-2.5 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
                aria-label="Close walkthrough"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </>
      ) : (
        <Poster onLaunch={() => setLaunched(true)} />
      )}
    </div>
  );
}

/** True on phones and tablets (a finger is the main pointer). */
function useIsTouch() {
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const update = () => setTouch(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return touch;
}

function Poster({ onLaunch }: { onLaunch: () => void }) {
  const touch = useIsTouch();
  const controls = touch ? project.touchControls : project.controls;

  return (
    <div className="relative grid md:grid-cols-[1.1fr_1fr] lg:absolute lg:inset-0">
      {/* Floor plan: where the model started */}
      <div className="relative hidden overflow-hidden bg-paper md:block">
        <Image
          src={project.floorPlan}
          alt={`${project.name} floor plan, ${project.layout}, ${project.area}`}
          fill
          sizes="(min-width: 768px) 55vw, 0px"
          className="object-contain p-6 mix-blend-multiply"
        />
        <span className="absolute bottom-5 left-5 rounded-full bg-ink px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white">
          Source floor plan
        </span>
      </div>

      <div className="relative flex flex-col justify-between overflow-hidden p-7 text-white sm:p-10">
        <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_75%)]" />

        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brass">
            Featured project
          </p>

          <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </h3>

          <p className="mt-2 text-white/55">
            {project.layout} · {project.area}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/70"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <dl className="grid gap-x-6 gap-y-2.5 border-t sm:grid-cols-2 border-white/10 pt-6 text-sm">
            {controls.map((control) => (
              <div key={control.action} className="flex items-baseline gap-3">
                <dt className="min-w-14 font-mono text-xs text-brass">
                  {control.keys}
                </dt>
                <dd className="text-white/60">{control.action}</dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={onLaunch}
            className="group mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink transition hover:bg-brass-light"
          >
            <Play size={16} className="fill-current" />
            Launch 3D walkthrough
          </button>

          <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-white/40">
            <MonitorSmartphone size={14} />
            {touch ? "Touch controls on phones & tablets" : "Keyboard & mouse, or touch on mobile"}
            {project.downloadSize && ` · ${project.downloadSize} download`}
          </p>
        </div>
      </div>
    </div>
  );
}
