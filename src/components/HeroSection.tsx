export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 min-h-[90vh] flex items-center">

        <div className="max-w-7xl mx-auto px-5 w-full">

          <div className="max-w-3xl">

            <p className="uppercase tracking-[0.35em] text-sand mb-6">
              Wander • Connect • Belong
            </p>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95]">
              Travel
              <br />
              That Finds You
            </h1>

            <p className="mt-8 text-lg md:text-xl text-white/90 max-w-xl">
              Small groups. Meaningful journeys.
              Places that stay with you long after
              you've returned home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <a
                href="#stories"
                className="bg-rust text-white px-8 py-4 rounded-full font-semibold"
              >
                Explore Trips
              </a>

              <a
                href="#contact"
                className="border border-white text-white px-8 py-4 rounded-full"
              >
                Get In Touch
              </a>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}