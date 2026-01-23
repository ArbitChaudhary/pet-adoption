import { IPet } from "../_common/pet-types";
import SectionPetsList from "./_components/section-pets-list";

async function PetsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { search } = await searchParams;
  const pets = await fetch(
    `${process.env.API_BASE_URL}/pets?search=${search || ""}`,
    {
      cache: "no-store",
    },
  );
  const data = await pets.json();

  return (
    <>
      <SectionPetsList pets={data.pets as IPet[]} />
    </>
  );
}

export default PetsPage;
