"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/button";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Enter both email and password.");
      return;
    }

    setLoading(true);
    // Simulated auth — will become supabase.auth.signInWithPassword
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);

    if (email.endsWith("@thenomichi.com")) {
      router.push("/admin");
    } else {
      setError("That email isn't on the team. Use your thenomichi.com address.");
    }
  }

  return (
    <main className="flex-1 flex items-center justify-center px-5 py-16 bg-ink">
      <div className="w-full max-w-sm">
        <Link href="/" className="block text-center mb-8">
          <span className="font-display font-black text-3xl text-cream">nomichi</span>
        </Link>

        <div className="bg-cream rounded-sm p-7 sm:p-8">
          <h1 className="font-display font-bold text-xl text-ink mb-1">Team login</h1>
          <p className="text-sm text-ink/60 mb-6">Sign in to manage leads and trips.</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <div className="bg-rust/5 border border-rust/30 rounded-sm p-3 flex items-start gap-2.5">
                <AlertCircle className="size-4 text-rust shrink-0 mt-0.5" />
                <p className="text-sm text-ink">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@thenomichi.com"
                className="w-full px-3.5 py-2.5 text-sm bg-cream border border-ink/20 rounded-sm outline-none focus:border-ink/40"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm bg-cream border border-ink/20 rounded-sm outline-none focus:border-ink/40"
              />
            </div>

            <Button type="submit" size="lg" loading={loading} className="w-full">
              {loading ? "Signing in" : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="text-center text-cream/50 text-xs mt-6">
          For team use only. Reach tech@thenomichi.com for access.
        </p>
      </div>
    </main>
  );
}
