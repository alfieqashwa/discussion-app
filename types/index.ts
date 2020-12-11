export type UserProps = {
  id: number;
  email: string;
  name?: string;
  image?: string | null;
};

export type OrgProps = {
  id: number;
  email: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  logo: string;
  users: [UserProps];
};