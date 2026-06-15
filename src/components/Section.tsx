// Section: consistent vertical rhythm and centered content width.
import type { ReactNode } from "react";

const tones = {
  linen: "bg-background text-ink",
  white: "bg-white text-ink",
  primary: "bg-primary text-background",
};

export default function Section({
  children,
  tone = "linen",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-content px-4 py-16 md:py-24">{children}</div>
    </section>
  );
}
