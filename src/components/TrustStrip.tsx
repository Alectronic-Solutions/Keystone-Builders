// TrustStrip: slim credentialing bar shown at the very top of every page.
// Fixed at h-8 (32px) at every breakpoint; Navbar slides over exactly that height.
import { site } from "@/lib/site";

export default function TrustStrip() {
  return (
    <div className="relative z-40 bg-primary text-background">
      <div className="mx-auto flex h-8 max-w-content items-center justify-center px-4 text-center text-xs sm:justify-between sm:text-left sm:text-sm">
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
