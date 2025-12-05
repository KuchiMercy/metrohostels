import PageLayout from "@/components/layouts/PageLayout";

export default function page() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto p-10">
        <h2 className="text-3xl md:text-5xl mb-5">Privacy Policy:</h2>
        <ol className="list-decimal mt-5 ml-5 space-y-3 text-lg">
          <li>
            Information Collection{" "}
            <ul className="list-disc mt-2 ml-5 space-y-2">
              <li>
                We collect personal data (name, email, phone number, etc.)
                during booking.
              </li>
              <li>
                We also collect usage data (IP address, browser type, etc.)
                through cookies.
              </li>
            </ul>
          </li>
          <li>
            Data Usage{" "}
            <ul className="list-disc mt-2 ml-5 space-y-2">
              <li>To process bookings and communicate with users.</li>
              <li>To improve website functionality and user experience.</li>
            </ul>
          </li>
          <li>
            Data Sharing{" "}
            <ul className="list-disc mt-2 ml-5 space-y-2">
              <li>
                We share booking information with Lodgers (Hotels and Spaces).
              </li>
              <li>
                We may share anonymized data with third-party analytics tools.
              </li>
            </ul>
          </li>
          <li>Data Security</li>
          <p>
            We implement industry-standard security measures to protect user
            data.
          </p>

          <li>User Rights</li>
          <p>Users can access, modify, or delete their personal data.</p>

          <li>Cookie Policy</li>
          <p>
            We use cookies to enhance user experience and track website usage.
          </p>
          <li>Changes to Policy</li>
          <p>
            We reserve the right to update this policy; changes will be posted
            on this page.
          </p>
          <li>Contact Us</li>
          <p>
            For privacy-related queries, reach out to us
            via: contact@metrohostels.com.
          </p>
        </ol>
      </div>
    </PageLayout>
  );
}
