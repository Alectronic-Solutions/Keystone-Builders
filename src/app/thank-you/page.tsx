"use client";

// Thank-you: landing page after a FormSubmit submission.
// Counts down 8 s then auto-redirects to the homepage.
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ThankYouPage() {
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
    <section className="mx-auto flex max-w-content flex-col items-center justify-center px-4 py-28 text-center md:py-36">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-4xl text-primary">
        &#10003;
      </span>
      <h1 className="mt-8 font-display text-3xl font-bold text-primary md:text-4xl">
        We received your request
      </h1>
      <p className="mt-4 max-w-md text-base text-ink-soft">
        Someone from our team will follow up within one business day to schedule
        your free site visit. We look forward to learning about your project.
      </p>
      <p className="mt-8 text-sm text-ink-soft">
        Returning to the homepage in{" "}
        <span className="font-semibold text-primary">{seconds}</span>{" "}
        second{seconds !== 1 ? "s" : ""}
        {" "}or{" "}
        <Link href="/" className="font-semibold text-accent underline underline-offset-2">
          go now
        </Link>
        .
      </p>
    </section>
  );
}
