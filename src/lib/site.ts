export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/Keystone-Builders";

export type NavLink = { label: string; href: string; description?: string };
export type NavItem = NavLink & { children?: NavLink[] };

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
  // FormSubmit's AJAX endpoint returns CORS-safe JSON so failed sends can be detected.
  formSubmitAction: "https://formsubmit.co/ajax/info@keystonebuilders.com",

  license: "PA HIC #PA088416",
  foundedYear: 2009,

  serviceArea: "Greater Pittsburgh",
  city: "Pittsburgh",
  region: "PA",
  regionName: "Pennsylvania",

  // Real deployed URL (GitHub Pages project site, no custom domain configured).
  url: `https://alectronic-solutions.github.io${basePath}`,

  // Headline proof points. Years in business is computed from foundedYear.
  projectsCompleted: "250+",
  onTimeRate: "98%",
  warranty: "2 year",

  // Primary navigation. Items with children render as dropdowns on desktop
  // and as expandable groups in the mobile menu.
  nav: [
    {
      label: "Services",
      href: "/services",
      children: [
        { label: "New Home Construction", href: "/services/new-home-construction", description: "Custom homes from foundation to keys" },
        { label: "Remodeling and Renovations", href: "/services/remodeling", description: "Kitchens, baths, and whole-home updates" },
        { label: "Additions", href: "/services/additions", description: "Second stories, suites, and more space" },
        { label: "Commercial Construction", href: "/services/commercial", description: "Build-outs and ground-up projects" },
      ],
    },
    {
      label: "Projects",
      href: "/projects",
      children: [
        { label: "Project Portfolio", href: "/projects", description: "Recent homes, remodels, and commercial work" },
        { label: "Before and After", href: "/before-after", description: "Drag the slider to compare finished rooms" },
        { label: "Client Reviews", href: "/reviews", description: "What homeowners say about working with us" },
      ],
    },
    {
      label: "Company",
      href: "/about",
      children: [
        { label: "About Keystone", href: "/about", description: "Our story, values, and credentials" },
        { label: "Our Process", href: "/process", description: "How a project runs, from first call to final walkthrough" },
        { label: "Warranty", href: "/warranty", description: "Two years of written workmanship coverage" },
        { label: "Financing", href: "/financing", description: "Payment options for larger projects" },
        { label: "Areas We Serve", href: "/areas", description: "Four counties across Greater Pittsburgh" },
        { label: "FAQ", href: "/faq", description: "Straight answers to common questions" },
        { label: "Careers", href: "/careers", description: "Join our carpenters and project managers" },
      ],
    },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
} as const;

export type SiteConfig = typeof site;
