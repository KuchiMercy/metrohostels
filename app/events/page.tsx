"use client";

import { useState } from "react";
import Image from "next/image";
import PageLayout from "@/components/layouts/PageLayout";
import { EventsData } from "@/components/data/EventsData";
import Link from "next/link";

export default function Page() {
  const [form, setForm] = useState({
    eventName: "",
    location: "",
    details: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isFormValid = Object.values(form).every(
    (value) => value.trim().length > 0
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("https://formspree.io/f/xldqnroa", {
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
          eventName: "",
          location: "",
          details: "",
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
    <PageLayout>
      <main className="bg-[#F5F5F5] ">
        <div className="max-w-7xl mx-auto">
          {" "}
          <header className=" p-10 text-center">
            <h2 className="text-4xl md:text-5xl mb-3">
              Explore Events & Retreats
            </h2>
            <p className="text-lg">
              Discover exciting experiences near your next stay.{" "}
            </p>
          </header>
          {/* Events */}
          <div className="flex flex-col gap-10 max-w-5xl mx-auto mt-5 mb-20 px-5">
            {EventsData.map((event) => (
              <div
                key={event.id}
                className="flex flex-col lg:flex-row items-center gap-6 bg-white rounded-2xl shadow-md overflow-hidden"
              >
                {/* Event Image */}
                <div className="relative w-full lg:w-2/5 h-80 ml-5 ">
                  <Image
                    src={event.image || "/placeholder-event.jpg"}
                    alt={event.title}
                    fill
                    className="object-cover rounded-2xl "
                  />
                </div>

                {/* Event Text */}
                <div className="flex-1 p-6 flex flex-col gap-4">
                  <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-500 mb-3">
                    <span className="font-medium">Location:</span>{" "}
                    {event.location}
                  </p>
                  <p className="text-gray-600">{event.description}</p>

                  {/* Reserve Button */}
                  <div className="mt-4">
                    <Link href={`/events/${event.id}`}>
                      <button className="bg-[#B38E71] text-white px-5 py-2 w-full rounded-full text-sm hover:bg-[#a0765b] transition">
                        Reserve Space for Event
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr className="my-5 text-[#ababab]" />
          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-10 md:gap-0 p-10">
            <div>
              <h3 className="text-4xl md:text-5xl mb-3">
                Have an Event You want us to Advertise?
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
                    placeholder="Event Name"
                    value={form.eventName}
                    onChange={(e) =>
                      setForm({ ...form, eventName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    className="bg-white w-full  p-3 rounded-full outline-none"
                    type="text"
                    placeholder="Location"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                </div>
                <div>
                  <textarea
                    className="bg-white w-full  p-3 rounded-2xl outline-none"
                    rows={4}
                    placeholder="Details"
                    value={form.details}
                    onChange={(e) =>
                      setForm({ ...form, details: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className={`p-3 rounded-full text-white transition
          ${isFormValid ? "bg-[#B38E71]" : "bg-[#E1D5CC]  cursor-not-allowed"}`}
                >
                  {isLoading ? "Submitting..." : "Submit"}
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
        </div>
      </main>
    </PageLayout>
  );
}
