"use client";

import { useState } from "react";
import { validateEmail, validatePhone } from "@/lib/utils";
import { GROUP_TYPE_LABELS, type GroupType } from "@/types";
import { Button } from "@/components/button";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface EnquiryFormProps {
  tripId: string;
  tripName: string;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  groupType: GroupType | "";
  preferredMonth: string;
  vibeAnswer: string;
}

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  groupType: "",
  preferredMonth: "",
  vibeAnswer: "",
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const MONTHS = [
  "July 2026", "August 2026", "September 2026", "October 2026",
  "November 2026", "December 2026", "Not sure yet",
];

export function EnquiryForm({ tripId, tripName }: EnquiryFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});

  function validate(values: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Tell us your name.";
    if (!values.phone.trim()) next.phone = "Phone number is required.";
    else if (!validatePhone(values.phone)) next.phone = "Enter a valid 10-digit Indian number.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!validateEmail(values.email)) next.email = "That email doesn't look right.";
    if (!values.groupType) next.groupType = "Choose who's coming along.";
    if (!values.preferredMonth) next.preferredMonth = "Pick a month, even a rough one.";
    return next;
  }

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleBlur(key: keyof FormState) {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(form));
  }

  async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  const validationErrors =
    validate(form);

  setErrors(validationErrors);

  setTouched({
    name: true,
    phone: true,
    email: true,
    groupType: true,
    preferredMonth: true,
  });

  if (
    Object.keys(validationErrors)
      .length > 0
  ) {
    return;
  }

  try {
    setSubmitState(
      "submitting"
    );
console.log({
  tripId,
  groupType: form.groupType,
});
    const res = await fetch(
      "/api/leads",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          name: form.name,

          phone: form.phone,

          email: form.email,

          groupType:
            form.groupType,

          preferredMonth:
            form.preferredMonth,

          tripFeeling:
            form.vibeAnswer,

          tripId,
        }),
      }
    );

    const data =
      await res.json();

    if (!res.ok) {
      throw new Error(
        data.error ||
          "Failed to submit"
      );
    }

    setSubmitState(
      "success"
    );

    setForm(initialState);
  } catch (error) {
    console.error(error);

    setSubmitState(
      "error"
    );
  }
}

  if (submitState === "success") {
    return (
      <div className="bg-olive/5 border border-olive/30 rounded-sm p-6 sm:p-8 text-center">
        <CheckCircle2 className="size-10 text-olive mx-auto mb-4" />
        <h3 className="font-display font-bold text-xl text-ink mb-2">
          Got it, {form.name.split(" ")[0]}.
        </h3>
        <p className="text-ink/70 leading-relaxed max-w-sm mx-auto">
          Someone from our team will call you about {tripName} within a day,
          usually sooner. Keep your phone handy.
        </p>
      </div>
    );
  }

  const fieldError = (key: keyof FormState) => (touched[key] ? errors[key] : undefined);

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {submitState === "error" && (
        <div className="bg-rust/5 border border-rust/30 rounded-sm p-4 flex items-start gap-3">
          <AlertCircle className="size-5 text-rust shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-ink">That didn't go through.</p>
            <p className="text-sm text-ink/70 mt-0.5">
              Check your connection and try again. Nothing you typed was lost.
            </p>
          </div>
        </div>
      )}

      <Field label="Your name" error={fieldError("name")}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          placeholder="What should we call you"
          className={inputClass(!!fieldError("name"))}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Phone number" error={fieldError("phone")}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            placeholder="98765 43210"
            className={inputClass(!!fieldError("phone"))}
          />
        </Field>
        <Field label="Email" error={fieldError("email")}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="you@email.com"
            className={inputClass(!!fieldError("email"))}
          />
        </Field>
      </div>

      <Field label="Who's coming along" error={fieldError("groupType")}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(Object.keys(GROUP_TYPE_LABELS) as GroupType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                handleChange("groupType", type);
                setTouched((t) => ({ ...t, groupType: true }));
              }}
              className={`px-3 py-2.5 text-sm font-medium rounded-sm border transition-colors ${
                form.groupType === type
                  ? "bg-ink text-cream border-ink"
                  : "bg-transparent text-ink border-ink/20 hover:border-ink/40"
              }`}
            >
              {GROUP_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Preferred month" error={fieldError("preferredMonth")}>
        <select
          value={form.preferredMonth}
          onChange={(e) => handleChange("preferredMonth", e.target.value)}
          onBlur={() => handleBlur("preferredMonth")}
          className={inputClass(!!fieldError("preferredMonth"))}
        >
          <option value="">Choose a month</option>
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </Field>

      <Field label="What are you hoping this trip feels like?" error={fieldError("vibeAnswer")} optional>
        <textarea
          value={form.vibeAnswer}
          onChange={(e) => handleChange("vibeAnswer", e.target.value)}
          placeholder="No wrong answers here. Tell us what you're after."
          rows={3}
          className={inputClass(false) + " resize-none"}
        />
      </Field>

      <Button type="submit" size="lg" loading={submitState === "submitting"} className="w-full sm:w-auto">
        {submitState === "submitting" ? "Sending" : "Send enquiry"}
      </Button>
      <input type="hidden" value={tripId} name="trip_id" />
    </form>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1.5">
        {label}
        {optional && <span className="text-ink/40 font-normal"> (optional)</span>}
      </label>
      {children}
      {error && <p className="text-xs text-rust mt-1.5">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-3.5 py-2.5 text-sm bg-cream border rounded-sm outline-none transition-colors ${
    hasError ? "border-rust" : "border-ink/20 focus:border-ink/40"
  }`;
}
