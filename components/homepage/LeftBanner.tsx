"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LeftBanner() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;

      const newScale = 1 + Math.min(scrollPos / 800, 0.2);
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="hidden md:block fixed left-0 top-1/3 z-50 origin-center transition-transform duration-300"
      style={{ transform: `scale(${scale})` }}
    >
      <Link href="/events/3">
        <div className="bg-pink-400 text-white h-96 rounded-r-3xl p-4 w-28 flex flex-col gap-20 items-center shadow-lg cursor-pointer">
          <Image
            src="/assets/mistletoe.png"
            alt="decor"
            width={60}
            height={60}
            className="mb-4"
          />

          <div className="flex flex-col items-center rotate-90">
            <p className="text-2xl font-bold whitespace-nowrap">
              Dainty December
            </p>
            <p className="text-sm whitespace-nowrap mt-2">Click To Know More</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
