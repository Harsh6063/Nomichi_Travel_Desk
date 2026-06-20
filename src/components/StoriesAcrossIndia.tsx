"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Clock3, MapPin } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Trip {
id: string;
name: string;
destination: string;
image: string;
duration: string;
journeyType: string;
priceGST: number;
startDate: string;
}

export default function StoriesAcrossIndia() {
const [trips, setTrips] = useState<Trip[]>([]);

useEffect(() => {
fetch("/api/trips/featured")
.then((res) => res.json())
.then(setTrips);
}, []);

return ( <section
   id="stories"
   className="py-24 bg-cream overflow-hidden"
 > <div className="max-w-[1800px] mx-auto px-5">

    <div className="text-center mb-14">

      <h2 className="font-display text-5xl md:text-6xl font-black text-rust">
        Stories Across India
      </h2>

      <p className="text-ink/60 mt-3">
        Journeys crafted for connection,
        adventure and belonging.
      </p>

    </div>

    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{
        delay: 4000,
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
      {trips.map((trip) => (
        <SwiperSlide key={trip.id}>

          <Link
  href={`/trips/${trip.id}`}
  scroll={true}
>

            <div
              className="
                group
                bg-white
                rounded-[34px]
                overflow-hidden
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-4
                transition-all
                duration-500
              "
            >

              <div className="relative h-[650px]">

                <img
                  src={trip.image}
                  alt={trip.name}
                  className="
                    h-full
                    w-full
                    object-cover
                    group-hover:scale-110
                    transition
                    duration-700
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">

                  <h3 className="text-5xl font-black">
                    {trip.destination}
                  </h3>

                  <p className="italic mt-2 text-lg">
                    {trip.journeyType}
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
                      translate-y-5
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      transition-all
                    "
                  >
                    Explore
                  </button>

                </div>

                <div className="absolute bottom-5 left-5 text-white">

                  <div className="flex items-center gap-2">
                    <Clock3 size={18} />
                    <span>{trip.duration}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <MapPin size={18} />
                    <span>{trip.destination}</span>
                  </div>

                </div>

              </div>

              <div className="p-6">

                <div className="flex items-center gap-2 text-rust">

                  <Calendar size={18} />

                  <span>
                    {new Date(
                      trip.startDate
                    ).toLocaleDateString("en-IN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>

                </div>

                <h4 className="text-2xl font-bold mt-3">
                  {trip.name}
                </h4>

                <p className="text-rust text-4xl font-black mt-4">
                  ₹{trip.priceGST.toLocaleString()}
                </p>

              </div>

            </div>

          </Link>

        </SwiperSlide>
      ))}
    </Swiper>

    <div className="text-center mt-14">

      <Link
        href="/discover"
        className="
          inline-flex
          px-8
          py-4
          bg-rust
          text-white
          rounded-full
          font-bold
          hover:scale-105
          transition
        "
      >
        Discover More Journeys
      </Link>

    </div>

  </div>
</section>


);
}
