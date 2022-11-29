export type CreateContactDTO = {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  clientId: string;
};

export type updateContactDTO = {
  id?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  clientId?: string;
};
