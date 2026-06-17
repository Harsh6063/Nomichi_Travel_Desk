import { cn } from "@/lib/utils";

interface StampBadgeProps {
  children: React.ReactNode;
  tone?: "rust" | "olive" | "ink" | "sand";
  className?: string;
}

const toneStyles: Record<string, string> = {
  rust: "text-rust",
  olive: "text-olive",
  ink: "text-ink",
  sand: "text-[#9C6B2E]",
};

export function StampBadge({ children, tone = "ink", className }: StampBadgeProps) {
  return (
    <span
      className={cn(
        "stamp inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider",
        toneStyles[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
