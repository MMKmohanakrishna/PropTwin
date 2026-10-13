import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Navbar";
import { contact } from "@/components/site";

const columns = [
  {
    title: "Services",
    links: [
      { href: "/solutions", label: "Architectural 3D Modeling" },
      { href: "/solutions", label: "Interior Modeling" },
      { href: "/solutions", label: "Photoreal Rendering" },
      { href: "/experience", label: "Interactive Web 3D" },
      { href: "/solutions", label: "VR Walkthroughs" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/developers", label: "For Developers" },
      { href: "/#process", label: "Our Process" },
      { href: "/#channels", label: "Web · Mobile · VR" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto w-full max-w-7xl px-5 pt-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <Logo />

            <p className="mt-6 max-w-xs text-sm leading-6 text-white/50">
              3D modeling studio for real estate. We turn plans and CAD
              files into accurate 3D models, renders and interactive
              digital twins.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
                {column.title}
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/65 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
              Studio
            </p>

            <div className="mt-6 space-y-4 text-sm text-white/65">
              <p className="flex gap-3 leading-6">
                <MapPin size={17} className="mt-1 shrink-0 text-brass" />
                <span>
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </p>

              <a
                href={contact.phoneHref}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone size={17} className="text-brass" />
                {contact.phone}
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail size={17} className="text-brass" />
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-4 border-t border-white/10 py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35 md:flex-row">
          <p>© {new Date().getFullYear()} PropTwin. All rights reserved.</p>
          <p>3D Modeling · Digital Twins · Web · Mobile · VR</p>
          <p>
            Designed and Developed by{" "}
            <span className="text-brass">Mohana Krishna</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
