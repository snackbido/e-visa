import { useEffect } from "react";
import { ContactSection } from "../components/Contact";
import { WhyApplySection } from "../components/WhyApply";
import { AlertCircle } from "lucide-react";

const TermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sections = [
    {
      id: "agreement",
      title: "1. Agreement to Terms",
      content: (
        <p className="mb-4">
          These Terms of Use (“Terms”) constitute a legally binding agreement
          between you (“User,” “you,” or “your”) and ApplyVietVisa (“Company,”
          “we,” “us,” or “our”), governing your access to and use of the website
          https://applyvietvisa.com (“Website”) and any related services
          provided by us (“Services”). By accessing, using, or submitting any
          information through the Website, you confirm that you have read,
          understood, and agreed to be bound by these Terms. If you do not agree
          to these Terms, you must discontinue use of the Website and Services
          immediately.
        </p>
      ),
    },
    {
      id: "description",
      title: "2. Description of Services",
      content: (
        <>
          <p className="mb-4">
            ApplyVietVisa provides **document preparation and application
            support services** for individuals applying for the Vietnam
            Electronic Visa (e-Visa). We assist with collecting information,
            reviewing submitted documents for accuracy, preparing visa
            applications, and submitting them to the official Vietnam
            Immigration system on behalf of applicants.
          </p>
          <p className="mb-4 p-3 border-l-4 border-red-500 bg-red-50 font-medium">
            We are **not a government agency** and we do not issue visas. Visa
            issuance decisions are made solely by the Vietnam Immigration
            Department or relevant government authority.
          </p>
        </>
      ),
    },
    {
      id: "no-affiliation",
      title: "3. No Government or Legal Affiliation",
      content: (
        <>
          <p className="mb-4">
            ApplyVietVisa is a privately operated service provider. We are **not
            affiliated, endorsed, or associated** with the Government of
            Vietnam, the Vietnam Immigration Department, any embassy, consulate,
            border control, or any other government institution.
          </p>
          <p className="mb-4">
            We do not provide legal advice or immigration consultation. Any
            information available through the Website is general information
            only and should not be interpreted as legal guidance.
          </p>
        </>
      ),
    },
    {
      id: "legal-notice",
      title: "4. Important Legal Notice – No Legal Advice",
      content: (
        <p className="mb-4 font-semibold text-red-700">
          ApplyVietVisa is not a law firm and does not provide legal
          representation. Our personnel are not lawyers or legal advisors. Any
          communication, instructions, or information provided by us must **not
          be considered legal advice**. You are solely responsible for seeking
          independent professional or legal advice if required.
        </p>
      ),
    },
    {
      id: "eligibility",
      title: "5. Eligibility",
      content: (
        <>
          <p className="mb-4">
            By using our Website and Services, you confirm that:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>
              You are at least 18 years old or using the Services under the
              supervision of a parent or legal guardian.
            </li>
            <li>You have full legal authority to enter into this agreement.</li>
            <li>You will use the Services only for lawful purposes.</li>
            <li>
              You are applying for a visa on your own behalf or you are legally
              authorized to act on behalf of another person.
            </li>
          </ul>
          <p className="mt-4">
            We reserve the right to refuse service to anyone, at any time,
            without obligation to disclose a reason.
          </p>
        </>
      ),
    },
    {
      id: "user-responsibilities",
      title: "6. User Responsibilities",
      content: (
        <>
          <p className="mb-4">
            By submitting a visa application through our Website, you agree:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>To provide accurate, complete, and truthful information.</li>
            <li>To upload valid supporting documents as required.</li>
            <li>To verify all personal details before submission.</li>
            <li>
              That any mistake in your submission may result in rejection by
              immigration authorities.
            </li>
            <li>
              That you are solely responsible for compliance with all visa and
              entry requirements for Vietnam.
            </li>
          </ul>
          <p className="mt-4 font-medium text-red-600">
            You acknowledge that once your application has been submitted to the
            Vietnam Immigration system, it **cannot be modified, updated, or
            canceled.**
          </p>
        </>
      ),
    },
    {
      id: "fees-payments",
      title: "7. Service Fees and Payments",
      content: (
        <>
          <p className="mb-4">
            All service fees must be paid in Vietnamese Dong (VND) unless
            otherwise stated. Service fees include:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>
              A **Service Fee** charged by ApplyVietVisa for processing
              assistance.
            </li>
            <li>
              The **Government Visa Fee** charged by the Vietnam Immigration
              Department. This government fee is non-refundable under all
              circumstances once submitted.
            </li>
          </ul>
          <p className="mt-4">
            Payments are processed securely through third-party payment
            providers. By purchasing our Services, you authorize ApplyVietVisa
            to process your payment via our selected payment processor.
          </p>
        </>
      ),
    },
    {
      id: "refund-policy",
      title: "8. Refund Policy",
      content: (
        <>
          <p className="mb-4">
            ApplyVietVisa offers refunds only **before submission of your
            application** to the Vietnam Immigration System. Once the
            application has been submitted, no refund will be issued under any
            circumstances, including but not limited to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>Visa rejection by authorities</li>
            <li>Incorrect or incomplete documents provided by you</li>
            <li>Change of mind or travel plans</li>
            <li>Duplicate applications submitted by you</li>
            <li>Ineligibility for visa due to government rules</li>
          </ul>
          <p className="mt-4 font-semibold">
            Refunds, if approved, will be issued only for the **ApplyVietVisa
            Service Fee**. Government fees and payment processing fees are
            non-refundable.
          </p>
        </>
      ),
    },
    {
      id: "processing-disclaimer",
      title: "9. Processing Time Disclaimer",
      content: (
        <>
          <p className="mb-4">
            Processing times provided on our Website are **estimated times
            only**. Actual approval times depend entirely on the Vietnam
            Immigration Department and may vary due to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>National holidays</li>
            <li>System maintenance or technical delays</li>
            <li>High application volume</li>
            <li>Security or document verification procedures</li>
          </ul>
          <p className=" flex items-start gap-3 p-4 font-semibold mt-4 bg-blue-50 rounded-lg border border-blue-200">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-2" />
            <span>
              ApplyVietVisa **does not guarantee processing speed** and shall
              not be held liable for any delay.
            </span>
          </p>
        </>
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
          <div className="lg:flex lg:space-x-8 sm:w-3/4">
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
