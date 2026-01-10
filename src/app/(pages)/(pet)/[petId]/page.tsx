import SectionPetDetails from "./_components/section-pet-details";

export default async function PetDetailsPage({
  params,
}: {
  params: { petId: string };
}) {
  const { petId } = await params;
  return <SectionPetDetails petId={petId} />;
}
