"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import OAuthButton from "@/components/ui/OAuthButton";
import MarketingPanel from "@/components/ui/MarketingPanel";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SignupFormData {
  name: string;
  email: string;
  organization: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch("password");

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          organization: data.organization,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Signup error:", result.message);
        // Handle error (show toast or error message)
        return;
      }

      // Redirect to login page after successful signup
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleGoogleSignup = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-11  mx-auto overflow-hidden rounded-3xl">
      {/* Left Section - Form */}
      <div className="lg:col-span-5 bg-white backdrop-blur-3xl p-6 lg:p-10 xl:p-12 overflow-y-auto">
        {/* Logo */}
        <div className="mb-5">
          <Link href="/" className="logo flex gap-2">
            <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
            <span className="text-xl font-bold text-gray-900">DevEvent</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="max-w-md mx-auto w-full">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Create an Account
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Join the developer community and start exploring events.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                error={errors.name?.message}
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
              />
            </div>

            {/* Organization Field */}
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Organization
              </label>
              <Input
                id="organization"
                type="text"
                placeholder="Enter your organization (optional)"
                {...register("organization")}
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                showPasswordToggle={true}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={errors.password?.message}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                showPasswordToggle={true}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                error={errors.confirmPassword?.message}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isSubmitting}
              className="w-full"
            >
              Sign Up
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <OAuthButton
                provider="google"
                onClick={handleGoogleSignup}
                loading={isSubmitting}
              />
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-teal-600 hover:text-teal-700 font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Marketing Panel */}
      <div className="lg:col-span-6">
        <MarketingPanel />
      </div>
    </div>
  );
}
