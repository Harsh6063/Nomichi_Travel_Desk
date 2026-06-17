"use client";

import { motion } from "framer-motion";
import {
Compass,
Leaf,
ShieldCheck,
Users,
LucideIcon,
} from "lucide-react";
import { JSX } from "react/jsx-runtime";

interface Feature {
title: string;
icon: LucideIcon;
desc: string;
}

const features: Feature[] = [
{
title: "Slow Travel",
icon: Compass,
desc: "Because the best parts of a journey aren't planned. They're felt slowly and remembered deeply.",
},
{
title: "Rooted In Sustainability",
icon: Leaf,
desc: "Every journey supports local communities while respecting the places we visit.",
},
{
title: "Safety & Support",
icon: ShieldCheck,
desc: "From your first message to your final goodbye, we're always there when you need us.",
},
{
title: "Community Driven",
icon: Users,
desc: "We travel together, share stories together and grow together.",
},
];

export default function WhyTravel(): JSX.Element {
return ( <section className="py-28 bg-cream overflow-hidden"> <div className="max-w-7xl mx-auto px-5">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="text-center mb-20"
    >
      <p className="uppercase tracking-[0.25em] text-rust text-sm mb-4">
        WHY NOMICHI
      </p>

      <h2 className="font-display text-5xl md:text-6xl font-black text-rust">
        Why Travel With Us
      </h2>

      <p className="mt-5 text-ink/70 max-w-2xl mx-auto">
        Travel that stays with you long after you've returned home.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            whileHover={{
              y: -12,
              scale: 1.03,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[32px]
              bg-white
              p-8
              shadow-sm
              border
              border-black/5
              min-h-[320px]
            "
          >

            <div
              className="
                absolute
                -top-20
                -right-20
                h-40
                w-40
                rounded-full
                bg-rust/10
                blur-3xl
                group-hover:bg-rust/20
                transition-all
                duration-700
              "
            />

            <div
              className="
                relative
                h-16
                w-16
                rounded-2xl
                bg-rust
                flex
                items-center
                justify-center
                mb-8
                group-hover:rotate-12
                transition-all
                duration-500
              "
            >
              <Icon
                className="
                  h-8
                  w-8
                  text-white
                  group-hover:scale-110
                  transition
                "
              />
            </div>

            <h3 className="text-2xl font-bold text-ink mb-4">
              {feature.title}
            </h3>

            <p className="text-ink/70 leading-relaxed">
              {feature.desc}
            </p>

            <div
              className="
                absolute
                bottom-0
                left-0
                h-1
                w-0
                bg-rust
                group-hover:w-full
                transition-all
                duration-500
              "
            />

          </motion.div>
        );
      })}

    </div>
  </div>
</section>

);
}
