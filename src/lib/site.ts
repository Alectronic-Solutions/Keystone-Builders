export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/Keystone-Builders";

// Single source of truth for Keystone Builders business facts.
// Navbar, Footer, and the LocalBusiness schema all read from here so a
// detail (phone, license, email) lives in exactly one place.

export const site = {
  name: "Keystone Builders",
  legalName: "Keystone Builders LLC",
  tagline: "Residential and commercial construction built to last.",
  description:
    "Keystone Builders is a licensed and insured general contractor serving Greater Pittsburgh. New homes, remodels, additions, and commercial construction.",

  // Demo phone in the reserved fictional 555-01xx range.
  phoneDisplay: "(412) 555-0142",
  phoneHref: "tel:+14125550142",

  email: "info@keystonebuilders.com",
  formSubmitAction: "https://formsubmit.co/info@keystonebuilders.com",

  license: "PA HIC #PA088416",
  foundedYear: 2009,

  serviceArea: "Greater Pittsburgh",
  city: "Pittsburgh",
  region: "PA",
  regionName: "Pennsylvania",

  url: "https://keystonebuilders.com",

  // Headline proof points. Years in business is computed from foundedYear.
  projectsCompleted: "250+",
  onTimeRate: "98%",
  warranty: "2 year",

  nav: [
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof site;
