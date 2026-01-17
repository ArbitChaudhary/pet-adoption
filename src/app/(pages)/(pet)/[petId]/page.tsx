import SectionPetDetails from "./_components/section-pet-details";

const getPetDetails = async (id: string) => {
  try {
    const result = await fetch(`${process.env.API_BASE_URL}/pets/${id}`, {
      cache: "no-store",
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

export async function generateMetadata({
  params,
}: {
  params: { petId: string };
}) {
  const { petId } = await params;
  const pet = await getPetDetails(petId);
  return {
    title: pet?.name,
    description: pet?.description,
    icons: {
      icon: pet?.image,
    },
    openGraph: {
      title: pet?.name,
      description: pet?.description,
      url: "https://goodpets.com/pets/" + petId,
      siteName: "Good Pets",

      images: {
        url: pet?.image,
        width: 400,
        height: 400,
      },
      type: "website",
      locale: "en_US",
      twitter: {
        card: "summary_large_image",
        title: pet?.name,
        description: pet?.description,
        images: {
          url: pet?.image,
        },
      },
    },
  };
}

export default async function PetDetailsPage({
  params,
}: {
  params: { petId: string };
}) {
  const { petId } = await params;
  // const pet = await fetch(`${process.env.API_BASE_URL}/pets/${petId}`, {
  //   cache: "no-cache",
  // })
  //   .then(async (res) => await res.json())
  //   .catch((error) => {
  //     return <div>{error}</div>;
  //   });
  const pet = await getPetDetails(petId);
  return <SectionPetDetails petId={petId} pet={pet} />;
}
