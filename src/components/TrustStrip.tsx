// TrustStrip: slim credentialing bar shown at the very top of every page.
import { site } from "@/lib/site";

export default function TrustStrip() {
  return (
    <div className="relative z-40 bg-primary text-background">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-1 px-4 py-2 text-center text-xs sm:flex-row sm:text-left">
        <p className="font-medium tracking-wide">
          Licensed and Insured
          <span className="text-accent"> &middot; {site.license}</span>
        </p>
        <p className="hidden text-background/80 sm:block">
          Serving {site.serviceArea} since {site.foundedYear}
        </p>
      </div>
    </div>
  );
}
