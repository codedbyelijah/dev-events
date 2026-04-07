import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";

// TypeScript interface for User document
export interface IUser extends Document {
  name: string;
  email: string;
  organization?: string;
  password?: string;
  image?: string;
  emailVerified?: Date;
  provider: "credentials" | "google";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email: string) {
          // RFC 5322 compliant email validation regex
          const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
          return emailRegex.test(email);
        },
        message: "Please provide a valid email address",
      },
    },
    organization: {
      type: String,
      trim: true,
      maxlength: [100, "Organization cannot exceed 100 characters"],
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return this.provider === "credentials";
      },
      minlength: [8, "Password must be at least 8 characters long"],
    },
    image: {
      type: String,
      trim: true,
    },
    emailVerified: {
      type: Date,
    },
    provider: {
      type: String,
      required: [true, "Provider is required"],
      enum: {
        values: ["credentials", "google"],
        message: "Provider must be either credentials or google",
      },
    },
  },
  {
    timestamps: true, // Auto-generate createdAt and updatedAt
  },
);

// Pre-save hook for username normalization and password hashing
UserSchema.pre("save", async function () {
  const user = this as IUser;

  // Hash password if it's modified and the user is using credentials
  if (
    user.isModified("password") &&
    user.password &&
    user.provider === "credentials"
  ) {
    const saltRounds = 12;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

// Create indexes for better performance
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ provider: 1 });

// Method to compare passwords for credentials authentication
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || model<IUser>("User", UserSchema);

export default User;
