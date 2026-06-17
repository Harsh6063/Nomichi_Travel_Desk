import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 flex items-start justify-between gap-4 border-b border-ink/10",
        className
      )}
    >
      <div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink">{title}</h1>
        {description && <p className="text-sm text-ink/60 mt-1">{description}</p>}
      </div>
      {action}
    </div>
  );
}
