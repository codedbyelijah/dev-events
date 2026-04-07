"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import Image from "next/image";

interface OAuthButtonProps {
  provider: "google";
  onClick?: () => void;
  loading?: boolean;
  className?: string;
}

const providerIcons = {
  google: (
    <Image
      src="/icons/google.svg"
      alt="Google"
      width={100}
      height={100}
      className="w-5 h-5"
    />
  ),
};

const providerNames = {
  google: "Google",
};

export default function OAuthButton({
  provider,
  onClick,
  loading = false,
  className,
}: OAuthButtonProps) {
  return (
    <Button
      variant="outline"
      size="md"
      onClick={onClick}
      loading={loading}
      leftIcon={providerIcons[provider]}
      className={cn("w-full justify-center", className)}
    >
      Continue with {providerNames[provider]}
    </Button>
  );
}
