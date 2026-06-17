import Link from "next/link";
import { UserX } from "lucide-react";

export default function LeadNotFound() {
  return (
    <div className="flex items-center justify-center px-5 py-24">
      <div className="text-center max-w-sm">
        <UserX className="size-9 text-ink/30 mx-auto mb-4" />
        <h1 className="font-display font-bold text-xl text-ink mb-2">
          Can't find this lead
        </h1>
        <p className="text-ink/60 mb-5">
          It may have been removed, or the link is off.
        </p>
        <Link href="/admin/leads" className="text-sm font-medium text-rust hover:underline">
          Back to all leads
        </Link>
      </div>
    </div>
  );
}
