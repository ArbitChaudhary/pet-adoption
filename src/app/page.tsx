import { IPet } from "./pets/(pets)/_common/pet-types";
import SectionHome from "./_home-components/section-home";

export default async function Home() {
  const pets = await fetch(`${process.env.API_BASE_URL}/pets`, {
    cache: "no-cache",
  })
    .then(async (res) => await res.json())
    .catch((error) => {
      return <div className="text-red-600 text-base">{error}</div>;
    });
  return <SectionHome pets={pets.pets as IPet[]} />;
}
