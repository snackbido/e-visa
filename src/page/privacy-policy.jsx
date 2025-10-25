import React, { useEffect } from "react";
import { WhyApplySection } from "../components/WhyApply";
import { ContactSection } from "../components/Contact";

const PrivacyPolicy = () => {
  const sections = [
    {
      id: "information-collection",
      title: "1. Information We May Collect",
      content: (
        <>
          <p className="mb-4">
            We may request certain personal details to provide visa processing
            or customer support services. This information can include your
            **name, nationality, passport number, date of birth, travel dates,
            and contact details** such as email address or phone number.
          </p>
          <p className="mb-4">
            Additionally, our system may automatically record non-personal
            information such as:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>IP address and browser type</li>
            <li>Pages visited and time spent on the site</li>
            <li>Device information and referring websites</li>
          </ul>
          <p className="mt-4">
            Such data helps us improve website performance and user experience.
          </p>
        </>
      ),
    },
    {
      id: "information-usage",
      title: "2. How We Use Your Information",
      content: (
        <>
          <p className="mb-4">
            Your information is used solely for legitimate purposes, including:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>Processing e-visa applications and related payments</li>
            <li>
              Contacting you with updates or clarifications regarding your
              application
            </li>
            <li>
              Improving the efficiency, accuracy, and usability of our platform
            </li>
            <li>Providing technical or customer support when requested</li>
          </ul>
          <p className="mt-4 font-semibold text-red-600">
            We do not sell, lease, or share your personal data with third
            parties unless required by law or expressly authorized by you.
          </p>
        </>
      ),
    },
    {
      id: "payment-security",
      title: "3. Payment and Security",
      content: (
        <>
          <p className="mb-4">
            All payment transactions on ApplyVietVisa.com are processed via
            secure, **SSL-encrypted connections**. We **do not store your full
            credit card information**; only partial details (e.g., last four
            digits) may be kept for verification or refund purposes.
          </p>
          <p className="mb-4">
            We apply commercially reasonable measures to safeguard your
            information from unauthorized access, alteration, or disclosure.
            However, please note that no internet transmission or electronic
            storage method is entirely secure, and we cannot guarantee absolute
            protection.
          </p>
        </>
      ),
    },
    {
      id: "cookies",
      title: "4. Cookies and Tracking Technologies",
      content: (
        <>
          <p className="mb-4">
            Our website may use **cookies** and similar tracking tools to
            recognize returning visitors, analyze traffic, and enhance your
            experience. Cookies do not contain personal data; they simply store
            technical information about your visit.
          </p>
          <p className="mb-4">
            You can choose to **disable cookies** through your browser settings,
            but doing so may affect certain site features or performance.
          </p>
          <p className="mb-4">
            Third-party tools such as **Google Analytics** may also be used to
            help us understand how visitors interact with our website. These
            third parties operate under their own privacy policies, which we
            encourage you to review.
          </p>
        </>
      ),
    },
    {
      id: "disclosure",
      title: "5. Information Disclosure",
      content: (
        <>
          <p className="mb-4">
            We may share limited information only when necessary, such as:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>
              With payment gateways or partners assisting in transaction
              processing
            </li>
            <li>
              With government or immigration authorities when required by
              applicable law
            </li>
            <li>
              With service providers maintaining our website or IT systems
            </li>
          </ul>
          <p className="mt-4">
            All such parties are bound by confidentiality and data protection
            obligations.
          </p>
        </>
      ),
    },
    {
      id: "data-retention",
      title: "6. Data Retention",
      content: (
        <p>
          We retain your personal data only for as long as necessary to fulfill
          the purposes described in this policy or as required by law. After
          that period, your information will be **securely deleted or
          anonymized**.
        </p>
      ),
    },
    {
      id: "your-rights",
      title: "7. Your Rights",
      content: (
        <>
          <p className="mb-4">
            Depending on applicable laws, you may have the right to:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>Access, review, or correct your personal data</li>
            <li>Request deletion of your information</li>
            <li>Withdraw consent for processing (where applicable)</li>
          </ul>
          <p className="mt-4">
            You can contact us at **contact@book247.vn** for any requests or
            inquiries regarding your data.
          </p>
        </>
      ),
    },
    {
      id: "third-party-links",
      title: "8. Links to Third-Party Websites",
      content: (
        <p>
          ApplyVietVisa.com may include links to other websites for your
          convenience. We are **not responsible** for the content or privacy
          practices of external sites. We recommend reviewing their policies
          before providing any personal information.
        </p>
      ),
    },
    {
      id: "policy-updates",
      title: "9. Policy Updates",
      content: (
        <p>
          This Privacy Policy may be revised or updated periodically to reflect
          changes in our operations or applicable regulations. Any updates will
          be posted on this page with a revised “Last Updated” date. Continued
          use of our website after changes are published constitutes your
          acceptance of the updated terms.
        </p>
      ),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto rounded-lg overflow-hidden">
        <header className="py-8">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-sm text-custom mt-1">
            Last updated: <time dateTime="2025-10-01">October 2025</time>
          </p>
        </header>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="py-8 sm:w-3/4 lg:flex lg:space-x-8 border-t">
            {/* Sidebar Navigation Menu (Visible on large screens) */}
            <aside className="lg:w-1/4 mb-8 lg:mb-0 sticky top-4 self-start hidden lg:block">
              <nav className="p-4 bg-gray-50 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold mb-3 text-custom border-b pb-2">
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

            {/* Main Content */}
            <main className="lg:w-3/4">
              <p className="text-gray-700 mb-8 leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50 p-3 rounded-md">
                At **ApplyVietVisa.com**, we respect and protect the privacy of
                every visitor and customer who interacts with our website and
                online services. This Privacy Policy explains how we may
                collect, use, disclose, and protect your personal information
                when you use our website or apply for visa-related services. By
                using this site, you agree to the terms outlined below.
              </p>

              <div className="space-y-10">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="pt-2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                      {section.title}
                    </h2>
                    <div className="text-gray-700 leading-relaxed">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>

              {/* Contact Information */}
              <div
                id="contact-information"
                className="mt-12 p-6 border-t border-gray-200 bg-blue-50 rounded-lg"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  10. Contact Information
                </h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions, feedback, or concerns regarding
                  this Privacy Policy, please contact us at:
                </p>
                <address className="not-italic space-y-2">
                  <p className="font-semibold text-lg text-blue-600">
                    ApplyVietVisa.com
                  </p>
                  <div className="flex items-center text-gray-700">
                    <span className="text-xl mr-2">📧</span>
                    Email:{" "}
                    <a
                      href="mailto:contact@book247.vn"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      contact@book247.vn
                    </a>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-xl mr-2">🌐</span>
                    Website:{" "}
                    <a
                      href="https://ApplyVietVisa.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      https://ApplyVietVisa.com
                    </a>
                  </div>
                </address>
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

export default PrivacyPolicy;
