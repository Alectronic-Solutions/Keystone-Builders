"use client";

// ThankYouContent: countdown + redirect logic for the post-submission page.
// Split into its own client component so the parent page.tsx can stay a
// server component and export metadata (noindex, since this is a transient page).
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ThankYouContent() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(8);

  useEffect(() => {
    if (seconds <= 0) {
      router.push("/");
      return;
    }
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds, router]);

  return (
    // Dark band so the transparent navbar's light logo stays visible at page top.
    <section className="bg-primary text-background">
      <div className="mx-auto flex min-h-[70svh] max-w-content flex-col items-center justify-center px-4 pb-24 pt-36 text-center md:pb-32 md:pt-40">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-4xl text-primary">
          &#10003;
        </span>
        <h1 className="mt-8 font-display text-3xl font-bold text-background md:text-4xl">
          We received your request
        </h1>
        <p className="mt-4 max-w-md text-base text-background/80">
          Someone from our team will follow up within one business day to schedule
          your free site visit. We look forward to learning about your project.
        </p>
        <p className="mt-8 text-base text-background/80">
          Returning to the homepage in{" "}
          <span className="font-semibold text-background">{seconds}</span>{" "}
          second{seconds !== 1 ? "s" : ""}
          {" "}or{" "}
          <Link href="/" className="font-semibold text-accent underline underline-offset-2">
            go now
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
