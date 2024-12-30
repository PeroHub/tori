import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { CulturalHighlights } from "@/components/CulturalHighlights";
import { LocalExperiences } from "@/components/LocalExperiences";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { PopularEvents } from "@/components/PopularEvents";
import { ChatBot } from "@/components/ChatBot";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="space-y-16 sm:space-y-20 md:space-y-24">
        <Highlights />
        <CulturalHighlights />
        <LocalExperiences />
        <FeaturedDestinations />
        <PopularEvents />
      </div>
      <ChatBot />
      <Footer />
    </main>
  );
}
