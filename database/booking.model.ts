import mongoose, { Schema, Document, Model, Types } from "mongoose";
import type { IEvent } from "./event.model";

export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Schema ───────────────────────────────────────────────────────────────────

const bookingSchema = new Schema<IBooking>(
  {
    // Indexed for efficient lookup of all bookings belonging to a given event.
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email address"],
    },
  },
  { timestamps: true }
);

// ─── Pre-save hook ────────────────────────────────────────────────────────────

bookingSchema.pre("save", async function () {
  // Validate that the referenced event exists before persisting the booking.
  // Uses mongoose.model() to look up the already-registered Event model at
  // runtime, avoiding a circular import between the two model files.
  const eventExists = await mongoose
    .model<IEvent>("Event")
    .exists({ _id: this.eventId });

  if (!eventExists) {
    throw new Error(`Event with id "${this.eventId.toString()}" does not exist`);
  }
});

// ─── Model ────────────────────────────────────────────────────────────────────

// Reuse an already-registered model to avoid errors during Next.js hot reloads.
const Booking: Model<IBooking> =
  (mongoose.models.Booking as Model<IBooking>) ??
  mongoose.model<IBooking>("Booking", bookingSchema);

export default Booking;
