import { basePath } from "@/lib/site";

// Service offerings. Shared by the homepage grid, the /services overview,
// the nav dropdown, and each /services/[slug] detail page.

type Photo = { src: string; alt: string };

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
  // Detail page content.
  heroImage: string;
  heroImageAlt: string;
  heroIntro: string;
  overview: string[];
  included: { title: string; body: string }[];
  facts: { label: string; value: string }[];
  gallery: Photo[];
  faqs: { q: string; a: string }[];
  projectSlugs: string[];
};

const img = (name: string) => `${basePath}/images/${name}.jpg`;

export const services: Service[] = [
  {
    slug: "new-home-construction",
    title: "New Home Construction",
    short: "Custom homes built to your vision, from foundation to final walkthrough.",
    description:
      "We build custom homes from the ground up, handling site work, foundations, framing, and finishes under one roof. You get one accountable team from the first shovel to the day you get your keys.",
    image: img("home-exterior-modern"),
    imageAlt: "Finished modern custom home with large windows under a clear sky",
    features: [
      "Custom design and build",
      "Site work and foundations",
      "Energy efficient framing",
      "Premium interior finishes",
    ],
    heroImage: img("home-brick-finished"),
    heroImageAlt: "Finished brick custom home built by Keystone Builders",
    heroIntro:
      "Ground-up custom homes on your lot, built by one accountable team from the first survey stake to the day you get your keys.",
    overview: [
      "Building a home is the largest project most families ever take on. We keep it manageable by putting one project manager in charge from preconstruction to closeout, and by doing the core carpentry with our own crews instead of a chain of subcontractors.",
      "Pittsburgh lots are rarely flat or simple. We regularly build on hillsides, narrow city parcels, and wooded sites, and we plan grading, drainage, and foundations around the ground you actually have.",
    ],
    included: [
      { title: "Preconstruction and budgeting", body: "Site evaluation, a line-item budget, and a schedule before any contract is signed." },
      { title: "Design coordination", body: "We work with your architect, or introduce you to one we trust, and price drawings as they develop." },
      { title: "Permits and engineering", body: "Zoning, building permits, and structural engineering handled by our office." },
      { title: "Site work and foundations", body: "Excavation, utilities, footings, and waterproofing done right the first time." },
      { title: "Framing and exterior shell", body: "Our own framing crews, high-performance windows, and a tight building envelope." },
      { title: "Interior finishes", body: "Cabinetry, tile, trim, and paint with a selections schedule so choices never hold up the build." },
    ],
    facts: [
      { label: "Typical timeline", value: "9 to 14 months" },
      { label: "Typical investment", value: "$650K to $2M+" },
      { label: "Warranty", value: "2-year workmanship" },
      { label: "Your point of contact", value: "One dedicated PM" },
    ],
    gallery: [
      { src: img("foundation-crew"), alt: "Crew setting footings for a new home" },
      { src: img("framing-wood-house"), alt: "Two-story home framing completed" },
      { src: img("home-exterior-terrace"), alt: "Finished home exterior with a terrace" },
    ],
    faqs: [
      { q: "Do I need my own architect?", a: "Either works. Many clients bring plans; others ask us to introduce them to an architect we have built with before. Either way we price the design as it develops so there are no surprises at bid time." },
      { q: "Can you build on a sloped lot?", a: "Yes, and in Pittsburgh we do it often. Stepped foundations, retaining walls, and drainage planning are part of our standard preconstruction review." },
      { q: "How are payments structured?", a: "Payments follow construction milestones such as foundation, framing, and drywall, so you only pay for work that is complete and inspected." },
    ],
    projectSlugs: ["shadyside-modern-custom-home", "cranberry-township-new-build"],
  },
  {
    slug: "remodeling",
    title: "Remodeling and Renovations",
    short: "Kitchens, baths, and whole-home remodels that change how you live.",
    description:
      "From a single kitchen to a full gut renovation, we modernize older Pittsburgh homes while respecting what makes them special. We protect your home, keep the site clean, and finish what we start.",
    image: img("kitchen-white-island"),
    imageAlt: "Renovated modern kitchen with a large island and marble backsplash",
    features: [
      "Kitchen remodels",
      "Bath renovations",
      "Whole home updates",
      "Historic restorations",
    ],
    heroImage: img("kitchen-white-island"),
    heroImageAlt: "Renovated kitchen with a large white island",
    heroIntro:
      "Kitchens, baths, and whole-home renovations for older Pittsburgh houses, done cleanly and on a schedule you can plan your life around.",
    overview: [
      "Remodeling an occupied home takes a different kind of discipline than new construction. We seal off work areas, protect floors and finishes, and clean up every day so your home stays livable while we work.",
      "Many of the homes we renovate are 80 to 120 years old. We open walls expecting surprises, budget a sensible contingency up front, and talk through options with you before anything changes the scope.",
    ],
    included: [
      { title: "Design and selections", body: "Layout planning, finish selections, and a 3D walkthrough for kitchens and baths." },
      { title: "Dust and home protection", body: "Zip walls, negative air, floor protection, and a daily clean-up routine." },
      { title: "Structural changes", body: "Removing walls and opening floor plans with engineered beams and permits." },
      { title: "Plumbing and electrical updates", body: "Licensed trades bring older systems up to current code as part of the work." },
      { title: "Custom cabinetry and tile", body: "Our finish carpenters and tile setters handle the details you see every day." },
      { title: "Historic character", body: "Matching original trim, plaster, and millwork when the house deserves it." },
    ],
    facts: [
      { label: "Bathrooms", value: "6 to 10 weeks" },
      { label: "Kitchens", value: "10 to 16 weeks" },
      { label: "Typical investment", value: "$45K to $250K+" },
      { label: "Warranty", value: "2-year workmanship" },
    ],
    gallery: [
      { src: img("kitchen-beige-marble"), alt: "Remodeled kitchen with marble counters" },
      { src: img("bath-marble-mirror"), alt: "Renovated bath with marble walls" },
      { src: img("kitchen-white-wood"), alt: "White kitchen with warm wood accents" },
    ],
    faqs: [
      { q: "Can we live at home during the remodel?", a: "For most kitchen and bath projects, yes. We set up a temporary kitchen when needed and keep the rest of the house sealed off from dust." },
      { q: "What happens if you find a problem inside the walls?", a: "We stop, show you what we found with photos, and give you a written price and options before any extra work begins." },
      { q: "Do you handle design, or do I need a designer?", a: "Our team handles layout and selections for most kitchens and baths. For larger whole-home projects we partner with an independent designer." },
    ],
    projectSlugs: ["brookline-whole-home-renovation", "dormont-kitchen-remodel", "squirrel-hill-kitchen-remodel"],
  },
  {
    slug: "additions",
    title: "Additions",
    short: "More space, matched to the house you already have.",
    description:
      "Room additions, second stories, and suites that look like they were always part of the house. We handle the structural engineering and match the new work to the old, inside and out.",
    image: img("framing-two-story"),
    imageAlt: "Wood framing of a two-story home addition under a blue sky",
    features: [
      "Room and second-story additions",
      "In-law and accessory suites",
      "Garage and porch builds",
      "Structural engineering",
    ],
    heroImage: img("home-exterior-terrace"),
    heroImageAlt: "Home with a newly built upper-level addition and terrace",
    heroIntro:
      "Second stories, primary suites, and in-law spaces that add room without making your home look added on to.",
    overview: [
      "A good addition is invisible from the curb. We match rooflines, siding, brick, and interior trim so the new space reads as part of the original house, inside and out.",
      "Additions involve structure, zoning, and tying new systems into old ones. Our project managers coordinate the engineer, the township, and every trade so you have one point of contact through all of it.",
    ],
    included: [
      { title: "Feasibility and zoning review", body: "Setbacks, height limits, and variance needs checked before design begins." },
      { title: "Structural engineering", body: "Foundations and framing designed for the load, including second-story reinforcement." },
      { title: "Exterior matching", body: "Rooflines, siding, brick, and windows matched to the existing house." },
      { title: "HVAC and electrical tie-in", body: "Systems sized for the new space so comfort stays even across the whole home." },
      { title: "Interior finish matching", body: "Trim profiles, flooring, and paint carried through from the original rooms." },
      { title: "Phased construction", body: "Work sequenced to keep the existing home weather-tight and livable." },
    ],
    facts: [
      { label: "Typical timeline", value: "4 to 7 months" },
      { label: "Typical investment", value: "$150K to $500K+" },
      { label: "Warranty", value: "2-year workmanship" },
      { label: "Your point of contact", value: "One dedicated PM" },
    ],
    gallery: [
      { src: img("framing-two-story"), alt: "Framing a new second story" },
      { src: img("reroof-aerial"), alt: "Aerial view of a new roofline tied into the existing home" },
      { src: img("bath-timber"), alt: "Primary suite bath with timber accents" },
    ],
    faqs: [
      { q: "Do I need a variance for an addition?", a: "Sometimes. We review your lot against township setbacks and height limits during feasibility and handle the variance process if one is needed." },
      { q: "Can you add a second story to my house?", a: "Often, yes. An engineer checks the existing foundation and framing first, and we design any reinforcement into the plan." },
      { q: "Will the addition match my house?", a: "That is the goal of every addition we build. We source matching materials and carry interior trim and flooring through so the new rooms match the old ones." },
    ],
    projectSlugs: ["mount-lebanon-master-suite"],
  },
  {
    slug: "commercial",
    title: "Commercial Construction",
    short: "Build-outs and ground-up projects delivered on schedule.",
    description:
      "Offices, retail, and restaurants built to open on time. We move fast through permits, run trades in parallel, and phase the work so you can occupy finished space as soon as possible.",
    image: img("commercial-office-green"),
    imageAlt: "Modern commercial office building with a glass facade",
    features: [
      "Office and retail build-outs",
      "Restaurant and hospitality",
      "Tenant improvements",
      "Ground up construction",
    ],
    heroImage: img("commercial-office-glass"),
    heroImageAlt: "Glass-walled offices in a commercial build-out",
    heroIntro:
      "Office, retail, and hospitality construction for owners and tenants who need to open on a fixed date.",
    overview: [
      "Commercial schedules are driven by lease dates and opening days. We build a detailed schedule before mobilizing, run trades in parallel wherever the work allows, and report progress weekly against that plan.",
      "We work with landlords, tenants, and design teams across the region, and we are comfortable in occupied buildings where noise, deliveries, and after-hours work have to be coordinated carefully.",
    ],
    included: [
      { title: "Preconstruction and value engineering", body: "Budget reviews that protect the design intent while keeping costs on target." },
      { title: "Permitting and inspections", body: "City of Pittsburgh and township permits, inspections, and occupancy sign-off." },
      { title: "Tenant improvements", body: "Office and retail fit-outs inside existing shells, from demo to furniture-ready." },
      { title: "Restaurant build-outs", body: "Kitchen infrastructure, venting, and finishes coordinated with your equipment supplier." },
      { title: "Occupied-building work", body: "After-hours scheduling and protection plans for active properties." },
      { title: "Closeout and turnover", body: "Punch lists, as-built documents, and warranties delivered in one package." },
    ],
    facts: [
      { label: "Build-outs", value: "8 to 16 weeks" },
      { label: "Typical investment", value: "$250K to $3M+" },
      { label: "Reporting", value: "Weekly schedule updates" },
      { label: "Warranty", value: "2-year workmanship" },
    ],
    gallery: [
      { src: img("commercial-office-reflection"), alt: "Open office work area with daylight" },
      { src: img("commercial-office-twilight"), alt: "Commercial building exterior at dusk" },
      { src: img("crew-engineers"), alt: "Project leads reviewing plans on a commercial site" },
    ],
    faqs: [
      { q: "Can you work around our business hours?", a: "Yes. We regularly schedule noisy work after hours or on weekends and keep occupied areas clean and safe during the day." },
      { q: "Do you handle permits with the City of Pittsburgh?", a: "Our office manages permit applications, inspections, and occupancy sign-off with the city and surrounding townships." },
      { q: "Can you work with our architect?", a: "Absolutely. Most of our commercial work is design-bid-build with an outside architect, and we are happy to join early for budget input." },
    ],
    projectSlugs: ["strip-district-office-buildout"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
