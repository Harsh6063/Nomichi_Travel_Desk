"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import { MapPin } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const wonders = [
  {
    title: "Sarmoli",
    state: "Uttarakhand",
    desc: "The enchanting Himalayan haven",
    image: "/images/wonders/sarmoli.jpg",
  },
  {
    title: "Reiek",
    state: "Mizoram",
    desc: "Home of majestic misty mountains",
    image: "/images/wonders/reiek.jpg",
  },
  {
    title: "Madla",
    state: "Madhya Pradesh",
    desc: "A gateway to nature's abode",
    image: "/images/wonders/madla.jpg",
  },
  {
    title: "Kanthalloor",
    state: "Kerala",
    desc: "The Kashmir of Kerala",
    image: "/images/wonders/kanthalloor.jpg",
  },
  {
    title: "Shoja",
    state: "Himachal Pradesh",
    desc: "Hidden pine forests and slow living",
    image: "/images/wonders/shoja.jpg",
  },
];

export default function LesserKnownWonders() {
  return (
    <section id="wonders" className="relative py-28 overflow-hidden">

      <div id="wonder-bg-title" className="wonder-bg-title">
        LESSER KNOWN WONDERS
      </div>

      <div className="relative z-10">

        <div className="text-center mb-14">

          <p className="uppercase tracking-[0.25em] text-rust text-sm">
            Uncover India's
          </p>

          <h2 className="font-display text-5xl md:text-7xl font-black text-rust">
            Lesser Known Wonders
          </h2>

        </div>

        <div className="max-w-[1700px] mx-auto px-5">

          <Swiper
            modules={[
              Navigation,
              Autoplay,
              EffectCoverflow,
            ]}
            navigation
            centeredSlides
            loop
            speed={1200}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 250,
              modifier: 2,
              scale: 0.85,
            }}
            breakpoints={{
  320: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 1.1,
  },
  1200: {
    slidesPerView: 1.35,
  },
  1400: {
    slidesPerView: 1.45,
  },
}}
          >
            {wonders.map((wonder) => (
              <SwiperSlide key={wonder.title}>

                <div className="wonder-card">

                  <img
                    src={wonder.image}
                    alt={wonder.title}
                    className="wonder-image"
                  />

                  <div className="wonder-overlay" />

                  <div className="wonder-content">

                    <div>
                      <h3 className="wonder-title">
                        {wonder.title}
                      </h3>

                      <p className="wonder-desc">
                        {wonder.desc}
                      </p>
                    </div>

                    <div className="wonder-location">
                      <MapPin
                        size={18}
                        className="text-red-500"
                      />
                      {wonder.state}
                    </div>

                  </div>

                </div>

              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-12">

            <button className="wonder-btn">
              Discover More
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}