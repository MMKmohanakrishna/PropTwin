"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/components/site";

export function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
      <svg
        viewBox="0 0 32 32"
        className="h-7 w-7"
        fill="none"
        aria-hidden="true"
      >
        {/* Isometric cube: the "twin" mark */}
        <path d="M16 3 28 10v12l-12 7-12-7V10L16 3Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 10l12 7 12-7M16 17v12" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 3v14" stroke="#c8a26b" strokeWidth="1.6" strokeDasharray="2 2" />
      </svg>
      <span>
        Prop<span className="font-light text-white/70">Twin</span>
      </span>
    </span>
  );
}

export default function Navbar() {
  // Static export uses trailing slashes (/about/); compare without them.
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
        solid
          ? "border-b border-white/10 bg-ink/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="PropTwin home">
          <Logo />
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            className="group ml-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-brass-light"
          >
            Request a Quote
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="-mr-2 rounded-full p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-white/10 px-5 pb-6 pt-2 md:hidden"
        >
          <div className="flex flex-col">
            {[{ href: "/", label: "Home" }, ...navLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`border-b border-white/10 py-4 text-base ${
                  pathname === link.href ? "text-white" : "text-white/65"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="mt-6 rounded-full bg-white px-5 py-3.5 text-center text-sm font-medium text-ink"
            >
              Request a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
