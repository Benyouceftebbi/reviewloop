import Navbar from "./components/Navbar";
import HeroBackground from "./components/HeroBackground";
import Hero from "./components/sections/Hero";
import LogoStrip from "./components/sections/LogoStrip";
import Results from "./components/sections/Results";
import InsightRiver from "./components/sections/InsightRiver";
import InsightReceipt from "./components/sections/InsightReceipt";
import InsightSentence from "./components/sections/InsightSentence";
import HowReplay from "./components/sections/HowReplay";
import HowMirror from "./components/sections/HowMirror";
import HowMorph from "./components/sections/HowMorph";
import DemoSlot from "./components/sections/DemoSlot";
import DemoMatrix from "./components/sections/DemoMatrix";
import DemoFeed from "./components/sections/DemoFeed";
import ShowcaseShelf from "./components/sections/ShowcaseShelf";
import ShowcaseCinematic from "./components/sections/ShowcaseCinematic";
import ShowcaseMoodboard from "./components/sections/ShowcaseMoodboard";
import UseCasesSplit from "./components/sections/UseCasesSplit";
import UseCasesStacked from "./components/sections/UseCasesStacked";
import UseCasesPipeline from "./components/sections/UseCasesPipeline";
import Compare from "./components/sections/Compare";
import ResultsLog from "./components/sections/ResultsLog";
import Trust from "./components/sections/Trust";
import PricingPolished from "./components/sections/PricingPolished";
import Pricing from "./components/sections/Pricing";
import PricingAsymmetric from "./components/sections/PricingAsymmetric";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <div className="relative isolate overflow-hidden">
          <HeroBackground />
          <Hero />
          <LogoStrip />

        </div>

        {/* Section 2 — three variants for review */}

        <InsightSentence />

        {/* Section 3 — three variants for review */}
        <HowReplay />


        {/* Section 4 — three variants for review */}

        <DemoFeed />

        {/* Section 5 — three variants for review */}

        <ShowcaseMoodboard />

        {/* Section 6 — three variants for review */}

        <UseCasesPipeline />

        {/* Section 7 — comparison panel */}
        <Compare />

        {/* Section 8 — social proof / results so far (Variant B: The Founder's Log) */}
        <ResultsLog />

        {/* Section 9 — trust + security (Variant A: The Trust Strip) */}
        <Trust />

        {/* Section 10 — pricing, three variants stacked for review */}

        <Pricing />


        {/* Section 12 — final CTA (Variant A: The Mirror Resolution) */}
        <FinalCTA />
      </main>

      {/* Page bookend — design-system-aligned footer */}
      <Footer />
    </>
  );
}
