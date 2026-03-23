import mongoose, { Schema, Document, Model } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Converts a title into a URL-friendly slug: "Hello World!" → "hello-world" */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")  // strip special characters
    .replace(/[\s_]+/g, "-")   // spaces and underscores → hyphen
    .replace(/^-+|-+$/g, "");  // trim leading/trailing hyphens
}

/**
 * Normalises a time string to 24-hour "HH:MM".
 * Accepts "9:30 AM", "09:30 PM", "14:30", etc.
 * Returns null when the format cannot be recognised.
 */
function normalizeTime(time: string): string | null {
  // 12-hour: "9:30 AM" / "09:30 PM"
  const match12 = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (match12) {
    let hours = parseInt(match12[1], 10);
    const minutes = match12[2];
    const meridiem = match12[3].toUpperCase();
    if (meridiem === "AM" && hours === 12) hours = 0;
    if (meridiem === "PM" && hours !== 12) hours += 12;
    return `${String(hours).padStart(2, "0")}:${minutes}`;
  }

  // 24-hour: "14:30" / "09:05"
  const match24 = time.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (match24) {
    const hours = parseInt(match24[1], 10);
    const minutes = parseInt(match24[2], 10);
    if (hours > 23 || minutes > 59) return null;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  return null;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const eventSchema = new Schema<IEvent>(
  {
    title:       { type: String, required: true, trim: true },
    // Slug is derived automatically in the pre-save hook; unique index enforced below.
    slug:        { type: String, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    overview:    { type: String, required: true, trim: true },
    image:       { type: String, required: true, trim: true },
    venue:       { type: String, required: true, trim: true },
    location:    { type: String, required: true, trim: true },
    date:        { type: String, required: true, trim: true },
    time:        { type: String, required: true, trim: true },
    mode:        { type: String, required: true, trim: true },
    audience:    { type: String, required: true, trim: true },
    agenda:      { type: [String], required: true },
    organizer:   { type: String, required: true, trim: true },
    tags:        { type: [String], required: true },
  },
  { timestamps: true }
);

// ─── Pre-save hook ────────────────────────────────────────────────────────────

eventSchema.pre("save", function (next) {
  // Regenerate slug only when the title is new or has been modified.
  if (this.isModified("title")) {
    this.slug = generateSlug(this.title);
  }

  // Normalise date to ISO calendar format (YYYY-MM-DD).
  if (this.isModified("date")) {
    const parsed = new Date(this.date);
    if (isNaN(parsed.getTime())) {
      return next(new Error(`Invalid date value: "${this.date}"`));
    }
    this.date = parsed.toISOString().split("T")[0];
  }

  // Normalise time to 24-hour HH:MM.
  if (this.isModified("time")) {
    const normalised = normalizeTime(this.time);
    if (!normalised) {
      return next(new Error(`Invalid time format: "${this.time}"`));
    }
    this.time = normalised;
  }

  next();
});

// ─── Model ────────────────────────────────────────────────────────────────────

// Reuse an already-registered model to avoid errors during Next.js hot reloads.
const Event: Model<IEvent> =
  (mongoose.models.Event as Model<IEvent>) ??
  mongoose.model<IEvent>("Event", eventSchema);

export default Event;
