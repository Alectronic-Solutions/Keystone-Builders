// 404: friendly not-found page that keeps visitors moving toward a quote.
import type { Metadata } from "next";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    // Dark band so the transparent navbar's light logo stays visible at page top.
    <section className="bg-primary text-background">
      <div className="mx-auto flex min-h-[70svh] max-w-content flex-col items-center justify-center px-4 pb-24 pt-36 text-center md:pb-32 md:pt-40">
        <p className="font-display text-6xl font-bold text-accent">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-background md:text-4xl">
          We could not find that page
        </h1>
        <p className="mt-4 max-w-md text-base text-background/80">
          The page may have moved. Let us point you back to solid ground.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href="/" variant="accent">
            Back to home
          </Button>
          <Button href="/contact" variant="outline-light">
            Get an estimate
          </Button>
        </div>
      </div>
    </section>
  );
}
