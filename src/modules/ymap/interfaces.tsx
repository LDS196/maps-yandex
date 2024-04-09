export interface Office {
  id: number;
  cityId: number;
  cityName: string;
  countryId: number;
  countryName: string;
  name: string;
  phone: string[];
  email: string;
  coordinates: number[];
  owner: string;
}

export interface Country {
  id: number;
  name: string;
  coordinates: number[];
}

export interface City {
  id: number;
  name: string;
  countryId: number;
}

export interface Data {
  countries: Country[];
  cities: City[];
  offices: Office[];
}
