"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MarketingPanelProps {
  className?: string;
}

export default function MarketingPanel({ className }: MarketingPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-black/30 backdrop-blur-3xl p-8 lg:p-12 text-white h-full flex flex-col justify-center",
        className,
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
            Discover and Join Developer Events Near You
          </h2>

          <p className="text-lg mb-8 text-teal-100 leading-relaxed">
            Explore hackathons, meetups, workshops, and tech conferences.
            Connect, learn, and grow with the developer community.
          </p>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
            <blockquote className="text-lg mb-4 italic text-teal-50">
              &quot;This platform helped me find amazing hackathons and connect
              with other developers.&quot;
            </blockquote>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-linear-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                AJ
              </div>
              <div>
                <div className="font-semibold">Alex Johnson</div>
                <div className="text-sm text-teal-200">Frontend Developer</div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center">
            <div className="text-sm font-medium text-teal-200 mb-4">
              Join 1K+ Developers
            </div>
            <div className="flex justify-center items-center space-x-6">
              {/* GitHub */}
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Image
                  src="/icons/github.svg"
                  alt="GitHub"
                  width={100}
                  height={100}
                  className="w-5 h-5"
                />
              </div>
              {/* Discord */}
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Image
                  src="/icons/discord.svg"
                  alt="Discord"
                  width={100}
                  height={100}
                  className="w-5 h-5"
                />
              </div>
              {/* Slack */}
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Image
                  src="/icons/slack.svg"
                  alt="Slack"
                  width={100}
                  height={100}
                  className="w-5 h-5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
