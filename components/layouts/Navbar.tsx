"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactUs from "../modal/ContactUs";
import { icons } from "@/public/assets/icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Our Rooms", href: "/rooms" },
    { label: "Events", href: "/events" },
    { label: "Testimonials", href: "/testimonials" },
  ];

  return (
    <nav className="w-full mt-5 px-4 py-4 flex justify-center">
      <div className="bg-white shadow-sm rounded-full px-6 md:px-10 py-3 flex justify-between items-center gap-6 w-full max-w-6xl relative z-50">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-xl"
        >
          <Image
            className="text-2xl"
            src="/assets/metro-black-logo.png"
            alt="metro-logo"
            width={20}
            height={20}
          />
          <span>MetroHostels</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-black/80 font-medium ml-10">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-black hover:font-bold"
            >
              {item.label}
            </Link>
          ))}

          {/* Desktop Contact Button */}
          <button
            className="hidden md:block ml-auto bg-[#B38E71] text-white px-6 py-2 rounded-full font-medium hover:bg-[#cbbdaf] transition"
            onClick={handleOpenModal}
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden ml-auto text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="absolute z-50 top-20 left-0 w-full px-4 mt-5 md:hidden">
          <div className="bg-white shadow-md rounded-2xl px-6 py-6 flex flex-col items-center gap-6 text-black/80 font-medium">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="w-full text-center py-2 hover:text-black"
              >
                {item.label}
              </Link>
            ))}

            <button
              className="bg-[#B38E71] text-white w-full py-3 rounded-full font-semibold"
              onClick={handleOpenModal}
            >
              Contact Us
            </button>
          </div>
        </div>
      )}

      <ContactUs isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="flex flex-col gap-6 text-center">
          <div>
            <p className="font-semibold">Call us:</p>
            <p className="text-xl">+234 815 254 1562</p>
          </div>

          <div>
            <p className="font-semibold">Email us:</p>
            <p className="text-xl">contact@metrohostels.com</p>
          </div>

          <div>
            <p className="font-semibold">Follow us:</p>
            <span className="flex items-center gap-4 mx-auto justify-center mt-2">
              <Link
                href="https://web.facebook.com/metrohostels?rdid=44ipDtK4fhD4DZ35&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1BAyGsngKQ%2F%3Fref%3Dwaios.fb_links_xma_control%26_rdc%3D1%26_rdr#"
                target="_blank"
                rel="noopener noreferrer"
              >
                {icons.facebookBlack}
              </Link>
              <Link
                href="https://x.com/MetroHostels?s=20"
                target="_blank"
                rel="noopener noreferrer"
              >
                {icons.xBlack}
              </Link>
              <Link
                href="https://www.instagram.com/metrohostels?igsh=dGVzM2V2ZWhyajJl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {icons.instaBlack}
              </Link>
            </span>
          </div>
        </div>
      </ContactUs>
    </nav>
  );
}
