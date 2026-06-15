import { basePath } from "@/lib/site";

// Service offerings. Shared by the homepage grid and the /services page.

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
};

export const services: Service[] = [
  {
    slug: "new-home-construction",
    title: "New Home Construction",
    short: "Custom homes built to your vision, from foundation to final walkthrough.",
    description:
      "We build custom homes from the ground up, handling site work, foundations, framing, and finishes under one roof. You get one accountable team from the first shovel to the day you get your keys.",
    image: `${basePath}/images/home-exterior-modern.jpg`,
    imageAlt: "Finished modern custom home with large windows under a clear sky",
    features: [
      "Custom design and build",
      "Site work and foundations",
      "Energy efficient framing",
      "Premium interior finishes",
    ],
  },
  {
    slug: "remodeling",
    title: "Remodeling and Renovations",
    short: "Kitchens, baths, and whole-home remodels that change how you live.",
    description:
      "From a single kitchen to a full gut renovation, we modernize older Pittsburgh homes while respecting what makes them special. We protect your home, keep the site clean, and finish what we start.",
    image: `${basePath}/images/kitchen-white-island.jpg`,
    imageAlt: "Renovated modern kitchen with a large island and marble backsplash",
    features: [
      "Kitchen remodels",
      "Bath renovations",
      "Whole home updates",
      "Historic restorations",
    ],
  },
  {
    slug: "additions",
    title: "Additions",
    short: "More space, seamlessly matched to your existing home.",
    description:
      "Room additions, second stories, and suites that look like they were always part of the house. We handle the structural engineering and tie new work into old so the seams disappear.",
    image: `${basePath}/images/framing-two-story.jpg`,
    imageAlt: "Wood framing of a two-story home addition under a blue sky",
    features: [
      "Room and second-story additions",
      "In-law and accessory suites",
      "Garage and porch builds",
      "Structural engineering",
    ],
  },
  {
    slug: "commercial",
    title: "Commercial Construction",
    short: "Build-outs and ground-up projects delivered on schedule.",
    description:
      "Offices, retail, and restaurants built to open on time. We move fast through permits, run trades in parallel, and phase the work so you can occupy finished space as soon as possible.",
    image: `${basePath}/images/commercial-office-green.jpg`,
    imageAlt: "Modern commercial office building with a glass facade",
    features: [
      "Office and retail build-outs",
      "Restaurant and hospitality",
      "Tenant improvements",
      "Ground up construction",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
