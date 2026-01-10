import CoreValues from "./core-values";
import CTA from "./cta";
import Hero from "./hero";
import MissionVision from "./mission-vision";
import Stats from "./stats";
import Story from "./story";

const SectionAbout = () => {
  return (
    <>
      <Hero />
      <Story />
      <MissionVision />
      <CoreValues />
      <Stats />
      <CTA />
    </>
  );
};

export default SectionAbout;
