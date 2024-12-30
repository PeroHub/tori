import { Types } from "mongoose";

// MongoDB document interface
export interface DbEvent {
  _id: Types.ObjectId;
  title: string;
  description: string;
  date: Date | string;
  image: string;
  category: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  subscribers: string[];
  organizer: string;
  status: string;
  createdBy: string;
}

// Frontend Event interface
export interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
  image: string;
  category: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  subscribers: string[];
  organizer: string;
  status: string;
  createdBy: string;
}

// Type guard function
export function isDbEvent(event: any): event is DbEvent {
  return (
    event &&
    event._id instanceof Types.ObjectId &&
    typeof event.title === "string" &&
    typeof event.description === "string" &&
    event.date &&
    typeof event.image === "string" &&
    typeof event.category === "string" &&
    event.location &&
    typeof event.location.address === "string" &&
    Array.isArray(event.location.coordinates) &&
    event.location.coordinates.length === 2 &&
    Array.isArray(event.subscribers) &&
    typeof event.organizer === "string" &&
    typeof event.status === "string" &&
    typeof event.createdBy === "string"
  );
}

// Transform function
export function transformToEvent(dbEvent: DbEvent): Event {
  return {
    _id: dbEvent._id.toString(),
    title: dbEvent.title,
    description: dbEvent.description,
    date: new Date(dbEvent.date),
    image: dbEvent.image,
    category: dbEvent.category,
    location: {
      address: dbEvent.location.address,
      coordinates: {
        lat: dbEvent.location.coordinates[0],
        lng: dbEvent.location.coordinates[1],
      },
    },
    subscribers: dbEvent.subscribers,
    organizer: dbEvent.organizer,
    status: dbEvent.status,
    createdBy: dbEvent.createdBy,
  };
}

export interface Destination {
  _id: string;
  name: string;
  description: string;
  images: string[];
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  category: string;
  rating: number;
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
}
