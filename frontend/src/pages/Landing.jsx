import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "../components/landing/LoadingScreen";
import Nav from "../components/landing/Nav";
import HeroSection from "../components/landing/HeroSection";
import InsightSection from "../components/landing/InsightSection";
import EducationSection from "../components/landing/EducationSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorksSection from "../components/landing/HowItWorksSection";
import QuoteSection from "../components/landing/QuoteSection";
import TrustSection from "../components/landing/TrustSection";
import FinalCTASection from "../components/landing/FinalCTASection";
import Footer from "../components/landing/Footer";

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-page-bg">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Nav />
            <HeroSection />
            <InsightSection />
            <EducationSection />
            <FeaturesSection />
            <HowItWorksSection />
            <QuoteSection />
            <TrustSection />
            <FinalCTASection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
