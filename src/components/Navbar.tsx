"use client";

// Navbar: transparent at page top, fades to premium dark glass as user scrolls.
// The nav is fixed so it floats over the hero photo; the trust strip scrolls away naturally.
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import CallbackDrawer from "@/components/CallbackDrawer";
import { site } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Trust strip is ~32px. Nav slides up to cover it as user scrolls,
  // then transitions to full glass. 0 = at top, 1 = fully transitioned.
  const STRIP_H = 32;
  const t = Math.min(Math.max((scrollY - STRIP_H) / 56, 0), 1);
  const navTop = Math.max(STRIP_H - scrollY, 0); // slides from 32px to 0
  const scrolled = scrollY > STRIP_H;

  const isActive = (href: string) => {
    const path = (pathname || "/").replace(/\/$/, "") || "/";
    if (href === "/") return path === "/";
    return path === href || path.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Fixed nav — floats above everything, transparent → dark glass on scroll. */}
      <nav
        aria-label="Main navigation"
        className="fixed inset-x-0 z-50 transition-all duration-300"
        style={{
          top: navTop,
          backgroundColor: `rgba(28,43,58,${(t * 0.88).toFixed(3)})`,
          backdropFilter: scrolled ? "blur(18px) saturate(1.6)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.6)" : "none",
          boxShadow: scrolled
            ? "0 1px 0 rgba(201,169,110,0.15), 0 8px 32px rgba(0,0,0,0.28)"
            : "none",
        }}
      >
        {/* Gold hairline at top — fades in as nav becomes opaque (premium detail). */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
          style={{ opacity: t }}
        />

        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3.5 md:py-4">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            {/* Always show the light (dark=true) logo since we're always on a dark bg */}
            <Logo dark />
          </Link>

          {/* Desktop nav links. */}
          <ul className="hidden items-center gap-8 md:flex">
            {site.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative text-sm font-medium transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-[1.5px] after:rounded-full after:bg-accent after:transition-all after:duration-300 ${
                      active
                        ? "text-white after:w-full"
                        : "text-background/75 hover:text-white after:w-0 hover:after:w-full"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop right: callback + phone CTA. */}
          <div className="hidden items-center gap-2.5 md:flex">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-background/20 px-3.5 py-2 text-sm font-medium text-background/75 transition-all duration-200 hover:border-accent/60 hover:text-white"
            >
              <ClipboardIcon />
              Callback
            </button>

            <a
              href={site.phoneHref}
              className="shine btn-3d inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-primary"
            >
              <span className="relative z-[1] inline-flex items-center gap-2">
                <PhoneIcon />
                {site.phoneDisplay}
              </span>
            </a>
          </div>

          {/* Mobile hamburger. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-12 w-12 items-center justify-center rounded-md text-background md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu — extends down from the glass nav. */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden border-t border-background/10 md:hidden"
              style={{
                backgroundColor: "rgba(20,32,45,0.97)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              <ul className="mx-auto flex max-w-content flex-col px-4 py-2">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={`flex min-h-12 items-center text-base font-medium transition-colors ${
                        isActive(item.href) ? "text-accent" : "text-background/75 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => { setOpen(false); setDrawerOpen(true); }}
                    className="flex min-h-12 w-full items-center gap-2 text-base font-medium text-background/75 hover:text-white"
                  >
                    <ClipboardIcon className="h-4 w-4 text-accent" />
                    Request a callback
                  </button>
                </li>
                <li className="py-3">
                  <a
                    href={site.phoneHref}
                    className="shine btn-3d flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-4 text-base font-semibold text-primary"
                  >
                    <span className="relative z-[1] inline-flex items-center gap-2">
                      <PhoneIcon />
                      {site.phoneDisplay}
                    </span>
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CallbackDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function ClipboardIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2" />
      <rect x="8" y="0" width="8" height="4" rx="1" ry="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="12" y1="9" x2="12" y2="15" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
