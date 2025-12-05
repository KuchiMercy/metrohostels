import Image from "next/image";
import Link from "next/link";
import { icons } from "@/public/assets/icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-white py-10 mt-20">
      <div className="flex flex-col items-center text-center gap-2">
        <p className="text-sm md:text-base flex items-center gap-2 justify-center font-semibold">
          <Image
            src="/assets/metro-white-logo.png"
            alt="metro-logo"
            width={20}
            height={20}
          />{" "}
          MetroHostels
        </p>
        <div className="flex flex-col justify-between items-center gap-5 my-7 md:gap-20 md:flex-row ">
          <Link href="/privacy-policy" className="text-sm md:text-base">
            Privacy Policy
          </Link>
          <Link href="/terms-conditions" className="text-sm md:text-base">
            Terms and Conditions
          </Link>
          <Link href="/refund-policy" className="text-sm md:text-base">
            Refund Policy
          </Link>
        </div>
        <div className="flex flex-col justify-between items-center gap-5 md:gap-20 md:flex-row">
          <p>
            <span>Contact us:</span> +234 815 254 1562
          </p>
          <p>
            <span>Email us:</span> contact@metrohostels.com
          </p>
          <p className="flex items-center gap-2">
            <span>Follow us:</span>{" "}
            <span className="flex items-center gap-4">
              <Link
                href="https://web.facebook.com/metrohostels?rdid=44ipDtK4fhD4DZ35&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F1BAyGsngKQ%2F%3Fref%3Dwaios.fb_links_xma_control%26_rdc%3D1%26_rdr#"
                target="_blank"
                rel="noopener noreferrer"
              >
                {icons.facebook}
              </Link>
              <Link
                href="https://x.com/MetroHostels?s=20"
                target="_blank"
                rel="noopener noreferrer"
              >
                {icons.x}
              </Link>
              <Link
                href="https://www.instagram.com/metrohostels?igsh=dGVzM2V2ZWhyajJl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {icons.instagram}
              </Link>
            </span>
          </p>
        </div>
      </div>
      <hr className="text-white h-5 my-10" />
      <p className="text-center text-sm md:text-base">
        &copy; Copyright MetroHostels {year} Powered by The
        Handmaiden of God Concepts
      </p>
    </footer>
  );
}
