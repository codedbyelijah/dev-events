// Single entry point for all database models.
// Import order matters: Event must be registered before Booking,
// because the Booking pre-save hook looks up the Event model at runtime.
export { default as Event } from "./event.model";
export { default as Booking } from "./booking.model";

// Re-export interfaces for use in the rest of the application.
export type { IEvent } from "./event.model";
export type { IBooking } from "./booking.model";
