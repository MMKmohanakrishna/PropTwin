"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-black/10 bg-paper/60 px-4 py-3.5 text-sm outline-none transition placeholder:text-black/35 focus:border-ink focus:bg-white focus:ring-4 focus:ring-black/5";

const labelClass = "mb-2 block text-sm font-medium";

const services = [
  "3D Modeling",
  "Interior Modeling",
  "Photoreal Renders",
  "Web 3D Walkthrough",
  "Mobile / AR",
  "VR Experience",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...Object.fromEntries(data),
          services: data.getAll("services"),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message ?? "Something went wrong.");
      }

      form.reset();
      setStatus("success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-brass">
          <Check size={28} />
        </div>

        <h2 className="mt-7 text-3xl font-semibold tracking-tight">
          Enquiry received.
        </h2>

        <p className="mt-4 max-w-md leading-7 text-black/55">
          Thank you for contacting PropTwin. Our team will review your
          project and get back to you within one business day.
        </p>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full border border-black/15 px-6 py-3 text-sm font-medium transition hover:bg-ink hover:text-white"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black/40">
          Project enquiry
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Tell us about your project
        </h2>

        <p className="mt-2 text-sm leading-6 text-black/50">
          The more detail you share, the more accurate our scope and quote.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Your name <span className="text-brass">*</span>
            </label>
            <input id="name" name="name" type="text" required autoComplete="name" placeholder="Full name" className={fieldClass} />
          </div>

          <div>
            <label htmlFor="company" className={labelClass}>
              Company <span className="text-brass">*</span>
            </label>
            <input id="company" name="company" type="text" required autoComplete="organization" placeholder="Company or firm" className={fieldClass} />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Work email <span className="text-brass">*</span>
            </label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" className={fieldClass} />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91" className={fieldClass} />
          </div>
        </div>

        <fieldset>
          <legend className={labelClass}>Services you need</legend>

          <div className="flex flex-wrap gap-2">
            {services.map((service) => (
              <label key={service} className="cursor-pointer">
                <input type="checkbox" name="services" value={service} className="peer sr-only" />
                <span className="inline-block rounded-full border border-black/10 px-4 py-2 text-sm text-black/65 transition peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-black/10">
                  {service}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="projectType" className={labelClass}>
              Project type <span className="text-brass">*</span>
            </label>
            <select id="projectType" name="projectType" required defaultValue="" className={fieldClass}>
              <option value="" disabled>Select</option>
              <option value="apartments">Apartments</option>
              <option value="villas">Villas</option>
              <option value="commercial">Commercial</option>
              <option value="township">Township / Large development</option>
              <option value="interior">Interior only</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="projectStage" className={labelClass}>
              Project stage <span className="text-brass">*</span>
            </label>
            <select id="projectStage" name="projectStage" required defaultValue="" className={fieldClass}>
              <option value="" disabled>Select</option>
              <option value="planning">Planning / Design</option>
              <option value="construction">Under construction</option>
              <option value="completed">Completed</option>
              <option value="marketing">Currently marketing</option>
            </select>
          </div>

          <div>
            <label htmlFor="units" className={labelClass}>
              No. of unit types
            </label>
            <input id="units" name="units" type="number" min="1" placeholder="e.g. 4" className={fieldClass} />
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Project details
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Location, size, which files you have (CAD, BIM, PDF plans), deadlines and where the 3D model will be used…"
            className={`${fieldClass} resize-none`}
          />
        </div>

        {status === "error" && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Submit enquiry
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <p className="text-center text-xs text-black/40">
          We reply within one business day. Your details are only used to
          respond to this enquiry.
        </p>
      </form>
    </>
  );
}
