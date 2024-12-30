declare module "@mapbox/mapbox-gl-geocoder";

interface Window {
  Stripe: any;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    CLERK_SECRET_KEY: string;
    MONGODB_URI: string;
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: string;
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: string;
    NEXT_PUBLIC_MAPBOX_TOKEN: string;
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASSWORD: string;
    SMTP_FROM: string;
    OPENAI_API_KEY: string;
    UPSTASH_REDIS_URL: string;
    UPSTASH_REDIS_TOKEN: string;
  }
}
