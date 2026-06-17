import { SiteHeader, SiteFooter } from "@/components/site-header-footer";

import HeroSection from "@/components/HeroSection";
import WhyTravel from "@/components/WhyTravel";
import StoriesAcrossIndia from "@/components/StoriesAcrossIndia";
import LesserKnownWonders from "@/components/LesserKnownWonders";
import UnfilteredFrames from "@/components/UnfilteredFrames";
import Reviews from "@/components/Reviews";
import CTASection from "@/components/CTASection";


import { TRIPS } from "@/lib/mock-data";
import { TripCard } from "@/components/trip-card";

export default function HomePage() {
  const openTrips = TRIPS.filter(
    (trip) => trip.status === "open"
  );

  return (
    <>
      <SiteHeader />

      <main>

        <HeroSection />

        <WhyTravel />

        <StoriesAcrossIndia />

        <LesserKnownWonders />

        <UnfilteredFrames />

        <Reviews />

        <CTASection />

      </main>

      <SiteFooter />
    </>
  );
}