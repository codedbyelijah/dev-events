/**
 * Environment configuration with validation
 * This file exports all environment variables with runtime validation
 */

// Database configuration
export const MONGODB_URI = (() => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }
  return uri;
})();

// NextAuth configuration
export const NEXTAUTH_URL = (() => {
  const url = process.env.NEXTAUTH_URL;
  if (!url) {
    throw new Error("NEXTAUTH_URL environment variable is not defined");
  }
  return url;
})();

export const NEXTAUTH_SECRET = (() => {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET environment variable is not defined");
  }
  if (secret.length < 32) {
    throw new Error("NEXTAUTH_SECRET must be at least 32 characters long");
  }
  return secret;
})();

// Google OAuth configuration
export const GOOGLE_CLIENT_ID = (() => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("GOOGLE_CLIENT_ID environment variable is not defined");
  }
  return clientId;
})();

export const GOOGLE_CLIENT_SECRET = (() => {
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("GOOGLE_CLIENT_SECRET environment variable is not defined");
  }
  return clientSecret;
})();

export const CLOUDINARY_URL = (() => {
  const apiKey = process.env.CLOUDINARY_URL;
  if (!apiKey) {
    throw new Error("CLOUDINARY_URL environment variable is not defined");
  }
  return apiKey;
})();

export const BASE_URL = (() => {
  const apiKey = process.env.NEXT_PUBLIC_BASE_URL;
  if (!apiKey) throw new Error("BASE_URL environment variable is not defined");
  return apiKey;
})();

export const POSTHOG_KEY = () => {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (apiKey)
    throw new Error("NEXT_PUBLIC_POSTHOG_KEY environment is no defined");
  return apiKey;
};

export const POSTHOG_HOST = () => {
  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (apiKey)
    throw new Error("NEXT_PUBLIC_POSTHOG_HOST environment is no defined");
  return apiKey;
};
