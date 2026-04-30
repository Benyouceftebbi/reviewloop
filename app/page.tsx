import Navbar from "./components/Navbar";
import PageBackground from "./components/PageBackground";
import Hero from "./components/sections/Hero";
import LogoStrip from "./components/sections/LogoStrip";
import InsightSentence from "./components/sections/InsightSentence";
import HowReplay from "./components/sections/HowReplay";
import DemoFeed from "./components/sections/DemoFeed";
import ShowcaseMoodboard from "./components/sections/ShowcaseMoodboard";
import UseCasesPipeline from "./components/sections/UseCasesPipeline";
import Compare from "./components/sections/Compare";
import ResultsLog from "./components/sections/ResultsLog";
import Trust from "./components/sections/Trust";
import Pricing from "./components/sections/Pricing";
import FinalCTA from "./components/sections/FinalCTA";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      {/*
        ONE CONTINUOUS CANVAS.
        The whole page sits inside a `relative isolate overflow-hidden`
        wrapper so a single PageBackground can stretch behind every
        section. No section declares its own bg-base anymore — they're
        all transparent and let this painting show through.

        Two intentional exceptions:
         - Trust opts back into --bg-deep (a quieter zone).
         - FinalCTA keeps its own dark canvas because the projector
           cone needs a dark stage to draw on.
      */}
      <main className="relative isolate overflow-hidden">
        <PageBackground />

        <Hero />
        <LogoStrip />
        <InsightSentence />
        <HowReplay />
        <DemoFeed />
        <ShowcaseMoodboard />
        <UseCasesPipeline />
        <Compare />
        <ResultsLog />
        <Trust />
        <Pricing />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
