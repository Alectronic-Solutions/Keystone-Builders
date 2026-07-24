// Thank-you: landing page after a FormSubmit submission. Not indexed since
// it's a transient post-submit destination, not content worth surfacing in search.
import type { Metadata } from "next";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
