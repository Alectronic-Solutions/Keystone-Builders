// Logo: keystone mark plus wordmark. Pass dark={true} when on a dark bg.
import { site } from "@/lib/site";

export default function Logo({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="h-8 w-8 shrink-0"
      >
        <path
          d="M9 6 H23 L28 26 H4 Z"
          fill={dark ? "#F5F1EB" : "#1C2B3A"}
        />
        <path
          d="M14 6 H18 L19.2 26 H12.8 Z"
          fill="#C9A96E"
        />
      </svg>
      <span
        className={`font-display text-lg font-bold leading-none tracking-tight sm:text-xl ${
          dark ? "text-background" : "text-primary"
        }`}
      >
        {site.name}
      </span>
    </span>
  );
}
