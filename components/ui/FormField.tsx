"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Input from "./Input";

interface FormFieldProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  showPasswordToggle?: boolean;
  error?: string;
  className?: string;
}

export default function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  showPasswordToggle = false,
  error,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        error={error}
        showPasswordToggle={showPasswordToggle}
        className="w-full"
      />
    </div>
  );
}
