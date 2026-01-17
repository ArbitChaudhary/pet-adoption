import { Newsletter } from "@/components/news-letter/news-letter";
import About from "./about";
import Features from "./features";
import Hero from "./hero";
import Pets from "./pets";
import { IPet } from "../(pages)/pets/_common/pet-types";

interface SectionHomeProps {
  pets: IPet[];
}

const SectionHome = ({ pets }: SectionHomeProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <Features />
      <Pets pets={pets} />
      <About />
      <Newsletter />
    </div>
  );
};

export default SectionHome;
