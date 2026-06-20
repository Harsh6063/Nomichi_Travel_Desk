"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
AlertCircle,
Eye,
EyeOff,
} from "lucide-react";

import { Button } from "@/components/button";

export default function LoginPage() {
const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] =
useState("");

const [showPassword, setShowPassword] =
useState(false);

const [error, setError] =
useState("");

const [loading, setLoading] =
useState(false);

async function handleSubmit(
e: React.FormEvent
) {
e.preventDefault();

setError("");

if (
  !email.trim() ||
  !password.trim()
) {
  setError(
    "Enter both email and password."
  );
  return;
}

try {
  setLoading(true);

  const res = await fetch(
    "/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    setError(
      data.error ||
        "Invalid email or password."
    );
    return;
  }

  router.push("/admin");
  router.refresh();
} catch (error) {
  setError(
    "Something went wrong. Please try again."
  );
} finally {
  setLoading(false);
}

}

return ( <main
   className="
     min-h-screen
     flex
     items-center
     justify-center
     px-5
     py-16
     bg-gradient-to-br
     from-ink
     via-[#111827]
     to-ink
   "
 > <div className="w-full max-w-md">

    {/* Logo */}

    <Link
      href="/"
      className="block text-center mb-10"
    >
      <img
        src="/images/logo.svg"
        alt="Nomichi"
        className="
          h-14
          mx-auto
          object-contain
        "
      />
    </Link>

    {/* Card */}

    <div
      className="
        bg-cream
        rounded-2xl
        shadow-2xl
        p-8
      "
    >
      <h1
        className="
          font-display
          font-bold
          text-2xl
          text-ink
          mb-2
        "
      >
        Team Login
      </h1>

      <p
        className="
          text-sm
          text-ink/60
          mb-8
        "
      >
        Sign in to manage leads,
        trips and traveller enquiries.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
      >
        {/* Error */}

        {error && (
          <div
            className="
              bg-rust/5
              border
              border-rust/30
              rounded-xl
              p-4
              flex
              gap-3
            "
          >
            <AlertCircle
              className="
                size-5
                text-rust
                shrink-0
              "
            />

            <p
              className="
                text-sm
                text-rust
                font-medium
              "
            >
              {error}
            </p>
          </div>
        )}

        {/* Email */}

        <div>
          <label
            className="
              block
              text-sm
              font-medium
              text-ink
              mb-2
            "
          >
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="admin@thenomichi.com"
            className="
              w-full
              px-4
              py-3
              bg-white
              border
              border-ink/20
              rounded-xl
              outline-none
              focus:border-rust
              transition
            "
          />
        </div>

        {/* Password */}

        <div>
          <label
            className="
              block
              text-sm
              font-medium
              text-ink
              mb-2
            "
          >
            Password
          </label>

          <div className="relative">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              placeholder="••••••••"
              className="
                w-full
                px-4
                py-3
                pr-12
                bg-white
                border
                border-ink/20
                rounded-xl
                outline-none
                focus:border-rust
                transition
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-ink/50
              "
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>

          </div>
        </div>

        {/* Button */}

        <Button
          type="submit"
          size="lg"
          loading={loading}
          className="w-full"
        >
          {loading
            ? "Authenticating..."
            : "Sign In"}
        </Button>

        {/* Forgot Password */}

        <div className="text-center">

          <button
            type="button"
            className="
              text-rust
              text-sm
              hover:underline
            "
          >
            Forgot Password?
          </button>

        </div>

      </form>
    </div>

    {/* Footer Text */}

    <div className="mt-8 text-center">

      <p
        className="
          text-xs
          text-cream/50
        "
      >
        For team use only.
        Contact tech@thenomichi.com
        for access.
      </p>

      <div
        className="
          mt-4
          text-xs
          text-cream/30
        "
      >
        Nomichi Admin Portal
      </div>

    </div>

  </div>
</main>

);
}
