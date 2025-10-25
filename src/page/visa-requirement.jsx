import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Plane,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { WhyApplySection } from "../components/WhyApply";
import { ContactSection } from "../components/Contact";

const VisaRequirement = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const visaOptions = [
    {
      id: "exemption",
      title: "Visa Exemption (Free Entry)",
      icon: CheckCircle2,
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      content: {
        description:
          "Citizens of select countries can enter Vietnam without a visa for short trips.",
        requirements: [
          "Valid passport with minimum 6 months validity from entry date",
          "Proof of return or onward travel ticket",
          "Minimum 30-day gap required between consecutive visa-free entries",
          "No work or business activities permitted",
        ],
        details: [
          {
            duration: "15 days",
            countries:
              "UK, Germany, France, Italy, Spain, South Korea, Japan, Belgium, Netherlands",
          },
          { duration: "21 days", countries: "Philippines" },
          {
            duration: "30 days",
            countries:
              "Thailand, Malaysia, Singapore, Indonesia, Cambodia, Laos, Brunei, Myanmar",
          },
          {
            duration: "45 days",
            countries:
              "Select countries (recent extension - verify current list)",
          },
          {
            duration: "90 days",
            countries: "ASEAN nationals (specific conditions apply)",
          },
        ],
        warning:
          "Visa exemption regulations change frequently. Verify your country's eligibility 4-6 weeks before travel.",
      },
    },
    {
      id: "evisa",
      title: "E-Visa (Electronic Visa)",
      icon: FileText,
      color: "bg-amber-50",
      borderColor: "border-amber-200",
      iconColor: "text-amber-600",
      content: {
        description:
          "The most convenient option for tourists. Apply online and receive approval via email before travel.",
        requirements: [
          "Apply through official Vietnam Immigration website (immigration.gov.vn)",
          "Valid passport with 6+ months validity",
          "Clear digital scan of passport bio page",
          "Recent digital passport photo (4x6 cm, white background)",
        ],
        details: [
          {
            aspect: "Validity",
            info: "90 days from issue date (single or multiple entry)",
          },
          {
            aspect: "Processing Time",
            info: "3 business days (standard); 1 business day (expedited)",
          },
          { aspect: "Cost", info: "Standard: $25 USD; Expedited: $50 USD" },
          {
            aspect: "Eligible Countries",
            info: "80+ countries including most Western nations, Australia, Canada, USA",
          },
          {
            aspect: "Validity on Entry",
            info: "Must enter Vietnam within 90 days of approval",
          },
        ],
        warning:
          "Only use the official government website. Third-party visa agencies charge excessive fees and may compromise data security.",
      },
    },
    {
      id: "voa",
      title: "Visa on Arrival (VOA)",
      icon: Plane,
      color: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      content: {
        description:
          "Get your visa stamped upon arrival at the airport. Requires pre-approval before departure.",
        requirements: [
          "Obtain Visa Approval Letter from licensed Vietnam travel agency before flight",
          "Provide travel agency with passport scan and passport photo",
          "Present approval letter to airline for boarding",
          "Pay stamping fee in cash (USD or VND) at airport immigration",
          "Valid passport with 6+ months validity",
        ],
        details: [
          {
            aspect: "Validity",
            info: "Up to 90 days (single or multiple entry)",
          },
          {
            aspect: "Stamping Fee",
            info: "$25 USD single entry; $50 USD multiple entry (at airport)",
          },
          {
            aspect: "Processing Time",
            info: "1-3 business days for approval letter",
          },
          {
            aspect: "Applicable Airports",
            info: "Noi Bai (Hanoi), Tan Son Nhat (Ho Chi Minh City), Da Nang, Cam Ranh, Phu Quoc",
          },
          {
            aspect: "Land/Sea Entry",
            info: "VOA NOT available at land borders or seaports",
          },
        ],
        warning:
          "Must have approval letter before boarding. Airlines will deny entry without pre-approval. Only use reputable travel agencies.",
      },
    },
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-white rounded-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
            Vietnam Visa Requirements
          </h1>
          <p className="text-xl text-custom font-medium">
            Your Complete Entry & Immigration Guide
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl py-8 border-b mb-8">
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Planning a trip to Vietnam? Visa requirements depend on your
            nationality and length of stay. This guide outlines the three main
            pathways for international visitors to enter the country legally.
          </p>
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Important:</span> Visa rules
              change frequently. Verify current requirements with your nearest
              Vietnamese embassy or the official government website before
              booking travel.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Visa Options */}
          <div className="space-y-4 md:w-3/4">
            {visaOptions.map((option) => {
              const IconComponent = option.icon;
              const isExpanded = expandedSection === option.id;

              return (
                <div
                  key={option.id}
                  className={`${option.color} border-2 ${option.borderColor} rounded-xl overflow-hidden transition-all`}
                >
                  {/* Header Button */}
                  <button
                    onClick={() => toggleSection(option.id)}
                    className="w-full text-left p-6 sm:p-7 flex items-center justify-between hover:opacity-90 transition-opacity"
                  >
                    <div className="flex items-center gap-4">
                      <IconComponent
                        className={`${option.iconColor} w-8 h-8 flex-shrink-0`}
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {option.title}
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                          {option.content.description}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-gray-500 flex-shrink-0 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Content */}
                  {isExpanded && (
                    <div className="border-t-2 border-current border-opacity-10 p-6 sm:p-7 space-y-6">
                      {/* Requirements */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Requirements
                        </h3>
                        <ul className="space-y-2">
                          {option.content.requirements.map((req, idx) => (
                            <li key={idx} className="flex gap-3 text-gray-700">
                              <span className="text-blue-600 font-bold flex-shrink-0">
                                •
                              </span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Details Grid */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                          Key Details
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {option.content.details.map((detail, idx) => (
                            <div
                              key={idx}
                              className="bg-white rounded-lg p-4 shadow-sm"
                            >
                              <div className="font-semibold text-gray-800 text-sm">
                                {detail.duration || detail.aspect || "Detail"}
                              </div>
                              <div className="text-gray-600 text-sm mt-1">
                                {detail.countries ||
                                  detail.info ||
                                  "Information"}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Warning */}
                      {option.content.warning && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-800">
                            {option.content.warning}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <aside className="lg:w-1/4 mt-8 lg:mt-0 space-y-8">
            <WhyApplySection />
            <ContactSection />
          </aside>
        </div>
        <div className="bg-gray-800 text-white rounded-xl shadow-md p-4 mt-8 text-center text-sm">
          <p>
            <span className="font-semibold">Disclaimer:</span> Visa regulations
            are subject to change. This guide is for informational purposes
            only.
          </p>
          <p className="mt-4 text-gray-400">Last Updated: October 2025</p>
        </div>
      </div>
    </div>
  );
};

export default VisaRequirement;
