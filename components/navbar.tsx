"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthButton from "./auth-button";
import { Menu, X } from "lucide-react";

// Mobile Menu Component
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="px-4 py-6 space-y-2">
        <Link
          href="/"
          className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-base"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          href="#about"
          className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-base"
          onClick={onClose}
        >
          About
        </Link>
        <Link
          href="#contact"
          className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-base"
          onClick={onClose}
        >
          Contact
        </Link>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header>
      <nav>
        <div className="flex items-center justify-between h-16 w-full px-4 sm:px-6 lg:px-8">
          {/* Mobile: Hamburger on left */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-300 hover:text-white transition-colors p-2"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls={isMobileMenuOpen ? "mobile-menu" : undefined}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo - centered on mobile, left on desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2  md:relative md:left-auto md:transform-none">
            <Link href="/" className="logo flex items-center gap-2">
              <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
              <span className="text-xl font-bold text-white">DevEvent</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
            <AuthButton />
          </div>

          {/* Mobile: AuthButton on right */}
          <div className="md:hidden">
            <AuthButton />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      </nav>
    </header>
  );
}
