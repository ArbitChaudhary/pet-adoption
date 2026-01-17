import SectionPetDetails from "./_components/section-pet-details";

export default async function PetDetailsPage({
  params,
}: {
  params: { petId: string };
}) {
  const { petId } = await params;
  const pet = await fetch(`${process.env.API_BASE_URL}/pets/${petId}`, {
    cache: "no-cache",
  })
    .then(async (res) => await res.json())
    .catch((error) => {
      return <div>{error}</div>;
    });
  return <SectionPetDetails petId={petId} pet={pet} />;
}
