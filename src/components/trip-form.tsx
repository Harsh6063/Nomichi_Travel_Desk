"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import type { Trip, TripStatus } from "@/types";
import { AlertCircle } from "lucide-react";

interface TripFormProps {
  initialTrip?: Trip;
  mode: "create" | "edit";
}

interface FormState {
  name: string;
  destination: string;
  start_date: string;
  end_date: string;
  price_inr: string;
  total_seats: string;
  status: TripStatus;
  description: string;
  journeyType: string;
duration: string;
image: string;
}

function tripToForm(trip?: any): FormState {
  if (!trip) {
    return {
      name: "",
      destination: "",
      start_date: "",
      end_date: "",
      price_inr: "",
      total_seats: "",
      status: "open",
      description: "",
      journeyType: "",
      duration: "",
      image: "",
    };
  }

  return {
    name: trip.name ?? "",
    destination: trip.destination ?? "",

    start_date: trip.startDate
      ? new Date(trip.startDate)
          .toISOString()
          .split("T")[0]
      : "",

    end_date: trip.endDate
      ? new Date(trip.endDate)
          .toISOString()
          .split("T")[0]
      : "",

    price_inr: String(trip.priceGST ?? ""),
    total_seats: String(trip.totalSeats ?? ""),

    status:
      trip.status === "OPEN"
        ? "open"
        : "closed",

    description: trip.description ?? "",
    journeyType: trip.journeyType ?? "",
    duration: trip.duration ?? "",
    image: trip.image ?? "",
  };
}

export function TripForm({ initialTrip, mode }: TripFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(tripToForm(initialTrip));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validate(): Partial<Record<keyof FormState, string>> {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Trip name is required.";
    if (!form.destination.trim()) next.destination = "Destination is required.";
    if (!form.start_date) next.start_date = "Pick a start date.";
    if (!form.end_date) next.end_date = "Pick an end date.";
    if (form.start_date && form.end_date && form.end_date < form.start_date) {
      next.end_date = "End date can't be before the start date.";
    }
    if (!form.price_inr || Number(form.price_inr) <= 0) next.price_inr = "Enter a valid price.";
    if (!form.total_seats || Number(form.total_seats) <= 0) next.total_seats = "Enter total seats.";
    if (!form.description.trim()) next.description = "Add a full description.";
    return next;
  }

 async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  const validationErrors = validate();

  setErrors(validationErrors);

  if (
    Object.keys(validationErrors)
      .length > 0
  ) {
    return;
  }

  try {
    setSaving(true);
    setSaveError("");

    const res = await fetch(
      "/api/trips",
      {
        method:
          mode === "create"
            ? "POST"
            : "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
  id: initialTrip?.id,

  name: form.name,
  destination: form.destination,

  startDate: form.start_date,
  endDate: form.end_date,

  priceGST: Number(form.price_inr),
  totalSeats: Number(form.total_seats),

  journeyType: form.journeyType,
  duration: form.duration,
  image: form.image,

  status: form.status.toUpperCase(),

  description: form.description,
}),
      }
    );

    const data =
      await res.json();

    if (!res.ok) {
      throw new Error(
        data.error ||
          "Failed to save trip"
      );
    }

    router.push(
      "/admin/trips"
    );

    router.refresh();
  } catch (error: any) {
    setSaveError(
      error.message ||
        "Couldn't save trip."
    );
  } finally {
    setSaving(false);
  }
}

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl" noValidate>
      {saveError && (
        <div className="bg-rust/5 border border-rust/30 rounded-sm p-4 flex items-start gap-3">
          <AlertCircle className="size-5 text-rust shrink-0 mt-0.5" />
          <p className="text-sm text-ink">{saveError}</p>
        </div>
      )}

      <Field label="Trip name" error={errors.name}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Spiti in Slow Motion"
          className={inputClass(!!errors.name)}
        />
      </Field>

      <Field label="Destination" error={errors.destination}>
        <input
          type="text"
          value={form.destination}
          onChange={(e) => handleChange("destination", e.target.value)}
          placeholder="Spiti Valley, Himachal Pradesh"
          className={inputClass(!!errors.destination)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-5">
        <Field label="Start date" error={errors.start_date}>
          <input
            type="date"
            value={form.start_date}
            onChange={(e) => handleChange("start_date", e.target.value)}
            className={inputClass(!!errors.start_date)}
          />
        </Field>
        <Field label="End date" error={errors.end_date}>
          <input
            type="date"
            value={form.end_date}
            onChange={(e) => handleChange("end_date", e.target.value)}
            className={inputClass(!!errors.end_date)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Field label="Price (incl. GST)" error={errors.price_inr}>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/50 text-sm">₹</span>
            <input
              type="number"
              value={form.price_inr}
              onChange={(e) => handleChange("price_inr", e.target.value)}
              placeholder="42500"
              className={inputClass(!!errors.price_inr) + " pl-7"}
            />
          </div>
        </Field>
        <Field label="Total seats" error={errors.total_seats}>
          <input
            type="number"
            value={form.total_seats}
            onChange={(e) => handleChange("total_seats", e.target.value)}
            placeholder="12"
            className={inputClass(!!errors.total_seats)}
          />
        </Field>
      </div>
<Field label="Journey Type">
  <input
    type="text"
    value={form.journeyType}
    onChange={(e) =>
      handleChange(
        "journeyType",
        e.target.value
      )
    }
    placeholder="Slow Travel"
    className={inputClass(false)}
  />
</Field>

<Field label="Duration">
  <input
    type="text"
    value={form.duration}
    onChange={(e) =>
      handleChange(
        "duration",
        e.target.value
      )
    }
    placeholder="3D / 2N"
    className={inputClass(false)}
  />
</Field>

<Field label="Image URL">
  <input
    type="text"
    value={form.image}
    onChange={(e) =>
      handleChange(
        "image",
        e.target.value
      )
    }
    placeholder="/images/stories/shoja.jpg"
    className={inputClass(false)}
  />
</Field>
      <Field label="Status">
        <div className="flex gap-2">
          {(["open", "closed"] as TripStatus[]).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => handleChange("status", status)}
              className={`px-4 py-2 text-sm font-medium rounded-sm border transition-colors capitalize ${
                form.status === status
                  ? "bg-ink text-cream border-ink"
                  : "bg-transparent text-ink border-ink/20 hover:border-ink/40"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <p className="text-xs text-ink/50 mt-1.5">
          Open trips appear on the public site. Closed trips are hidden from travellers.
        </p>
      </Field>

      <Field label="Full description" error={errors.description}>
        <textarea
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={5}
          placeholder="What the trip is actually like, day to day"
          className={inputClass(!!errors.description) + " resize-none"}
        />
      </Field>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={saving}>
          {saving ? "Saving" : mode === "create" ? "Create trip" : "Save changes"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/trips")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-1.5">{label}</label>
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
