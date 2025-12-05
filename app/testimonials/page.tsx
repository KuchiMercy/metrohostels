"use client";

import { useState } from "react";
import PageLayout from "@/components/layouts/PageLayout";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

export default function Page() {
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Chinwe A.",
      text: "MetroHostels exceeded my expectations. I found a clean, modern space just five minutes from the venue I needed. The booking process was seamless and the staff were extremely supportive.",
      rating: 5,
    },
    {
      id: 2,
      name: "Oluwakemi O.",
      text: "I travelled with friends and MetroHostels made our stay stress-free. Great location, great pricing, and great comfort.",
      rating: 5,
    },
    {
      id: 3,
      name: "Farouk I.",
      text: "Staying at MetroHostels felt like discovering a hidden gem—affordable comfort right where I needed it. Highly recommended.",
      rating: 5,
    },
    {
      id: 4,
      name: "Sarah K.",
      text: "Affordable, comfortable, and the staff were super helpful. I'm definitely using MetroHostels again.",
      rating: 5,
    },
    {
      id: 5,
      name: "Michael T.",
      text: "I loved how quick it was to find a space near my event. The experience felt premium and stress-free.",
      rating: 5,
    },
    {
      id: 6,
      name: "Ada O.",
      text: "MetroHostels made my trip so easy. The space was clean, close to everything, and exactly as described.",
      rating: 5,
    },
    {
      id: 7,
      name: "Olabukun .O.",
      text: "I was surprised by how seamless everything felt. Clean spaces, great locations, and a booking experience that just works.",
      rating: 5,
    },
  ];

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 fill-current ${
              index < rating ? "text-[#B38E71]" : "text-gray-300"
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };
  const TestimonialCard: React.FC<{
    testimonial: Testimonial;
    index: number;
  }> = ({ testimonial }) => {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm">
        <p className="text-gray-700 text-base mb-6 leading-relaxed">
          {testimonial.text}
        </p>
        <StarRating rating={testimonial.rating} />
        <p className="mt-4 font-semibold text-gray-900 text-sm">
          {testimonial.name}
        </p>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("message", message);
    formData.append("_subject", "Request for Event Advertisement");

    try {
      const response = await fetch("https://formspree.io/f/xpwvraka", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setIsSubmitted(true);
        setMessage("");
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
    <PageLayout>
      <main className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto py-10 px-5">
          <header className="text-center">
            <h2 className="text-4xl md:text-5xl mt-5 mb-3">
              What Our Guests are Saying
            </h2>
            <p className="text-lg">
              See how MetroHostels made their stay easier and more enjoyable.
            </p>
          </header>
          {/* Testimonials */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
        {/* Form */}
        <hr className="text-[#ababab]" />
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-0 p-10 max-w-7xl mx-auto">
          <div className=" mx-auto">
            <h3 className="text-4xl md:text-5xl mb-3">
              Help Others by Sharing Your Experience
            </h3>
            <p>Your feedback helps future guests make better choices.</p>
          </div>
          <div>
            <form
              action=""
              className="flex flex-col gap-4 mt-6"
              onSubmit={handleSubmit}
            >
              <div>
                <textarea
                  className="bg-white w-full p-3 rounded-lg outline-none"
                  rows={7}
                  placeholder="Type Here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={message.trim().length === 0}
                className={`p-3 text-white rounded-full transition 
          ${
            message.trim().length === 0
              ? "bg-[#E1D5CC] cursor-not-allowed"
              : "bg-[#B38E71] cursor-pointer"
          }`}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
              {isSubmitted && (
                <p className="text-green-600 font-medium mt-2">
                  Thank you! Yor feedback has been received.
                </p>
              )}
              {errorMsg && (
                <p className="text-red-500 font-medium mt-1">{errorMsg}</p>
              )}
            </form>
          </div>
        </div>
      </main>
    </PageLayout>
  );
}
