// Button: link styled as a 3D CTA with a shine sweep, in brand variants.
import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  primary: "bg-primary text-background",
  accent: "bg-accent text-primary",
  outline:
    "border border-primary/30 text-primary hover:border-primary hover:bg-primary/5",
  "outline-light":
    "border border-background/40 text-background hover:bg-background/10",
};

// Outline variants stay flat; solid variants get the 3D + shine treatment.
const solid = new Set(["primary", "accent"]);

const base =
  "shine inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold transition-all duration-200";

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const depth = solid.has(variant) ? "btn-3d" : "hover:scale-[1.02]";
  const cls = `${base} ${depth} ${variants[variant]} ${className}`;
  const content = <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>;

  // Plain phone/email links use an anchor; internal routes use next/link.
  if (href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
