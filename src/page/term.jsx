import { useEffect } from "react";
import { ContactSection } from "../components/Contact";
import { WhyApplySection } from "../components/WhyApply";

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sections = [
    {
      id: "introduction",
      title: "I. Introduction",
      content: (
        <p className="mb-4">
          Welcome to <strong>ApplyVietVisa.com</strong> (“We”, “Our”,
          “Website”). We are a private visa support agency assisting
          international travelers in preparing and submitting Vietnam eVisa
          applications to the official government portal.{" "}
          <strong>ApplyVietVisa.com</strong> is not affiliated with the
          Government of Vietnam and does not issue visas.
          <br />
          By using our services, you agree to these Terms & Conditions.
        </p>
      ),
    },
    {
      id: "scope-of-services",
      title: "II. Scope of Services",
      content: (
        <ul className="list-disc list-inside ml-4 space-y-2">
          <li>Assist customers in completing the Vietnam eVisa form.</li>
          <li>
            Review and verify data before submission to the official portal (
            <a
              href="https://evisa.xuatnhapcanh.gov.vn"
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://evisa.xuatnhapcanh.gov.vn
            </a>
            ).
          </li>
          <li>
            Track application status and deliver approved eVisa via email.
          </li>
          <li>
            Our services are paid and include processing, customer support, and
            translation assistance (if applicable).
          </li>
        </ul>
      ),
    },
    {
      id: "service-fees",
      title: "III. Service Fees",
      content: (
        <>
          <p className="mb-2">
            Fees are displayed transparently at checkout. They include:
          </p>
          <ol className="list-decimal list-inside ml-4 space-y-2">
            <li>ApplyVietVisa.com processing & service fee.</li>
            <li>
              Government fee (if customer authorizes us to submit on their
              behalf).
            </li>
          </ol>
          <p className="mt-4">
            Payment is required prior to application submission via
            international card (Visa/MasterCard/PayPal).
          </p>
        </>
      ),
    },
    {
      id: "refund-policy",
      title: "IV. Refund Policy",
      content: (
        <>
          <h4 className="font-semibold mt-4 mb-2">
            1. 24-Hour Full Refund Guarantee
          </h4>
          <p className="mb-4">
            You may request a 100% refund within 24 hours after payment, if:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              Your application has not yet been submitted to the Vietnam
              Immigration eVisa system.
            </li>
            <li>
              You send a written refund request to{" "}
              <a
                href="mailto:support@applyvietvisa.com"
                className="text-blue-600 underline"
              >
                support@applyvietvisa.com
              </a>{" "}
              within 24 hours from payment confirmation.
            </li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">2. Non-Refundable Cases:</h4>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              Once the application has been submitted to the government system.
            </li>
            <li>Incorrect information provided by the customer.</li>
            <li>Change of travel plan after processing.</li>
            <li>Application refused by the Vietnam Immigration Department.</li>
          </ul>

          <h4 className="font-semibold mt-4 mb-2">3. Exceptions:</h4>
          <p>
            If a processing error occurs due to ApplyVietVisa.com, we will
            refund 100% of the service fee (excluding any government fee already
            paid).
          </p>

          <h4 className="font-semibold mt-4 mb-2">4. Processing Time:</h4>
          <p>
            Refunds will be issued within 7–10 business days via the original
            payment method.
          </p>

          <h4 className="font-semibold mt-4 mb-2">
            5. Limitation of Liability
          </h4>
          <p className="mb-4">
            ApplyVietVisa.com shall not be held liable for any direct, indirect,
            incidental, special, or consequential damages arising from a visa
            denial or delay, including but not limited to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              Flight tickets, hotel bookings, tours, or other travel-related
              expenses;
            </li>
            <li>Financial loss, opportunity cost, or schedule changes;</li>
            <li>Emotional distress or reputational loss.</li>
          </ul>
          <p className="mt-4">
            The customer acknowledges that visa approval or rejection is solely
            determined by the Vietnam Immigration Department, beyond
            ApplyVietVisa.com’s control.
          </p>
          <p className="mt-2 font-medium">
            In any case, the maximum liability of ApplyVietVisa.com shall not
            exceed the total service fee paid by the customer for that
            particular transaction.
          </p>
        </>
      ),
    },
    {
      id: "disclaimer",
      title: "V. Disclaimer",
      content: (
        <p className="mb-4">
          ApplyVietVisa.com is not responsible for delays, rejections, or
          changes in government processing. Visa issuance is at the sole
          discretion of the Vietnamese authorities. Use of our services does not
          guarantee visa approval.
        </p>
      ),
    },
    {
      id: "intellectual-property",
      title: "VI. Intellectual Property",
      content: (
        <p className="mb-4">
          All content, graphics, and materials on ApplyVietVisa.com are owned by
          us. Unauthorized use, reproduction, or redistribution is strictly
          prohibited.
        </p>
      ),
    },
    {
      id: "governing-law",
      title: "VII. Governing Law",
      content: (
        <p className="mb-4">
          These Terms are governed by the laws of Vietnam. Any disputes shall be
          resolved at the People’s Court of Ho Chi Minh City, Vietnam.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden">
        {/* Header Section */}
        <header className="py-8 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold">Terms of Use</h1>
          <p className="text-sm text-custom mt-1">
            <span className="font-semibold">Last Updated:</span>{" "}
            <time dateTime="2025-10-01">October 2025</time>
          </p>
          <p className="text-sm text-custom">
            Legal Version: Strong Protection Format
          </p>
        </header>
        <div className="flex flex-col lg:flex-row lg:space-x-8 py-8">
          <div className="lg:flex lg:space-x-8 lg:w-3/4">
            {/* Sidebar Navigation Menu (Visible on large screens) */}
            <aside className="lg:w-1/4 mb-8 lg:mb-0 sticky top-4 self-start hidden lg:block">
              <nav className="p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                <h3 className="text-lg font-bold mb-3 text-blue-800 border-b pb-2">
                  Table of Contents
                </h3>
                <ul className="space-y-2 text-sm">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="text-gray-600 hover:text-blue-600 transition duration-150 ease-in-out block hover:underline"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Main Content Area */}
            <main className="lg:w-3/4">
              <div className="space-y-10">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="pt-2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2">
                      {section.title}
                    </h2>
                    <div className="text-gray-700 leading-relaxed">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>
            </main>
          </div>
          <aside className="lg:w-1/4 mt-8 lg:mt-0 space-y-8">
            <WhyApplySection />
            <ContactSection />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
