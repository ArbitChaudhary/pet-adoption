import PetsGrid from "./pets-grid";
import SearchSection from "./search";

interface SectionPetsListProps {
  pets: Array<any>;
}

const SectionPetsList = () => {
  return (
    <>
      <SearchSection />
      <PetsGrid />
    </>
  );
};

export default SectionPetsList;
