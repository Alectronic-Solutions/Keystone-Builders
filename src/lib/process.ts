// The four-step client process, shown on the homepage, about page, and in
// full detail on /process.

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  duration: string;
  activities: string[];
  deliverable: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation and Estimate",
    description:
      "We walk your site, listen to your goals, and provide a clear written estimate with no surprises.",
    duration: "1 to 2 weeks",
    activities: [
      "A phone call to understand your project, budget range, and timing",
      "An on-site visit with a project manager, usually within a few business days",
      "Measurements, photos, and a look at existing structure and systems",
      "A frank conversation about what your budget can realistically achieve",
    ],
    deliverable: "A written, itemized estimate you can compare line by line.",
  },
  {
    number: "02",
    title: "Design and Planning",
    description:
      "We refine the drawings, lock the scope, and handle permits, engineering, and material selections.",
    duration: "3 to 10 weeks",
    activities: [
      "Drawings refined with your architect or our design partner",
      "Structural engineering where walls, beams, or foundations change",
      "Finish selections scheduled so choices never delay the build",
      "Permit applications filed and tracked by our office",
    ],
    deliverable: "A fixed-scope contract, a construction schedule, and approved permits.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Your dedicated project manager runs the schedule, coordinates the trades, and updates you every week.",
    duration: "Varies by project",
    activities: [
      "Site protection and a daily clean-up routine from day one",
      "Our own carpenters on the core work, licensed trades for the rest",
      "Inspections scheduled and attended by your project manager",
      "Any change priced in writing and approved by you before it happens",
    ],
    deliverable: "A written progress update with photos every week of the build.",
  },
  {
    number: "04",
    title: "Walkthrough and Warranty",
    description:
      "We complete the punch list together and stand behind the work with a written workmanship warranty.",
    duration: "1 to 2 weeks",
    activities: [
      "A room-by-room walkthrough with you and your project manager",
      "A written punch list, completed and signed off together",
      "Manuals, paint colors, and material records handed over in one binder",
      "A check-in call at 30 days and again before the warranty ends",
    ],
    deliverable: "Your two-year workmanship warranty, in writing.",
  },
];
