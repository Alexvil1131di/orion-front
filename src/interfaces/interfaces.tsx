

export interface addressesInterface {
  id?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;

}

export interface userInterface {
  id: string;
  email: string;
  name: string;
  lastname: string;
  addresses: addressesInterface[];
}