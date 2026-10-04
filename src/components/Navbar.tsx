"use client";

// Navbar: transparent at page top, fades to premium dark glass as user scrolls.
// Grouped pages open as dropdown panels on desktop (hover with a mouse, or the
// chevron button by keyboard and touch) and as an accordion in the mobile menu.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import CallbackDrawer from "@/components/CallbackDrawer";
import { site, type NavItem } from "@/lib/site";
import { services } from "@/lib/services";
import { projects } from "@/lib/projects";

const panelId = (label: string) => `nav-panel-${label.toLowerCase()}`;
const triggerId = (label: string) => `nav-trigger-${label.toLowerCase()}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  // Coalesce scroll events into one update per frame; phones fire them rapidly.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrollY(window.scrollY);
      });
    };
    setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenu(null);
    setMobileGroup(null);
  }, [pathname]);

  // Close an open dropdown on outside click or Escape (returning focus to its trigger).
  useEffect(() => {
    if (!menu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenu(null);
      document.getElementById(triggerId(menu))?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  // The mobile menu covers the page, so stop the page behind it from scrolling.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Trust strip is exactly 32px (h-8). Nav slides up to cover it as user scrolls,
  // then transitions to full glass. 0 = at top, 1 = fully transitioned.
  const STRIP_H = 32;
  const t = Math.min(Math.max((scrollY - STRIP_H) / 56, 0), 1);
  const navTop = Math.max(STRIP_H - scrollY, 0); // slides from 32px to 0
  const scrolled = scrollY > STRIP_H;
  // The open mobile menu needs a solid bar behind it even at the top of the page.
  const solid = scrolled || open;

  const isActive = (href: string) => {
    const path = (pathname || "/").replace(/\/$/, "") || "/";
    if (href === "/") return path === "/";
    return path === href || path.startsWith(`${href}/`);
  };
  const groupActive = (item: NavItem) =>
    isActive(item.href) || !!item.children?.some((c) => isActive(c.href));

  // Hover intent for mouse users only; touch and keyboard use the chevron button.
  const openOnHover = (label: string) => (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setMenu(label);
  };
  const closeOnLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => setMenu(null), 160);
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="fixed inset-x-0 z-50 transition-[background-color,box-shadow] duration-300"
        style={{
          top: navTop,
          backgroundColor: open ? "rgba(20,32,45,0.98)" : `rgba(28,43,58,${(t * 0.88).toFixed(3)})`,
          backdropFilter: solid ? "blur(18px) saturate(1.6)" : "none",
          WebkitBackdropFilter: solid ? "blur(18px) saturate(1.6)" : "none",
          boxShadow: solid
            ? "0 1px 0 rgba(201,169,110,0.15), 0 8px 32px rgba(0,0,0,0.28)"
            : "none",
        }}
      >
        {/* Gold hairline at top, fades in as nav becomes opaque (premium detail). */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
          style={{ opacity: t }}
        />

        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-3.5 lg:py-4">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Logo dark />
          </Link>

          {/* Desktop nav. */}
          <ul className="hidden items-center gap-1 lg:flex">
            {site.nav.map((item) => {
              const active = groupActive(item);
              const linkClass = `relative inline-flex min-h-11 items-center text-[15px] font-medium transition-colors duration-200 after:absolute after:bottom-1.5 after:left-0 after:h-[1.5px] after:rounded-full after:bg-accent after:transition-all after:duration-300 ${
                active
                  ? "text-white after:w-full"
                  : "text-background/75 hover:text-white after:w-0 hover:after:w-full"
              }`;

              if (!item.children) {
                return (
                  <li key={item.href} className="px-3">
                    <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const expanded = menu === item.label;
              return (
                <li
                  key={item.label}
                  className="relative flex items-center pl-3 pr-1"
                  onPointerEnter={openOnHover(item.label)}
                  onPointerLeave={closeOnLeave}
                >
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                  <button
                    id={triggerId(item.label)}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={panelId(item.label)}
                    aria-label={`${expanded ? "Hide" : "Show"} ${item.label} menu`}
                    onClick={() => setMenu(expanded ? null : item.label)}
                    className="ml-0.5 inline-flex h-8 w-8 items-center justify-center rounded-md text-background/70 transition-colors hover:text-white"
                  >
                    <ChevronIcon className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        id={panelId(item.label)}
                        // Centering lives in x because Framer owns this element's transform.
                        initial={{ opacity: 0, x: "-50%", y: 8 }}
                        animate={{ opacity: 1, x: "-50%", y: 0 }}
                        exit={{ opacity: 0, x: "-50%", y: 8 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        // pt-3 is an invisible hover bridge between the trigger and the card.
                        className="absolute left-1/2 top-full z-10 pt-3"
                      >
                        <DropdownPanel item={item} isActive={isActive} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Desktop right: callback + phone CTA. */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="hidden items-center gap-1.5 rounded-md border border-background/20 px-3.5 py-2 text-[15px] font-medium text-background/75 transition-all duration-200 hover:border-accent/60 hover:text-white xl:inline-flex"
            >
              <ClipboardIcon />
              Callback
            </button>

            <a
              href={site.phoneHref}
              className="shine btn-3d inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-[15px] font-semibold text-primary"
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
            className="inline-flex h-12 w-12 items-center justify-center rounded-md text-background lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile menu, extends down from the glass nav. */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="overflow-hidden border-t border-background/10 lg:hidden"
            >
              {/* Scrolls on its own when the expanded groups are taller than the screen. */}
              <div className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain">
                <ul className="mx-auto flex max-w-content flex-col px-4 py-2">
                  {site.nav.map((item) => {
                    if (!item.children) {
                      return (
                        <li key={item.href} className="border-b border-background/10">
                          <Link
                            href={item.href}
                            aria-current={isActive(item.href) ? "page" : undefined}
                            className={`flex min-h-14 items-center text-lg font-medium transition-colors ${
                              isActive(item.href) ? "text-accent" : "text-background/85 hover:text-white"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    }

                    const expanded = mobileGroup === item.label;
                    return (
                      <li key={item.label} className="border-b border-background/10">
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={`mobile-group-${item.label.toLowerCase()}`}
                          onClick={() => setMobileGroup(expanded ? null : item.label)}
                          className={`flex min-h-14 w-full items-center justify-between text-lg font-medium transition-colors ${
                            groupActive(item) ? "text-accent" : "text-background/85"
                          }`}
                        >
                          {item.label}
                          <ChevronIcon className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.ul
                              id={`mobile-group-${item.label.toLowerCase()}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <li key={child.href + child.label}>
                                  <Link
                                    href={child.href}
                                    aria-current={isActive(child.href) ? "page" : undefined}
                                    className={`flex min-h-12 flex-col justify-center border-l-2 py-2 pl-4 transition-colors ${
                                      isActive(child.href)
                                        ? "border-accent text-white"
                                        : "border-background/15 text-background/75 hover:text-white"
                                    }`}
                                  >
                                    <span className="text-base font-medium">{child.label}</span>
                                    {child.description && (
                                      <span className="text-sm text-background/55">{child.description}</span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                              <li className="h-3" aria-hidden="true" />
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                  <li>
                    <button
                      type="button"
                      onClick={() => { setOpen(false); setDrawerOpen(true); }}
                      className="flex min-h-14 w-full items-center gap-2 text-lg font-medium text-background/85 hover:text-white"
                    >
                      <ClipboardIcon className="h-4 w-4 text-accent" />
                      Request a callback
                    </button>
                  </li>
                  <li className="pb-5 pt-2">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CallbackDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

// DropdownPanel: the card under a desktop nav group. Services and Projects get
// richer layouts with photos; other groups render as a two-column link list.
function DropdownPanel({ item, isActive }: { item: NavItem; isActive: (href: string) => boolean }) {
  const children = item.children ?? [];
  const card = "overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-primary/10";
  const linkBase = "group/link flex rounded-lg p-3 transition-colors hover:bg-background";

  if (item.label === "Services") {
    return (
      <div className={`${card} w-[600px]`}>
        <span aria-hidden="true" className="block h-0.5 bg-accent" />
        <ul className="grid grid-cols-2 gap-1 p-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className={`${linkBase} items-center gap-3`}>
                <span className="relative h-14 w-16 shrink-0 overflow-hidden rounded-md">
                  <Image src={s.image} alt="" fill sizes="64px" className="object-cover" />
                </span>
                <span>
                  <span className={`block text-[15px] font-semibold ${isActive(`/services/${s.slug}`) ? "text-accent-ink" : "text-primary"}`}>
                    {s.title}
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-ink-soft">
                    {children.find((c) => c.href === `/services/${s.slug}`)?.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-primary/10 bg-background px-5 py-3.5">
          <Link href="/services" className="text-sm font-semibold text-primary hover:text-accent-ink">
            View all services &rarr;
          </Link>
          <Link href="/contact" className="text-sm font-semibold text-accent-ink hover:text-primary">
            Get a free estimate
          </Link>
        </div>
      </div>
    );
  }

  if (item.label === "Projects") {
    const featured = projects[0];
    return (
      <div className={`${card} grid w-[600px] grid-cols-[1fr_220px]`}>
        <div>
          <span aria-hidden="true" className="block h-0.5 bg-accent" />
          <ul className="space-y-1 p-3">
            {children.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className={`${linkBase} flex-col`}>
                  <span className={`text-[15px] font-semibold ${isActive(c.href) ? "text-accent-ink" : "text-primary"}`}>{c.label}</span>
                  <span className="mt-0.5 text-sm text-ink-soft">{c.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href={`/projects/${featured.slug}`} className="group/feat relative block overflow-hidden">
          <Image src={featured.image} alt="" fill sizes="220px" className="object-cover transition-transform duration-500 group-hover/feat:scale-[1.04]" />
          <span className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
          <span className="absolute inset-x-0 bottom-0 p-4">
            <span className="block font-display text-base font-bold leading-snug text-white">{featured.title}</span>
            <span className="mt-1 block text-sm text-background/75">{featured.location}</span>
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className={`${card} w-[560px]`}>
      <span aria-hidden="true" className="block h-0.5 bg-accent" />
      <ul className="grid grid-cols-2 gap-1 p-3">
        {children.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className={`${linkBase} flex-col`}>
              <span className={`text-[15px] font-semibold ${isActive(c.href) ? "text-accent-ink" : "text-primary"}`}>{c.label}</span>
              <span className="mt-0.5 text-sm leading-snug text-ink-soft">{c.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
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
