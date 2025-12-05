import { EventsData } from "@/components/data/EventsData";
import { RoomsData } from "@/components/data/RoomsData";
import PageLayout from "@/components/layouts/PageLayout";
import Image from "next/image";
import Link from "next/link";

interface EventPageParams {
  params: Promise<{ id: string }>;
}

interface IconWithLabel {
  icon: React.ReactNode;
  label: string;
}

export default async function EventPage({ params }: EventPageParams) {
  const { id } = await params;
  const eventId = Number(id);

  const event = EventsData.find((e) => e.id === eventId);

  if (!event) return <p>Event not found</p>;

  const filteredRooms =
    event.location.toLowerCase() === "nationwide"
      ? RoomsData
      : RoomsData.filter(
          (room) =>
            room.proximity.toLowerCase() === event.slug.toLowerCase() ||
            room.proximity.toLowerCase() === "all"
        );

  return (
    <PageLayout>
      <div className="px-4 md:px-10 pb-10">
        {/* ROOMS */}
        <h2 className="text-3xl font-semibold mt-12 mb-6 text-center">
          Rooms Close to {event.title}
        </h2>

        {filteredRooms.length === 0 ? (
          <p className="text-gray-500">No rooms match this location.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredRooms.map((room) => (
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
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
