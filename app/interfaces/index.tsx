export interface BMSuggestion {
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  uid?: string;
  province: string;
  city: string;
  district: string;
  business?: string;
  cityid?: number;
  tag?: string;
  address: string;
  children?: any[];
  adcode?: number;

  // Nearby location field
  distance?: number;
}
