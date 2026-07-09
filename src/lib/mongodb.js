import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// ADD THIS TEMPORARY DEBUG LINE HERE:
console.log("🔍 SYSTEM LOG: Current MONGODB_URI value is ->", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

/**
 * Global is used here to maintain a cached connection across hot-reloads
 * in development. This prevents connections growing exponentially during editing.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  // If a live connection already exists, return it immediately without opening a new one
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection process isn't already running, start it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("🚀 MongoDB Connected Successfully!");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
