import { Newsletter } from "@/components/news-letter/news-letter";
import About from "./about";
import Features from "./features";
import Hero from "./hero";
import Pets from "./pets";
import { IPet } from "../pets/(pets)/_common/pet-types";

interface SectionHomeProps {
  pets: IPet[];
}

const SectionHome = ({ pets }: SectionHomeProps) => {
  return (
    <>
      <Hero />
      <Features />
      <Pets pets={pets} />
      <About />
      <Newsletter />
    </>
  );
};

export default SectionHome;
