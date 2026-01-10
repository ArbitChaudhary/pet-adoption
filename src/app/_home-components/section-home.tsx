import { Newsletter } from "@/components/news-letter/news-letter";
import About from "./about";
import Features from "./features";
import Hero from "./hero";
import Pets from "./pets";

const SectionHome = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <Features />
      <Pets />
      <About />
      <Newsletter />
    </div>
  );
};

export default SectionHome;
