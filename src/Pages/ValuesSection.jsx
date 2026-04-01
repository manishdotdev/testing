import React from "react";
import {motion } from "framer-motion"
const values = [
  {
    number: "01",
    title: "Business-First Strategy",
    description:
      "We don’t just build features — we design systems that directly impact revenue, efficiency, and growth.",
    points: [
      "Aligned with business KPIs",
      "Scalable architecture",
      "Long-term thinking",
    ],
  },
  {
    number: "02",
    title: "End-to-End Execution",
    description:
      "From idea to launch — we handle everything with precision, speed, and engineering excellence.",
    points: [
      "Strategy → Design → Development",
      "Fast delivery cycles",
      "Clean & maintainable code",
    ],
  },
  {
    number: "03",
    title: "Custom-Built Systems",
    description:
      "No templates, no shortcuts — every solution is crafted specifically for your workflows and users.",
    points: [
      "Fully tailored solutions",
      "Optimized performance",
      "Future-ready systems",
    ],
  },
];

export default function ValuesPremium() {
  return (
    <section className="relative bg-[#f7f6f4] py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
       <motion.div
  initial="hidden"
  animate="show"
  variants={{
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15 },
    },
  }}
  className="mb-20 max-w-2xl"
>
  {/* Eyebrow */}
  <motion.span
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    }}
    className="block text-xs font-mono tracking-[0.35em] text-black/40 mb-6"
  >
    
  </motion.span>

  {/* Heading */}
  <div className="overflow-hidden">
    <motion.h2
      className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {["Built", "for", "Impact"].map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 80, filter: "blur(10px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: "easeOut" },
            },
          }}
          className={`inline-block mr-3 ${
            word === "Impact"
              ? "bg-gradient-to-r from-black via-black/70 to-black/40 bg-clip-text text-transparent"
              : "text-[#1a120a]"
          }`}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  </div>

  {/* Description */}
  <motion.p
    variants={{
      hidden: { opacity: 0, y: 30 },
      show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
    }}
    className="mt-8 text-black/50 leading-relaxed text-lg"
    style={{ fontFamily: "'DM Sans', sans-serif" }}
  >
    We combine strategy, design, and engineering to create systems that
    actually move your business forward — not just look good.
  </motion.p>

  {/* Animated underline glow */}
  <motion.div
    initial={{ width: 0, opacity: 0 }}
    animate={{ width: "120px", opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    className="h-[2px] mt-8 bg-gradient-to-r from-black/80 to-transparent"
  />
</motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {values.map((item) => (
            <div
              key={item.number}
              className="group relative rounded-[28px] p-[1px] bg-gradient-to-b from-white to-black/5"
            >
              {/* Card */}
              <div className="relative h-full rounded-[28px] bg-white/80 backdrop-blur-xl border border-black/10 p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(0,0,0,0.08)]">

                {/* Soft glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-200/40 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition" />

                {/* Number */}
                <span className="text-4xl font-mono text-black/10 group-hover:text-black/30 transition">
                  {item.number}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-semibold text-[#1a120a] mt-6 mb-4">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-black/60 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Points */}
                <ul className="space-y-3">
                  {item.points.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-black/70"
                    >
                      <span className="w-1.5 h-1.5 bg-black rounded-full" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-black/20 transition-all duration-500 group-hover:w-1/2" />
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Background light */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/30 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 blur-[120px]" />
    </section>
  );
}