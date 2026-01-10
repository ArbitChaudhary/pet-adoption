import dog1 from "@/assets/pets/dog-1.jpg";
import dog2 from "@/assets/pets/dog-2.jpg";
import dog3 from "@/assets/pets/dog-3.jpg";
import cat1 from "@/assets/pets/cat-1.jpg";
import cat2 from "@/assets/pets/cat-2.jpg";
import cat3 from "@/assets/pets/cat-3.jpg";
import bird1 from "@/assets/pets/bird-1.jpg";
import bird2 from "@/assets/pets/bird-2.jpg";
import { StaticImageData } from "next/image";

export type PetCategory = "dog" | "cat" | "bird";

export interface Pet {
  id: string;
  name: string;
  category: PetCategory;
  breed: string;
  age: string;
  gender: string;
  image: StaticImageData;
  description: string;
}

export const pets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    category: "dog",
    breed: "Golden Retriever",
    age: "3 years",
    gender: "Male",
    image: dog1,
    description:
      "Buddy is a friendly and loyal companion who loves playing fetch and going on long walks. He's great with kids and other pets.",
  },
  {
    id: "2",
    name: "Whiskers",
    category: "cat",
    breed: "Orange Tabby",
    age: "2 years",
    gender: "Male",
    image: cat1,
    description:
      "Whiskers is a curious and playful cat who loves exploring. He enjoys sunny spots and gentle cuddles.",
  },
  {
    id: "3",
    name: "Sunny",
    category: "bird",
    breed: "Blue & Gold Macaw",
    age: "5 years",
    gender: "Female",
    image: bird1,
    description:
      "Sunny is a beautiful and intelligent macaw who loves to talk and sing. She's very social and enjoys interaction.",
  },
  {
    id: "4",
    name: "Luna",
    category: "dog",
    breed: "Border Collie",
    age: "1 year",
    gender: "Female",
    image: dog2,
    description:
      "Luna is an energetic and smart puppy who loves to learn new tricks. She's perfect for an active family.",
  },
  {
    id: "5",
    name: "Shadow",
    category: "cat",
    breed: "Persian",
    age: "4 years",
    gender: "Female",
    image: cat2,
    description:
      "Shadow is a calm and elegant cat who enjoys peaceful environments. She loves being groomed and pampered.",
  },
  {
    id: "6",
    name: "Charlie",
    category: "dog",
    breed: "Beagle",
    age: "2 years",
    gender: "Male",
    image: dog3,
    description:
      "Charlie is a happy and friendly beagle with a great nose for adventure. He loves treats and belly rubs.",
  },
  {
    id: "7",
    name: "Snowball",
    category: "cat",
    breed: "Ragdoll",
    age: "1 year",
    gender: "Female",
    image: cat3,
    description:
      "Snowball is a gentle and affectionate cat with the most beautiful blue eyes. She loves to be held and cuddled.",
  },
  {
    id: "8",
    name: "Kiwi",
    category: "bird",
    breed: "Budgie",
    age: "1 year",
    gender: "Male",
    image: bird2,
    description:
      "Kiwi is a cheerful little budgie who loves to chirp and play with toys. He's perfect for first-time bird owners.",
  },
];
