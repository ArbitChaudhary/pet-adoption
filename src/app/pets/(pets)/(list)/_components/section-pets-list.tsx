import { IPet } from "../../_common/pet-types";
import PetsGrid from "./pets-grid";
import SearchSection from "./search";

interface SectionPetsListProps {
  pets: IPet[];
}

const SectionPetsList = ({ pets }: SectionPetsListProps) => {
  return (
    <>
      <SearchSection />
      <PetsGrid pets={pets} />
    </>
  );
};

export default SectionPetsList;
