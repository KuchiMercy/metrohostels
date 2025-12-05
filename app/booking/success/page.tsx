import PageLayout from "@/components/layouts/PageLayout";
import Image from "next/image";

export default function SuccessPage() {
  return (
    <PageLayout>
      <div className="max-w-xl mx-auto p-10 text-center">
        <div className="flex justify-center mb-4">
          <Image
            src="/assets/success.png"
            alt="successful"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-700">
          Your booking has been received. A confirmation email will be sent
          shortly.
        </p>
      </div>
    </PageLayout>
  );
}
