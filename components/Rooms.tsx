import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RoomsData } from "./data/RoomsData";

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
  price: string;
  location: string;
  proximity: string;
}

export default function Rooms() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 my-20 px-5">
      {RoomsData.map((room: RoomData) => (
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
              className="object-cover "
            />
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col gap-2">
            <h2 className="font-semibold text-lg">{room.roomName}</h2>

            <p className="text-sm text-gray-600">{room.description}</p>

            {/* Icons row */}
            <div className="flex items-center gap-1 text-gray-500 text-xl mt-2">
              {room.icons.map((item: IconWithLabel, index: number) => (
                <span
                  key={index}
                  className="hover:text-black transition-colors duration-200"
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
      ))}
    </div>
  );
}
