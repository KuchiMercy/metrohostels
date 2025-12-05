import PageLayout from "@/components/layouts/PageLayout";

export default function page() {
  return (
    <PageLayout>
      {" "}
      <div className="max-w-7xl mx-auto p-10">
        <h2 className="text-3xl md:text-5xl mb-5">Terms & Conditions:</h2>
        <ol className="list-decimal mt-5 ml-5 space-y-3 text-lg">
          <li>Introduction</li>
          <p>
            MetroHostels is an intermediary between hotels and guests. By using
            our website, you acknowledge that you’ve read, understood, and
            agreed to these terms.
          </p>
          <li>
            Booking Terms{" "}
            <ul className="list-disc mt-2 ml-5 space-y-2">
              <li>Bookings are subject to availability of spaces.</li>
              <li>
                Lodgers (Spaces and Hotel) policies, including cancellation and
                payment terms, apply.
              </li>
            </ul>
          </li>
          <li>
            Liability{" "}
            <ul className="list-disc mt-2 ml-5 space-y-2">
              <li>
                MetroHostels is not liable for any damages, losses, or issues
                arising from Lodgers’ accommodations or services.
              </li>
              <li>
                Travellers and Renters are responsible for ensuring their
                booking details are accurate.
              </li>
            </ul>
          </li>
          <li>
            Payment{" "}
            <ul className="list-disc mt-2 ml-5 space-y-2">
              <li>Payment terms are outlined during booking.</li>
              <li>
                MetroHostels is not responsible for payment disputes but will
                weigh in to ensure disputes are sorted amicably.
              </li>
            </ul>
          </li>
          <li>
            Changes and Cancellations{" "}
            <ul className="list-disc mt-2 ml-5 space-y-2">
              <li>
                Lodgers’ policies apply; MetroHostels is not liable for changes
                or cancellations done by Lodgers.
              </li>
            </ul>
          </li>
          <li>Accuracy of Information</li>
          <p>
            MetroHostels strives for accuracy but is not liable for Lodgers’
            information discrepancies.
          </p>

          <li>User Responsibility</li>
          <p>
            Travellers and Renters must comply with Lodgers’ policies and local
            laws.
          </p>
          <li>Intellectual Property</li>
          <p>
            Website content and images are property of MetroHostels or
            respective hotels.
          </p>
          <li>Governing Law</li>
          <p>
            These terms are governed by the laws of the Federal Capital
            Territory and Nigeria.
          </p>
          <li>Dispute Resolution</li>
          <p>
            Disputes will be resolved through arbitration or litigation in the
            Federal Capital Territory, Abuja.
          </p>
          <li>Changes to Term</li>
          <p>MetroHostels reserves the right to modify these terms.</p>
        </ol>

        <i className="mt-10 block">
          By booking through our website, you acknowledge and agree to these
          terms and conditions
        </i>
      </div>
    </PageLayout>
  );
}
