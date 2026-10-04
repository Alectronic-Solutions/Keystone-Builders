"use client";

// Footer: brand, nav, contact, credentials, and bottom bar with back-to-top.
import Link from "next/link";
import Logo from "@/components/Logo";
import { site } from "@/lib/site";

const social = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const columns = [
  {
    title: "Services",
    links: [
      { label: "New Home Construction", href: "/services/new-home-construction" },
      { label: "Remodeling and Renovations", href: "/services/remodeling" },
      { label: "Additions", href: "/services/additions" },
      { label: "Commercial Construction", href: "/services/commercial" },
      { label: "All Services", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Keystone", href: "/about" },
      { label: "Our Process", href: "/process" },
      { label: "Project Portfolio", href: "/projects" },
      { label: "Before and After", href: "/before-after" },
      { label: "Client Reviews", href: "/reviews" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Areas We Serve", href: "/areas" },
      { label: "Financing", href: "/financing" },
      { label: "Warranty", href: "/warranty" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const credentials = [
  "Licensed General Contractor",
  site.license,
  "General Liability and Workers Comp",
  `${site.warranty.charAt(0).toUpperCase() + site.warranty.slice(1)} workmanship warranty`,
];

const headingClass = "text-xs font-semibold uppercase tracking-widest text-accent";
const linkClass = "inline-flex min-h-9 items-center text-base text-background/70 transition-colors hover:text-background";

export default function Footer() {
  return (
    <footer className="bg-primary text-background">
      {/* Main footer grid: brand and contact, then three link columns. */}
      <div className="mx-auto grid max-w-content grid-cols-2 gap-x-6 gap-y-10 px-4 pb-10 pt-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* Brand and contact column. */}
        <div className="col-span-2 space-y-5 lg:col-span-1">
          <Logo dark />
          <p className="max-w-xs text-base leading-relaxed text-background/70">
            Serving {site.serviceArea} since {site.foundedYear}. Residential and
            commercial construction built to last.
          </p>
          <ul className="space-y-1 text-base">
            <li>
              <a href={site.phoneHref} className="inline-flex min-h-9 items-center font-semibold text-background transition-colors hover:text-accent">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li className="pt-1 text-sm text-background/60">
              Office hours: Monday to Friday, 7am to 5pm
            </li>
          </ul>
          <div className="flex gap-2.5">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={`${site.name} on ${s.label}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-background/10 text-background/60 transition-colors hover:bg-accent hover:text-primary"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns. */}
        {columns.map((col) => (
          <nav key={col.title} aria-label={`Footer ${col.title.toLowerCase()}`}>
            <h3 className={headingClass}>{col.title}</h3>
            <ul className="mt-4 space-y-1">
              {col.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Credentials row, keeps the license number visible on every page. */}
      <div className="border-t border-background/10">
        <ul className="mx-auto flex max-w-content flex-wrap items-center gap-x-6 gap-y-2 px-4 py-5 text-sm text-background/70">
          {credentials.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom bar. */}
      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-4 pb-20 pt-4 text-sm text-background/70 sm:flex-row sm:pb-4">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>

          <p>
            Site by{" "}
            <a
              href="https://alectronicsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent/80 transition-colors hover:text-accent"
            >
              Alectronic Solutions
            </a>
          </p>

          {/* Back to top. */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex min-h-11 items-center gap-1.5 text-background/70 transition-colors hover:text-background"
          >
            <span>Back to top</span>
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
