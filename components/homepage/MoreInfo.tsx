"use client";
import { useState } from "react";

export default function MoreInfo() {
  const [form, setForm] = useState({
    name: "",
    location: "",
    duration: "",
    guests: "",
    requests: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isFormValid =
    form.name.trim().length > 0 &&
    form.location.trim().length > 0 &&
    form.duration.trim().length > 0 &&
    form.guests.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("https://formspree.io/f/xwpgoggq", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setForm({
          name: "",
          location: "",
          duration: "",
          guests: "",
          requests: "",
        });
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
    <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-10 md:gap-0 p-10">
      <div>
        <h3 className="text-4xl md:text-5xl mb-3">
          Didn&apos;t find what you&apos;d like?
        </h3>
        <p>Tell us about it.</p>
      </div>
      <div>
        <form
          action=""
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              className="bg-white w-full  p-3 rounded-full outline-none"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <input
              className="bg-white w-full  p-3 rounded-full outline-none"
              type="text"
              placeholder="Preferred Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div>
            <input
              className="bg-white w-full  p-3 rounded-full outline-none"
              type="text"
              placeholder="Duration"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
          </div>

          <div>
            <input
              className="bg-white w-full  p-3 rounded-full outline-none"
              type="text"
              placeholder="Number of Guests"
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: e.target.value })}
            />
          </div>

          <div>
            <input
              className="bg-white w-full  p-3 rounded-full outline-none"
              type="text"
              placeholder="Special Requests"
              value={form.requests}
              onChange={(e) => setForm({ ...form, requests: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`p-3 rounded-full text-white transition
          ${
            isFormValid
              ? "bg-[#B38E71] cursor-pointer"
              : "bg-[#E1D5CC] cursor-not-allowed"
          }`}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
          {isSubmitted && (
            <p className="text-green-600 font-medium mt-2">
              Thank you! Your form has been submitted.
            </p>
          )}
          {errorMsg && (
            <p className="text-red-500 font-medium mt-1">{errorMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
}
