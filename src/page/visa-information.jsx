import { useEffect } from "react";
import { EVisaStep } from "../components/info/E-visaStep";
import { RequirementBox } from "../components/info/RequirementBox";
import { VisaCard } from "../components/info/Card";
import { WhyApplySection } from "../components/WhyApply";
import { ContactSection } from "../components/Contact";

export const VisaInformation = () => {
  const visaOptions = [
    {
      title: "E-Visa (Electronic Visa)",
      duration: "Up to 90 Days (Single/Multiple Entry)",
      pros: [
        "Apply 100% online.",
        "No visit to Embassy required.",
        "Available for land, air, and sea entry.",
      ],
      cons: ["Processing time may vary (typically 3-5 working days)."],
      link: "https://evisa.gov.vn/", // Official E-visa website (check for current domain)
      linkText: "Apply on Official E-visa Portal",
      color: "bg-green-100 border-green-500",
      icon: "✈️",
    },
    {
      title: "Visa Exemption",
      duration: "Up to 45 Days (Check your country)",
      pros: ["No application or fee required.", "Fastest entry process."],
      cons: [
        "Limited stay duration (e.g., 45 days).",
        "Requires a 30-day gap after last departure from Vietnam to re-enter without a visa.",
      ],
      link: "https://evisa.gov.vn/en_US/web/guest/trang-chu-ttdt", // Link to the official site for exemption details
      linkText: "See Visa Exemption Details",
      color: "bg-blue-100 border-blue-500",
      icon: "✅",
    },
    {
      title: "Visa on Arrival (VOA) - Requires Pre-Approval",
      duration: "Varies (e.g., 1 or 3 months, Single/Multiple)",
      pros: [
        "Useful for urgent travel or complex visa types.",
        "Multiple entry options generally easier to arrange.",
      ],
      cons: [
        "Must obtain a pre-approval letter from an agency before flying.",
        "Requires time and payment at the airport for stamping.",
      ],
      link: "https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/Vietnam.html", // Link to official info/warning
      linkText: "Learn About VOA Requirements",
      color: "bg-yellow-100 border-yellow-500",
      icon: "📝",
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="sm:w-4/5 mx-auto bg-white shadow-3xl p-6 sm:p-12">
        <header className=" mb-12">
          <h1 className="text-4xl font-extrabold text-custom sm:text-6xl mb-4 leading-tight">
            Your Essential Guide to Vietnam Visas
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Navigate the latest requirements for a smooth journey to Vietnam.
          </p>
          <p className="mt-2 text-sm text-red-500 font-medium">
            **Disclaimer:** Always check with the official government portals
            for the most current regulations before booking travel.
          </p>
        </header>

        <div className="border-t border-gray-200 mb-12"></div>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="sm:w-3/4">
            {/* Visa Options Section */}
            <section id="visa-options" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 bg-gray-100 p-2 mb-8 border-l-4 border-custom pl-4">
                Choose Your Entry Method
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {visaOptions.map((option, index) => (
                  <VisaCard key={index} option={option} />
                ))}
              </div>
            </section>

            <div className="border-t border-gray-200 mb-12"></div>

            {/* Key Requirements Section */}
            <section id="key-requirements" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 border-custom bg-gray-100 p-2 pl-4">
                Mandatory Travel Prerequisites
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RequirementBox
                  icon="🛂"
                  title="Passport Validity"
                  description="Must be valid for at least **six (6) months** beyond your planned date of entry."
                  bgColor="bg-red-50"
                  iconColor="text-red-500"
                />
                <RequirementBox
                  icon="🗈"
                  title="Blank Pages"
                  description="You need a minimum of **one (1) blank visa page** in your passport for stamping."
                  bgColor="bg-blue-50"
                  iconColor="text-blue-500"
                />
                <RequirementBox
                  icon="💸"
                  title="Visa Fees (E-visa)"
                  description="$25 USD for Single-Entry (90 days) / $50 USD for Multiple-Entry (90 days). Paid online."
                  bgColor="bg-green-50"
                  iconColor="text-green-500"
                />
              </div>
            </section>

            {/* E-Visa Step-by-Step Table */}
            <section id="e-visa-process" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 border-l-4 bg-gray-100 p-2 border-custom pl-4">
                E-Visa Application Steps (Official Portal)
              </h2>
              <div className="overflow-x-auto shadow-xl rounded-xl">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-custom text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-xl">
                        Step
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                        Action
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider rounded-tr-xl">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <EVisaStep />
                </table>
              </div>
            </section>

            {/* Warning Card */}
            <section className="mb-12">
              <div className="p-8 bg-red-100 border-l-8 border-red-600 rounded-xl shadow-inner">
                <h3 className="text-2xl font-bold text-red-800 mb-3 flex items-center">
                  <svg
                    className="w-6 h-6 mr-3 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.427 2.684-1.427 3.449 0l3.082 5.782A1.996 1.996 0 0117 10.998v.002h-.002a2 2 0 01-1.998 2H5.002a2 2 0 01-1.998-2V11c0-.529.21-1.033.585-1.408l3.082-5.782zM11 15a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Official Website Warning
                </h3>
                <p className="text-red-700 leading-relaxed">
                  Many travel agencies offer Vietnam visa services, often marked
                  up significantly. For the lowest cost and direct application,
                  **always use the government's official E-visa portal**.
                  Third-party agencies are **NOT** the government, even if they
                  appear professional.
                </p>
                <a
                  href="https://evisa.gov.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block font-bold text-custom underline hover:text-hover-custom transition"
                >
                  Official Vietnam E-visa Portal
                </a>
              </div>
            </section>
          </div>
          <aside className="lg:w-1/4 mt-8 lg:mt-0 space-y-8">
            <WhyApplySection />
            <ContactSection />
          </aside>
        </div>

        <footer className="text-center pt-8 border-t border-gray-300">
          <p className="text-sm text-gray-500">
            Safe travels! We recommend starting your application at least **2
            weeks** before your travel date.
          </p>
        </footer>
      </div>
    </div>
  );
};
