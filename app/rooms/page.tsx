"use client";

import { useState } from "react";
import PageLayout from "@/components/layouts/PageLayout";
import MoreInfo from "@/components/homepage/MoreInfo";
import { RoomsData } from "@/components/data/RoomsData";
import Image from "next/image";
import Link from "next/link";
import { icons } from "@/public/assets/icons";

interface IconWithLabel {
  icon: React.ReactNode;
  label: string;
}

interface RoomData {
  id: number;
  image: string;
  roomName: string;
  description: string;
  icons: IconWithLabel[];
  price: number;
  location: string;
  proximity: string;
}

export default function OurRoomsPage() {
  const [activeLocation, setActiveLocation] = useState("All Locations");

  const locations = [
    "All Locations",
    ...Array.from(
      new Set(RoomsData.map((room: RoomData) => room.location))
    ).filter((loc) => loc && loc.trim() !== ""),
  ];

  const filteredRooms =
    activeLocation === "All Locations"
      ? RoomsData
      : RoomsData.filter((room) => room.location === activeLocation);

  return (
    <PageLayout>
      <main className="bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <header className="p-10 text-center">
            <h2 className="text-4xl md:text-5xl mb-3">
              Where Do You Want To Stay?
            </h2>
            <p className="text-lg">Find Spaces Near You</p>
          </header>

          {/* LOCATION FILTER BAR */}
          <div className="flex items-center gap-3 flex-wrap px-6 mb-8">
            <span className="flex items-center gap-2 text-sm bg-white rounded-full p-2 text-gray-700">
              <span className="material-icons text-gray-500">
                {icons.filter}
              </span>
              Filter by location:
            </span>

            {locations.map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  activeLocation === loc
                    ? "bg-[#B38E71] text-white border-[#B38E71]"
                    : "bg-gray-200 text-gray-700 border-gray-300"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          <h2 className="text-center text-2xl font-semibold mb-6">
            {activeLocation === "All Locations"
              ? "All Locations"
              : `Available Rooms in ${activeLocation}`}
          </h2>
          <hr className="text-[#ababab]" />

          {/* ROOMS */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 my-10 max-w-6xl mx-auto">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room: RoomData) => (
                <div
                  key={room.id}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  {/* Image */}
                  <div className="w-full h-52 relative">
                    <Image
                      src={room.image}
                      alt={room.roomName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2">
                    <h2 className="font-semibold text-lg">{room.roomName}</h2>
                    <p className="text-sm text-gray-600">{room.description}</p>

                    {/* Icons only */}
                    <div className="flex flex-wrap gap-1 mt-2 text-gray-500">
                      {room.icons.map((item: IconWithLabel, index: number) => (
                        <span
                          key={index}
                          className="text-xl hover:text-black transition-colors duration-200"
                        >
                          {item.icon}
                        </span>
                      ))}
                    </div>

                    {/* Price + Button */}
                    <div className="flex justify-between items-center mt-4">
                      <p className="font-bold text-xl">
                        ₦{room.price}{" "}
                        <span className="text-sm font-normal text-gray-600">
                          Per Night
                        </span>
                      </p>
                      <Link href={`/rooms/${room.id}`}>
                        <button className="bg-[#B38E71] text-white px-4 py-2 rounded-full text-sm">
                          Reserve Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No rooms available in this location.
              </p>
            )}
          </div>

          <hr className="my-10 text-[#ababab]" />
          <MoreInfo />
        </div>
      </main>
    </PageLayout>
  );
}
