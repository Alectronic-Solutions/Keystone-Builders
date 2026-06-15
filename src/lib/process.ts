// The four-step client process, shown on the homepage and about page.

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation and Estimate",
    description:
      "We walk your site, listen to your goals, and provide a clear written estimate with no surprises.",
  },
  {
    number: "02",
    title: "Design and Planning",
    description:
      "We refine the drawings, lock the scope, and handle permits, engineering, and material selections.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Your dedicated project manager runs the schedule, coordinates the trades, and updates you every week.",
  },
  {
    number: "04",
    title: "Walkthrough and Warranty",
    description:
      "We complete the punch list together and stand behind the work with a written workmanship warranty.",
  },
];
