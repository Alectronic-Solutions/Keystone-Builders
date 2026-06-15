// 404: friendly not-found page that keeps visitors moving toward a quote.
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-center justify-center px-4 py-28 text-center md:py-36">
      <p className="font-display text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-primary md:text-4xl">
        We could not find that page
      </h1>
      <p className="mt-4 max-w-md text-base text-ink-soft">
        The page may have moved. Let us point you back to solid ground.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="primary">
          Back to home
        </Button>
        <Button href="/contact" variant="outline">
          Get an estimate
        </Button>
      </div>
    </section>
  );
}
