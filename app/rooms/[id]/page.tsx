import { RoomsData } from "@/components/data/RoomsData";
import PageLayout from "@/components/layouts/PageLayout";

import BookingSection from "./BookingSection";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const roomData = RoomsData.find((item) => item.id === Number(id));
  const room = roomData
    ? {
        ...roomData,
        price: String(roomData.price),
        roomName: roomData.roomName || "Unknown Room",
        description: roomData.description || "No description available",
        image: roomData.image || "/placeholder-room.jpg",
      }
    : null;

  if (!room) return <div>Room not found</div>;

  return (
    <PageLayout>
      <BookingSection room={room} />
    </PageLayout>
  );
}
