import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full flex justify-center -mt-10 px-4">
      <div className="w-full max-w-7xl bg-gray-100 rounded-3xl overflow-hidden relative">
        {/* Hero Image */}
        <Image
          src="/assets/metroheroimage.png"
          alt="MetroHostels"
          width={1600}
          height={900}
          priority
          className="
            w-full 
            h-[280px] 
            sm:h-[380px] 
            md:h-[500px] 
            lg:h-[650px] 
            object-cover
          "
        />

        {/* Overlay Text */}
        <h1
          className="
            absolute 
            bottom-6 
            left-6 
            sm:bottom-10 
            sm:left-10 
            text-3xl 
            sm:text-4xl 
            md:text-5xl 
            lg:text-6xl 
            font-semibold 
            drop-shadow-lg
          "
        >
          Proximity, Affordability,
          <br />
          Comfort.
        </h1>

        {/* Optional Dark Overlay for visibility */}
        {/* <div className="absolute inset-0 bg-black/20"></div> */}
      </div>
    </section>
  );
}
