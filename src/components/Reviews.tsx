"use client";

import { Quote } from "lucide-react";

const reviews = [
  {
    name: "Mohit Lalwani",
    role: "Meghalaya Traveller",
    image: "/images/reviews/adiya.png",
    quote: "Every detail was seamless. From hidden local spots to smooth transfers.",
  },
  {
    name: "Kajol Dasani",
    role: "Shoja Explorer",
    image: "/images/reviews/harsh.png",
    quote: "The group became family. I came back with stories and friendships.",
  },
  {
    name: "Ayesha Israil",
    role: "Solo Traveller",
    image: "/images/reviews/pintu.png",
    quote: "Perfect balance of adventure, comfort and genuine connection.",
  },
  {
    name: "Rohit Garg",
    role: "Nomichi Traveller",
    image: "/images/reviews/rohit.png",
    quote: "The conversations and people were the highlight of the journey.",
  },
  {
    name: "Yogesh",
    role: "Community Member",
    image: "/images/reviews/shana.png",
    quote: "It never felt like a tour. It felt like travelling with friends.",
  },
  {
    name: "Sahana",
    role: "Weekend Explorer",
    image: "/images/reviews/harsh1.png",
    quote: "Exactly what slow travel should feel like.",
  },
];

function ReviewCard({ review }: { review: (typeof reviews)[0] }) {
  return (
    <div className="review-card">

      <div className="flex items-center gap-4 mb-6">

        <img
          src={review.image}
          alt={review.name}
          className="review-avatar"
        />

        <div>
          <h4 className="font-bold text-lg text-ink">
            {review.name}
          </h4>

          <p className="text-rust text-xs uppercase tracking-[0.2em]">
            {review.role}
          </p>
        </div>

      </div>

      <Quote
        size={28}
        className="text-rust mb-4"
      />

      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="text-rust text-lg"
          >
            ★
          </span>
        ))}
      </div>

      <p className="review-text">
        "{review.quote}"
      </p>

    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 overflow-hidden bg-white">

      <div className="text-center mb-20">

        <p className="uppercase tracking-[0.3em] text-rust text-sm">
          TESTIMONIALS
        </p>

        <h2 className="font-display text-5xl md:text-7xl font-black text-rust">
          Real Travellers.
        </h2>

        <h3 className="font-display text-5xl md:text-7xl font-black text-ink">
          Real Stories.
        </h3>

      </div>

      <div className="reviews-wrapper">

        <div className="reviews-column reviews-up">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard
              key={`left-${i}`}
              review={review}
            />
          ))}
        </div>

        <div className="reviews-column reviews-down">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard
              key={`middle-${i}`}
              review={review}
            />
          ))}
        </div>

        <div className="reviews-column reviews-up">
          {[...reviews, ...reviews].map((review, i) => (
            <ReviewCard
              key={`right-${i}`}
              review={review}
            />
          ))}
        </div>

      </div>

    </section>
  );
}