export default function CTASection() {
  return (
    <section
      id="contact"
      className="bg-rust py-28 text-white"
    >

      <div className="max-w-4xl mx-auto text-center px-5">

        <h2 className="font-display text-5xl md:text-7xl font-bold">
          Every trip starts with
          a conversation.
        </h2>

        <p className="mt-8 text-xl text-white/90">
          Tell us what you're looking for.
          We'll point you towards the right trip.
        </p>

        <button
          className="
            mt-10
            bg-white
            text-rust
            px-8
            py-4
            rounded-full
            font-semibold
          "
        >
          Start A Conversation
        </button>

      </div>

    </section>
  );
}