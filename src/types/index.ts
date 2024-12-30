export interface Destination {
  _id: string;
  name: string;
  description: string;
  images: string[];
  location: {
    type: string;
    coordinates: number[];
    address: string;
  };
  category: string;
  highlights: string[];
  rating: number;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
  image: string;
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  status: "pending" | "approved" | "rejected";
  createdBy: string;
  subscribers: string[];
}
