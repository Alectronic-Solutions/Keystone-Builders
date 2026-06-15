// Client testimonials used on the homepage and about page.

export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  project: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Keystone built our home exactly the way they said they would, on the timeline they promised. The weekly updates made a huge project feel manageable.",
    name: "Sarah and Mark T.",
    location: "Shadyside",
    project: "New custom home",
  },
  {
    quote:
      "Our kitchen remodel came in on budget and the crew treated our house with respect. We get compliments every time someone walks in.",
    name: "Diane R.",
    location: "Squirrel Hill",
    project: "Kitchen remodel",
  },
  {
    quote:
      "As a property owner, schedule is everything. They delivered our office build-out two weeks early and the quality has held up beautifully.",
    name: "James K.",
    location: "Strip District",
    project: "Commercial build-out",
  },
  {
    quote:
      "The addition matches our 1940s home so well that visitors cannot tell where the old house ends. That takes real craftsmanship.",
    name: "The Halloran Family",
    location: "Mount Lebanon",
    project: "Master suite addition",
  },
];
