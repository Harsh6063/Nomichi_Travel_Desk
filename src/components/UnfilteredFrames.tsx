"use client";

const row1 = [
  "/images/frames/1.jpg",
  "/images/frames/2.jpg",
  "/images/frames/3.jpg",
  "/images/frames/4.jpg",
];

const row2 = [
  "/images/frames/5.jpg",
  "/images/frames/6.jpg",
  "/images/frames/7.jpg",
  "/images/frames/8.jpg",
];

export default function UnfilteredFrames() {
  return (
    <section className="py-28 overflow-hidden bg-white">

      <div className="text-center mb-16">

        <p className="uppercase tracking-[0.25em] text-rust text-sm">
          RAW • REAL • MOMENTS
        </p>

        <h2 className="font-display text-5xl md:text-6xl font-black text-rust mt-3">
          Unfiltered Frames
        </h2>

      </div>

      {/* Row 1 */}

      <div className="relative overflow-hidden mb-6">

        <div className="frames-scroll-left">

          {[...row1, ...row1].map((image, index) => (
            <div
              key={index}
              className="frame-card"
            >
              <img
                src={image}
                alt=""
                className="frame-image"
              />
            </div>
          ))}

        </div>

      </div>

      {/* Row 2 */}

      <div className="relative overflow-hidden">

        <div className="frames-scroll-right">

          {[...row2, ...row2].map((image, index) => (
            <div
              key={index}
              className="frame-card"
            >
              <img
                src={image}
                alt=""
                className="frame-image"
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}