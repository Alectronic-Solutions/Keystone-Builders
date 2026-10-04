// Client testimonials. The first four appear on the homepage and about page;
// the full list appears on /reviews.

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  project: string;
  year: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Keystone built our home exactly the way they said they would, on the timeline they promised. The weekly updates made a huge project feel manageable.",
    name: "Sarah and Mark T.",
    location: "Shadyside",
    project: "New custom home",
    year: "2025",
  },
  {
    quote:
      "Our kitchen remodel came in on budget and the crew treated our house with respect. We get compliments every time someone walks in.",
    name: "Diane R.",
    location: "Squirrel Hill",
    project: "Kitchen remodel",
    year: "2025",
  },
  {
    quote:
      "As a property owner, schedule is everything. They delivered our office build-out two weeks early and the quality has held up beautifully.",
    name: "James K.",
    location: "Strip District",
    project: "Commercial build-out",
    year: "2024",
  },
  {
    quote:
      "The addition matches our 1940s home so well that visitors cannot tell where the old house ends. That takes real craftsmanship.",
    name: "The Halloran Family",
    location: "Mount Lebanon",
    project: "Primary suite addition",
    year: "2025",
  },
  {
    quote:
      "We interviewed four contractors. Keystone was the only one who walked the basement, asked about drainage, and gave us a bid we could actually read line by line.",
    name: "Priya and Dev S.",
    location: "Fox Chapel",
    project: "Spa bath renovation",
    year: "2026",
  },
  {
    quote:
      "They found knob-and-tube wiring behind our plaster on day two. Instead of a surprise bill, we got photos, three options, and a straight answer about which one they would choose.",
    name: "Tom W.",
    location: "Highland Park",
    project: "Whole-home renovation",
    year: "2024",
  },
  {
    quote:
      "Building on a hillside lot scared us. Their team planned the foundation and drainage before anything else, and two winters later the basement is bone dry.",
    name: "Angela M.",
    location: "Cranberry Township",
    project: "New custom home",
    year: "2024",
  },
  {
    quote:
      "Our restaurant opened on the date we announced, which in this business almost never happens. They ran the kitchen trades at night so the dining room could keep moving.",
    name: "Marco D.",
    location: "Lawrenceville",
    project: "Restaurant build-out",
    year: "2025",
  },
  {
    quote:
      "The crew cleaned up every single day. With two kids and a dog at home during a bath remodel, that mattered more than I expected.",
    name: "Kelly B.",
    location: "Upper St. Clair",
    project: "Bathroom remodel",
    year: "2026",
  },
  {
    quote:
      "Our project manager answered every text, usually within the hour. When the window order slipped, we heard it from him first along with a plan to stay on schedule.",
    name: "Rob and Lisa N.",
    location: "Sewickley",
    project: "Second-story addition",
    year: "2025",
  },
];
