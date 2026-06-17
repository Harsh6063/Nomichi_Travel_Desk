"use client";

import Link from "next/link";
import { Calendar, Clock3, MapPin } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const stories = [
  {
    title: "Meghalaya",
    subtitle: "Monsoon Magic",
    image: "/images/stories/meghalaya.jpg",
    days: "6N/7D",
    route: "Guwahati to Guwahati",
    oldPrice: "₹27,999",
    price: "₹22,999",
    href: "/trips/trip_1",
    badge: "Dates Live Shortly",
  },
  {
    title: "Bir",
    subtitle: "Paragliding Paradise",
    image: "/images/stories/bir.jpg",
    days: "2N/3D",
    route: "Delhi to Delhi",
    oldPrice: "₹7,499",
    price: "₹6,999",
    href: "/trips/trip_2",
    badge: "Filling Fast",
  },
  {
    title: "Shoja",
    subtitle: "Silent Pine Forest",
    image: "/images/stories/shoja.jpg",
    days: "2N/3D",
    route: "Delhi to Delhi",
    oldPrice: "₹9,999",
    price: "₹8,499",
    href: "/trips/trip_3",
    badge: "Newly Added",
  },
  {
    title: "Hampi",
    subtitle: "Ancient Wonders",
    image: "/images/stories/hampi.jpg",
    days: "3N/4D",
    route: "Bangalore",
    oldPrice: "₹12,999",
    price: "₹10,999",
    href: "#",
    badge: "Coming Soon",
  },
  {
    title: "Coorg",
    subtitle: "Coffee Trails",
    image: "/images/stories/coorg.jpg",
    days: "2N/3D",
    route: "Bangalore",
    oldPrice: "₹11,999",
    price: "₹8,999",
    href: "#",
    badge: "Coming Soon",
  },
];

export default function StoriesAcrossIndia() {
  return (
    <section id="stories" className="py-24 bg-cream overflow-hidden">

      <div className="max-w-[1800px] mx-auto px-5 ">

        <div className="mb-14">
          <h2 className="font-display text-5xl md:text-6xl font-black text-rust text-center">
            Stories Across India
          </h2>

          <p className="text-ink/60 mt-3 text-center">
            Journeys crafted for connection, adventure and belonging.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1.3,
            },
            1200: {
              slidesPerView: 2.2,
            },
            1600: {
                slidesPerView: 2.4,
  },
          }}
        >
          {stories.map((story) => (
            <SwiperSlide key={story.title}>

              <Link href={story.href}>
                <div
                  className="
                    group
                    bg-white
                    rounded-[34px]
                    overflow-hidden
                    shadow-lg
                    hover:shadow-2xl
                    transition-all
                    duration-500
                    hover:-translate-y-4
                    cursor-pointer
                  "
                >

                  <div className="relative h-[650px] overflow-hidden">

                    <img
                      src={story.image}
                      alt={story.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-all
                        duration-700
                        group-hover:scale-110
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div
                      className="
                        absolute
                        top-4
                        left-4
                        bg-rust
                        text-white
                        text-xs
                        px-3
                        py-1
                        rounded-full
                        font-semibold
                      "
                    >
                      {story.badge}
                    </div>

                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-white
                        text-center
                        px-5
                      "
                    >
                      <h3 className="text-5xl font-black tracking-wide">
                        {story.title}
                      </h3>

                      <p className="italic text-lg mt-2 text-white/90">
                        {story.subtitle}
                      </p>

                      <button
                        className="
                          mt-8
                          bg-rust
                          px-8
                          py-3
                          rounded-full
                          font-bold
                          opacity-0
                          translate-y-6
                          group-hover:opacity-100
                          group-hover:translate-y-0
                          transition-all
                          duration-500
                        "
                      >
                        Explore
                      </button>
                    </div>

                    <div className="absolute bottom-5 left-5 text-white">

                      <div className="flex items-center gap-2 mb-2">
                        <Clock3 size={18} />
                        <span>{story.days}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>{story.route}</span>
                      </div>

                    </div>

                  </div>

                  <div className="p-6">

                    <div className="flex items-center gap-2 text-rust font-semibold">
                      <Calendar size={18} />
                      June, July
                    </div>

                    <div className="mt-4 flex items-center gap-3">

                      <span className="line-through text-ink/40 text-xl">
                        {story.oldPrice}
                      </span>

                      <span className="text-rust font-black text-4xl">
                        {story.price}
                      </span>

                    </div>

                  </div>

                </div>
              </Link>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
}