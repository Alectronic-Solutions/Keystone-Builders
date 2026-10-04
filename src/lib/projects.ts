import { basePath } from "@/lib/site";

// Project case studies. Shared by the homepage, /projects, and /projects/[slug].

export type Project = {
  slug: string;
  title: string;
  category: string;
  location: string;
  squareFootage: string;
  timeline: string;
  value: string;
  year: string;
  summary: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  // Matched shots from the same camera position, shown in the before/after slider.
  comparisons?: {
    label: string;
    before: { src: string; alt: string };
    after: { src: string; alt: string };
  }[];
  challenge: string;
  solution: string;
  result: string;
};

export const projects: Project[] = [
  {
    slug: "shadyside-modern-custom-home",
    title: "Shadyside Modern Custom Home",
    category: "New Home Construction",
    location: "Shadyside, Pittsburgh",
    squareFootage: "4,200 sq ft",
    timeline: "11 months",
    value: "$1.8M",
    year: "2024",
    summary:
      "A ground-up custom residence blending glass, stone, and warm wood on a hillside lot.",
    image: `${basePath}/images/home-exterior-glass.jpg`,
    imageAlt: "Modern custom home exterior with glass balconies and wood accents",
    gallery: [
      { src: `${basePath}/images/home-exterior-modern.jpg`, alt: "Rear elevation opening to the yard" },
      { src: `${basePath}/images/kitchen-white-island.jpg`, alt: "Open chef kitchen with island" },
      { src: `${basePath}/images/bath-marble-mirror.jpg`, alt: "Primary bath with marble and large mirror" },
    ],
    challenge:
      "The lot sloped steeply toward the rear, and the owners wanted floor-to-ceiling glass without giving up energy performance.",
    solution:
      "We engineered a stepped foundation and a high-performance window system, sequencing the build to keep the hillside stable through a wet spring.",
    result:
      "A four-bedroom home with an open great room, chef kitchen, and a rear wall that opens fully to the backyard.",
  },
  {
    slug: "squirrel-hill-kitchen-remodel",
    title: "Squirrel Hill Kitchen and Great Room Remodel",
    category: "Remodeling and Renovations",
    location: "Squirrel Hill, Pittsburgh",
    squareFootage: "850 sq ft",
    timeline: "14 weeks",
    value: "$185K",
    year: "2024",
    summary:
      "A closed-off 1920s kitchen opened up into one bright room for cooking and eating.",
    image: `${basePath}/images/kitchen-blue-granite.jpg`,
    imageAlt: "Remodeled kitchen with blue cabinetry and a granite island",
    gallery: [
      { src: `${basePath}/images/kitchen-beige-marble.jpg`, alt: "Marble counters and custom cabinetry" },
      { src: `${basePath}/images/kitchen-light-dining.jpg`, alt: "Light dining area off the kitchen" },
      { src: `${basePath}/images/kitchen-white-wood.jpg`, alt: "White cabinetry with warm wood details" },
    ],
    challenge:
      "A load-bearing wall separated the kitchen from the living area, and the owners wanted one continuous space.",
    solution:
      "We installed a steel beam to carry the second floor, then rebuilt the room with custom cabinetry and a stone island.",
    result:
      "An open great room with seating for eight and clear sightlines from the range to the backyard.",
  },
  {
    slug: "strip-district-office-buildout",
    title: "Strip District Office Build-Out",
    category: "Commercial Construction",
    location: "Strip District, Pittsburgh",
    squareFootage: "12,000 sq ft",
    timeline: "5 months",
    value: "$2.4M",
    year: "2023",
    summary: "A raw warehouse floor turned into a modern company headquarters.",
    image: `${basePath}/images/commercial-office-green.jpg`,
    imageAlt: "Modern office building exterior with a glass facade",
    gallery: [
      { src: `${basePath}/images/commercial-office-glass.jpg`, alt: "Glass-walled conference rooms" },
      { src: `${basePath}/images/commercial-office-reflection.jpg`, alt: "Open work areas with daylight" },
      { src: `${basePath}/images/commercial-office-twilight.jpg`, alt: "Building exterior at dusk" },
    ],
    challenge:
      "The tenant needed to move in before their old lease ended, leaving a tight five month window.",
    solution:
      "We fast tracked permits, ran trades in parallel, and phased the fit-out so finished areas could be occupied first.",
    result:
      "Open work areas, glass conference rooms, and a cafe, delivered two weeks ahead of schedule.",
  },
  {
    slug: "mount-lebanon-master-suite",
    title: "Mount Lebanon Master Suite Addition",
    category: "Additions",
    location: "Mount Lebanon",
    squareFootage: "600 sq ft",
    timeline: "16 weeks",
    value: "$240K",
    year: "2023",
    summary:
      "A second-story primary suite that matches the home like it was always there.",
    image: `${basePath}/images/home-exterior-terrace.jpg`,
    imageAlt: "Two-story home exterior with a new upper-level addition",
    gallery: [
      { src: `${basePath}/images/framing-two-story.jpg`, alt: "Framing the new second story" },
      { src: `${basePath}/images/bath-dual-sink.jpg`, alt: "Spa bath with dual vanity" },
      { src: `${basePath}/images/bath-timber.jpg`, alt: "Soaking tub with warm timber accents" },
    ],
    challenge:
      "The addition had to tie into a steep existing roofline and match brick that is no longer manufactured.",
    solution:
      "We sourced reclaimed brick, re-framed the roof to blend the two rooflines, and reinforced the first floor to carry the new load.",
    result:
      "A private suite with a spa bath and walk-in closet, with an exterior that reads as original to the home.",
  },
  {
    slug: "fox-chapel-spa-bath",
    title: "Fox Chapel Spa Bath Renovation",
    category: "Remodeling and Renovations",
    location: "Fox Chapel",
    squareFootage: "320 sq ft",
    timeline: "9 weeks",
    value: "$95K",
    year: "2025",
    summary: "A dated primary bath rebuilt with marble, a freestanding tub, and a walk-in shower.",
    image: `${basePath}/images/bath-luxury-marble.jpg`,
    imageAlt: "Luxury bathroom with marble surfaces and a dual vanity",
    gallery: [
      { src: `${basePath}/images/bath-marble-mirror.jpg`, alt: "Marble walls and a large mirror" },
      { src: `${basePath}/images/bath-white-tub.jpg`, alt: "Freestanding tub by a glass shower" },
      { src: `${basePath}/images/bath-glass-shower.jpg`, alt: "Walk-in glass shower with tile detail" },
    ],
    challenge:
      "The owners wanted a heated floor and a curbless shower in a footprint with low ceilings and old cast iron plumbing.",
    solution:
      "We re-routed the plumbing, lowered the joists where code allowed, and built a fully waterproofed curbless shower pan.",
    result:
      "A bright spa bath with radiant heat, a freestanding tub, and a walk-in shower that drains flawlessly.",
  },
  {
    slug: "cranberry-township-new-build",
    title: "Cranberry Township New Build",
    category: "New Home Construction",
    location: "Cranberry Township",
    squareFootage: "3,400 sq ft",
    timeline: "10 months",
    value: "$1.1M",
    year: "2025",
    summary: "A foundation-to-finish family home on a wooded lot.",
    image: `${basePath}/images/home-exterior-minimal.jpg`,
    imageAlt: "Clean modern home exterior on a landscaped lot",
    gallery: [
      { src: `${basePath}/images/foundation-crew.jpg`, alt: "Crew setting foundations and footings" },
      { src: `${basePath}/images/framing-wood-house.jpg`, alt: "Completed framing of the two-story home" },
      { src: `${basePath}/images/home-brick-finished.jpg`, alt: "Finished brick exterior at completion" },
    ],
    challenge:
      "The wooded lot had poor drainage and a long approach, so the build had to protect mature trees and manage water from day one.",
    solution:
      "We graded for positive drainage, installed a French drain system, and routed construction traffic to preserve the tree line.",
    result:
      "A five-bedroom family home that sits naturally on the lot, with a dry basement and the original trees intact.",
  },
  {
    slug: "brookline-whole-home-renovation",
    title: "Brookline Whole-Home Renovation",
    category: "Remodeling and Renovations",
    location: "Brookline, Pittsburgh",
    squareFootage: "1,450 sq ft",
    timeline: "12 weeks",
    value: "$138K",
    year: "2025",
    summary:
      "A tired 1950s brick ranch brought up to date room by room, from the kitchen and hall bath to the floors and lighting.",
    image: `${basePath}/images/whole-home-kitchen-after.jpg`,
    imageAlt: "Renovated kitchen with dark wood cabinets, stone-look counters, and stainless appliances",
    gallery: [
      { src: `${basePath}/images/whole-home-living-after.jpg`, alt: "Living room with refinished oak floors, recessed lights, and a ceiling fan" },
      { src: `${basePath}/images/whole-home-bedroom-after.jpg`, alt: "Primary bedroom with mirrored closet doors and refinished floors" },
      { src: `${basePath}/images/whole-home-living-before.jpg`, alt: "The living room before the renovation" },
    ],
    comparisons: [
      {
        label: "Kitchen",
        before: { src: `${basePath}/images/whole-home-kitchen-before.jpg`, alt: "The original kitchen with white laminate cabinets and worn vinyl flooring" },
        after: { src: `${basePath}/images/whole-home-kitchen-after.jpg`, alt: "The new kitchen with dark wood cabinets and stainless appliances" },
      },
      {
        label: "Hall bath",
        before: { src: `${basePath}/images/whole-home-bath-before.jpg`, alt: "The original hall bath with a dated vanity and medicine cabinet" },
        after: { src: `${basePath}/images/whole-home-bath-after.jpg`, alt: "The updated hall bath with a new vanity, lighting, and door" },
      },
    ],
    challenge:
      "The owners bought the house with its original layout intact and nothing updated since the 1990s. They wanted it move-in ready in one pass, on a fixed budget, without changing the floor plan.",
    solution:
      "We phased the work so the kitchen and bath were done first, then refinished the original oak floors, added recessed lighting and ceiling fans, and painted throughout. Keeping plumbing and walls in place kept the budget where it needed to be.",
    result:
      "A new kitchen and hall bath, refinished floors, and updated lighting in every room, delivered in twelve weeks and within the original contract price.",
  },
  {
    slug: "dormont-kitchen-remodel",
    title: "Dormont Galley Kitchen Remodel",
    category: "Remodeling and Renovations",
    location: "Dormont",
    squareFootage: "320 sq ft",
    timeline: "8 weeks",
    value: "$64K",
    year: "2026",
    summary:
      "A worn-out galley kitchen in a 1930s house rebuilt with shaker cabinets, new counters, and durable plank flooring.",
    image: `${basePath}/images/galley-kitchen-after.jpg`,
    imageAlt: "Remodeled galley kitchen with gray shaker cabinets and stainless appliances",
    gallery: [
      { src: `${basePath}/images/galley-kitchen-after-2.jpg`, alt: "The far wall of the kitchen with new cabinets and a range" },
      { src: `${basePath}/images/galley-kitchen-after.jpg`, alt: "Looking down the length of the remodeled kitchen" },
      { src: `${basePath}/images/galley-kitchen-before.jpg`, alt: "The kitchen before the remodel" },
    ],
    comparisons: [
      {
        label: "Looking toward the windows",
        before: { src: `${basePath}/images/galley-kitchen-before.jpg`, alt: "The original kitchen with open shelving, old appliances, and carpet runners" },
        after: { src: `${basePath}/images/galley-kitchen-after.jpg`, alt: "The remodeled kitchen with gray cabinets and plank flooring" },
      },
      {
        label: "Range wall",
        before: { src: `${basePath}/images/galley-kitchen-before-2.jpg`, alt: "The original range wall with open shelves and a coil-top stove" },
        after: { src: `${basePath}/images/galley-kitchen-after-2.jpg`, alt: "The new range wall with shaker cabinets and a stainless range" },
      },
    ],
    challenge:
      "Open shelves, a coil-top range, and patched flooring made the kitchen hard to keep clean, and the old cabinets had no usable storage above the counters.",
    solution:
      "We kept the plumbing and window wall where they were, installed full-height shaker cabinets with a vented microwave over the range, and laid waterproof plank flooring through the whole room.",
    result:
      "Twice the closed storage, new appliances, and a floor that stands up to daily use, finished in eight weeks with the family living at home.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
