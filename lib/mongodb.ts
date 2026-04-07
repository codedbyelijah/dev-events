import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local",
  );
}

/**
 * Cached connection shape stored on the global object.
 * `conn` holds the resolved Mongoose instance once connected.
 * `promise` holds the in-flight connection promise to avoid duplicate calls.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Extend the Node.js global type so TypeScript is aware of our cache.
 * Using `var` (not `let`/`const`) is required for global augmentation.
 */
declare global {
  var mongooseCache: MongooseCache | undefined;
}

/**
 * In development, Next.js hot-reloads the module graph on every change,
 * which would create a new connection each time. Caching on `global` ensures
 * the connection (or in-flight promise) survives across hot reloads.
 *
 * In production the module is loaded once, so this simply acts as a singleton.
 */
const cached: MongooseCache = global.mongooseCache ?? {
  conn: null,
  promise: null,
};
global.mongooseCache = cached;

/**
 * Returns a connected Mongoose instance, reusing an existing connection
 * or creating a new one if none exists.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // Return the existing connection immediately if available.
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection attempt is in progress, start one.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      // Disable Mongoose's buffering so operations fail fast when disconnected.
      bufferCommands: false,
    });
  }

  // Await the in-flight promise (shared across concurrent callers).
  cached.conn = await cached.promise;
  return cached.conn;
}

let cachedClient: MongoClient | null = null;
let cachedPromise: Promise<MongoClient> | null = null;

/**
 * Returns a connected MongoClient instance.
 * Uses caching to avoid creating multiple connections in development.
 */
export async function getMongoClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient; // return cached client

  if (!cachedPromise) {
    const client = new MongoClient(MONGODB_URI);
    cachedPromise = client.connect();
  }

  cachedClient = await cachedPromise;
  return cachedClient;
}
