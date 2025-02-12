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
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;

}
