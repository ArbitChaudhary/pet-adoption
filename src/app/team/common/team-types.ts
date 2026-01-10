export interface ITeam {
  _id: string;
  name: string;
  description: string;
  post?: string | null;
  profession?: string | null;
  profileImage?: string | null;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}
