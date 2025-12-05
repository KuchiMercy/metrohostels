import PageLayout from "@/components/layouts/PageLayout";

export default function page() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto p-10">
        <h2 className="text-3xl md:text-5xl mb-5">Refund Policy:</h2>
        <ul className="list-disc mt-5 ml-5 space-y-3 text-lg">
          <li>
            Refunds will be processed within 7 working days of receiving a valid
            refund request.
          </li>
          <li>
            A refund request is valid and will be issued if the service provider
            cancels or significantly alters the booking, especially without
            notice.
          </li>
          <li>
            If the client cancels, a refund will be issued minus a 10%
            administrative fee.
          </li>
          <li>Refunds will be made to the original payment method.</li>
          <li>
            We reserve the right to deny refunds for services rendered or
            bookings not cancelled within the stipulated timeframe of 24 hours.
          </li>
        </ul>
      </div>
    </PageLayout>
  );
}
