export type UserProps = {
  id: number;
  email: string;
  name?: string;
  image?: string | null;
  isRegistered?: boolean;
};

export type OrgProps = {
  id: number;
  name: string;
  logo: string;
  email: string;
  phone: string;
  website?: string;
  address?: [AddressProps];
  users?: [UserProps];
};

export type AddressProps = {
  address: string;
  city: string;
  state: string;
  zip: string;
};