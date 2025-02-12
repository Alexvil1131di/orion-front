export interface createUrlInterface {
  userId?: string;
  longUrl: string;
}

export interface UrlInterface {
  id: string;
  userId: string;
  longUrl: string;
  key: string;
}

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