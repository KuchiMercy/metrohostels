import ComingSoon from "@/components/homepage/ComingSoon";
import HeroSection from "@/components/homepage/HeroSection";
import LeftBanner from "@/components/homepage/LeftBanner";
import MoreInfo from "@/components/homepage/MoreInfo";
import Travellers from "@/components/homepage/Travellers";
import PageLayout from "@/components/layouts/PageLayout";
import Rooms from "@/components/Rooms";

export default function Home() {
  return (
    <div className="bg-[#F5F5F5]">
      <PageLayout>
        <LeftBanner />
        <HeroSection />
        <div className="max-w-6xl mx-auto">
          <Travellers />
          <Rooms />
          <hr className="my-5 text-[#ababab]" />
          <MoreInfo />
          <hr className="my-5 text-[#ababab]" />
          <ComingSoon />
        </div>
      </PageLayout>
    </div>
  );
}
