"use client";
import { useState } from "react";
import Image from "next/image";
import comingSoonImage from "@/public/assets/coming-soon.png";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("_subject", "New Waitlist Signup");

    try {
      const response = await fetch("https://formspree.io/f/xpwvdevv", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setErrorMsg("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0 p-10">
      <div>
        <h3 className="text-4xl md:text-5xl mb-3">
          Exciting Opportunities Coming Soon
        </h3>
        <p>Be the first to enjoy exclusive tools and opportunities.</p>

        {/* Form */}
        <form
          action=""
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              className="bg-white w-full md:w-3/4 p-3 rounded-full outline-none"
              id="email"
              type="email"
              placeholder="Add Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!isValidEmail || isLoading}
            className={`p-3 md:w-3/4 rounded-full text-white transition
          ${isValidEmail ? "bg-[#B38E71]" : "bg-[#E1D5CC] cursor-not-allowed"}`}
          >
            {isLoading ? "Joining..." : "Join Partners Waitlist"}
          </button>

          {isSubmitted && (
            <p className="text-green-600 font-medium mt-2">
              Thank you! You’ve been added to the waitlist.
            </p>
          )}
          {errorMsg && (
            <p className="text-red-500 font-medium mt-1">{errorMsg}</p>
          )}
        </form>
      </div>
      <div>
        <Image src={comingSoonImage} alt="coming-soon" className="rounded-xl" />
      </div>
    </div>
  );
}
