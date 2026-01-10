import ceo from "@/assets/team/ceo.jpg";
import md from "@/assets/team/md.jpg";
import vet from "@/assets/team/vet.jpg";
import dentist from "@/assets/team/dentist.jpg";
import caretaker from "@/assets/team/caretaker.jpg";
import { StaticImageData } from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: StaticImageData;
  description: string;
  bio: string;
  socialMedia: {
    twitter?: string;
    linkedin?: string;
    email?: string;
  };
  specialties: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "dr-sarah-johnson",
    name: "Dr. Sarah Johnson",
    title: "CEO & Founder",
    image: ceo,
    description: "Veterinarian with 20+ years of experience in animal welfare",
    bio: "Dr. Sarah Johnson founded PawsHome with a vision to create a world where every pet finds a loving home. With over two decades of experience as a veterinarian and animal welfare advocate, she has dedicated her life to improving the lives of animals. Under her leadership, PawsHome has successfully placed over 10,000 pets in loving homes. Sarah holds a DVM from Cornell University and has received numerous awards for her contributions to animal welfare.",
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "sarah@pawshome.com",
    },
    specialties: [
      "Animal Welfare",
      "Veterinary Medicine",
      "Nonprofit Management",
      "Strategic Leadership",
    ],
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    title: "Managing Director",
    image: md,
    description: "Business strategist passionate about animal rescue",
    bio: "Michael brings over 15 years of business development and operations experience to PawsHome. Before joining the team, he led operations at several successful nonprofit organizations. His expertise in strategic planning and resource management has helped PawsHome expand its reach and impact significantly. Michael is a certified Six Sigma Black Belt and holds an MBA from Stanford University.",
    socialMedia: {
      linkedin: "https://linkedin.com",
      email: "michael@pawshome.com",
    },
    specialties: [
      "Operations Management",
      "Strategic Planning",
      "Fundraising",
      "Team Building",
    ],
  },
  {
    id: "dr-emily-martinez",
    name: "Dr. Emily Martinez",
    title: "Chief Veterinarian",
    image: vet,
    description: "Expert in small animal medicine and surgery",
    bio: "Dr. Emily Martinez oversees all medical operations at PawsHome. She specializes in small animal medicine and surgery, with particular expertise in emergency and critical care. Emily graduated top of her class from UC Davis School of Veterinary Medicine and completed her residency at the ASPCA Animal Hospital. She is passionate about educating pet owners on preventive care and animal wellness.",
    socialMedia: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "emily@pawshome.com",
    },
    specialties: [
      "Small Animal Medicine",
      "Surgery",
      "Emergency Care",
      "Preventive Medicine",
    ],
  },
  {
    id: "dr-james-wilson",
    name: "Dr. James Wilson",
    title: "Veterinary Dentist",
    image: dentist,
    description: "Specialized in pet dental health and oral surgery",
    bio: "Dr. James Wilson is our resident expert in veterinary dentistry. He ensures that all our pets have healthy teeth and gums before adoption. With specialized training in veterinary dental surgery, James has performed over 5,000 dental procedures. He is a diplomate of the American Veterinary Dental College and regularly speaks at veterinary conferences about the importance of pet dental health.",
    socialMedia: {
      linkedin: "https://linkedin.com",
      email: "james@pawshome.com",
    },
    specialties: [
      "Veterinary Dentistry",
      "Oral Surgery",
      "Dental Radiography",
      "Preventive Dental Care",
    ],
  },
  {
    id: "amanda-foster",
    name: "Amanda Foster",
    title: "Head Animal Caretaker",
    image: caretaker,
    description: "Devoted to providing the best care for our furry friends",
    bio: "Amanda leads our team of dedicated animal caretakers who ensure every pet at PawsHome receives love, attention, and the best possible care. With a degree in Animal Science and five years of experience in animal shelters, Amanda has an incredible ability to connect with animals and help them feel safe and loved. She also coordinates our volunteer program and leads adoption events.",
    socialMedia: {
      twitter: "https://twitter.com",
      email: "amanda@pawshome.com",
    },
    specialties: [
      "Animal Behavior",
      "Shelter Management",
      "Volunteer Coordination",
      "Pet Socialization",
    ],
  },
];
