import Image from "next/image";
import metroTravellers from "@/public/assets/metro-travelers.png";

export default function Travellers() {
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center my-12 px-5">
      <div>
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Travellers Smart Choice
        </h3>
        <p>
          Our hoteliers&apos; spaces cover the littlest modest spaces and the
          roomy luxurious spaces available; all curated by creative Lodgers, to
          cater to all cadres of affordability. MetroHostels is not just another
          accommodation rentals site. It is designed to suit travellers. Think
          proximity, think MetroHostels.{" "}
        </p>
        <br />
        <p>
          Proximity to transportation, Proximity to a landmark, Proximity to an
          event, Proximity to the airport. MetroHostels is all about finding
          spaces close to destiny! Welcome to your access to comfort. Welcome
          to MetroHostels.
        </p>
      </div>
      <div>
        <Image src={metroTravellers} alt="image" className="rounded-xl" />
      </div>
    </div>
  );
}
