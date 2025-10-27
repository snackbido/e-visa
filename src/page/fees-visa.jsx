import {
  CheckCircle,
  CreditCard,
  HandCoins,
  PlaneLanding,
} from "../components/fees/Icon";
import { TabButton } from "../components/fees/TabButton";
import { SectionHeader } from "../components/fees/Header";
import { FeeCard } from "../components/fees/Card";
import { useEffect, useState } from "react";
import { WhyApplySection } from "../components/WhyApply";
import { ContactSection } from "../components/Contact";

export const FeesVisa = () => {
  const [activeTab, setActiveTab] = useState("e-visa");
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const officialFees = {
    eVisa: [
      {
        type: "Single Entry",
        duration: "Up to 90 Days",
        fee: 25,
        notes: "Paid online via official portal.",
      },
      {
        type: "Multiple Entry",
        duration: "Up to 90 Days",
        fee: 50,
        notes: "Paid online via official portal.",
      },
    ],
    voaStamping: [
      {
        type: "Single Entry",
        duration: "1 to 3 Months",
        fee: 25,
        notes: "Paid in cash (USD recommended) at the airport.",
      },
      {
        type: "Multiple Entry",
        duration: "1 to 3 Months",
        fee: 50,
        notes: "Paid in cash (USD recommended) at the airport.",
      },
      {
        type: "Multiple Entry",
        duration: "3 to 12 Months",
        fee: 95,
        notes: "Paid in cash (USD recommended) at the airport.",
      },
    ],
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 font-['Inter',_sans-serif]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 p-6 bg-white rounded-xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2">
            Vietnam Visa Fees Guide
          </h1>
          <p className="text-xl text-custom font-medium">
            Understanding E-Visa vs. Visa On Arrival (VOA) Costs
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 border-b rounded-t-lg">
          <TabButton
            id="e-visa"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            label="E-Visa (Online)"
            icon={CreditCard}
          />
          <TabButton
            id="voa"
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            label="Visa On Arrival (VOA)"
            icon={PlaneLanding}
          />
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Tab Content */}
          <main className="bg-white lg:w-3/4 p-6 sm:p-8 rounded-b-xl rounded-t-lg">
            {/* E-Visa Content */}
            {activeTab === "e-visa" && (
              <div>
                <SectionHeader
                  title="Electronic Visa (E-Visa) Fees"
                  subtitle="The E-Visa is processed entirely online through the official government portal."
                />

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {officialFees.eVisa.map((fee, index) => (
                    <FeeCard
                      key={index}
                      title={fee.type}
                      fee={fee.fee}
                      icon={CreditCard}
                      description={`Valid for travel up to ${fee.duration}.`}
                      note={fee.notes}
                    />
                  ))}
                </div>

                <div className="p-4 bg-blue-100 border-l-4 border-blue-500 rounded-lg text-sm text-gray-700">
                  <p className="font-semibold text-blue-800 flex items-center mb-1">
                    <CheckCircle className="w-5 h-5 mr-2" /> Key E-Visa
                    Considerations:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <b>Single Fee:</b> The listed fee is the *only* payment
                      required for the official E-Visa.
                    </li>
                    <li>
                      <b>Non-Refundable:</b> The fee is paid upfront and is{" "}
                      <b>not</b>
                      refunded if the application is rejected.
                    </li>
                    <li>
                      <b>Eligibility:</b> Available to citizens of 80 countries,
                      typically for maximum 90 days.
                    </li>
                    <li>
                      <b>No Stamping Fee:</b> You do *not* pay anything extra at
                      the airport.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* VOA Content */}
            {activeTab === "voa" && (
              <div>
                <SectionHeader
                  title="Visa On Arrival (VOA) Fees"
                  subtitle="VOA involves two separate, mandatory fees: a Service Fee (online) and a Stamping Fee (airport)."
                  isVOA
                />

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {/* VOA Service Fee Card (Agency Fee) */}
                  <FeeCard
                    title="1. Service Fee (Approval Letter)"
                    fee="Varies"
                    icon={PlaneLanding}
                    description="Paid online to a private visa agency/agent. This is for processing your Approval Letter."
                    note="Ranges from $10-$80+ USD depending on visa type, group size, and urgency."
                    bgColor="bg-amber-50"
                    isVOA
                  />

                  {/* VOA Stamping Fee Card (Government Fee) */}
                  <FeeCard
                    title="2. Stamping Fee (Government Fee)"
                    fee="25 - 135"
                    icon={HandCoins}
                    description="Paid *in cash* to the Immigration Officer upon arrival at Vietnam's airport."
                    note="Credit cards are typically NOT accepted. Prepare exact USD cash."
                    bgColor="bg-amber-100"
                    isVOA
                  />
                </div>

                {/* Stamping Fee Table */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 mt-8">
                  Official VOA Stamping Fees (Paid at Airport)
                </h3>
                <div className="overflow-x-auto rounded-lg shadow-inner">
                  <table className="min-w-full divide-y divide-amber-200">
                    <thead className="bg-amber-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          Duration
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                          Fee (USD)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-amber-100 text-gray-700">
                      {officialFees.voaStamping.map((fee, index) => (
                        <tr key={index} className="hover:bg-amber-50">
                          <td className="px-4 py-3 whitespace-nowrap font-medium">
                            {fee.type}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            {fee.duration}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-bold">
                            ${fee.fee}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-red-100 border-l-4 border-red-500 rounded-lg text-sm text-gray-700 mt-8">
                  <p className="font-semibold text-red-800 mb-1">
                    <PlaneLanding className="w-5 h-5 mr-2 inline-block" /> VOA
                    WARNING:
                  </p>
                  <p>
                    VOA is <b>only</b> valid for travelers arriving by air at an
                    international Vietnamese airport. You must obtain the
                    Approval Letter <b>before</b> you fly.
                  </p>
                </div>
              </div>
            )}

            {/* General Comparison Section (Always visible) */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4">
                Fee Structure Explained: Service vs. Stamping
              </h2>
              <p className="text-gray-700 mb-6">
                This distinction is key when choosing your application method:
              </p>

              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-200 shadow-sm">
                  <div className="flex items-center mb-2">
                    <HandCoins className="w-6 h-6 text-custom mr-3" />
                    <h3 className="font-bold text-lg text-custom">
                      The Government Fee (Fixed Cost)
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    This is the amount set by the Ministry of Finance. For
                    E-Visas, this is the <b>$25/$50 fee</b> paid online. For
                    Visa On Arrival, this is the <b>Stamping Fee</b> paid in
                    cash at the airport (e.g., $25 or $50).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 shadow-sm">
                  <div className="flex items-center mb-2">
                    <CreditCard className="w-6 h-6 text-gray-600 mr-3" />
                    <h3 className="font-bold text-lg text-gray-800">
                      The Service Fee (Variable Cost)
                    </h3>
                  </div>
                  <p className="text-gray-700">
                    This is an administrative fee charged by{" "}
                    <b>third-party agencies</b> for facilitating or expediting
                    your application (applies to VOA pre-approval letters and
                    agency-assisted E-Visas). This fee is highly variable and
                    non-official.
                  </p>
                </div>
              </div>
            </div>
          </main>
          <aside className="lg:w-1/4 mt-8 lg:mt-0 space-y-8">
            <WhyApplySection />
            <ContactSection />
          </aside>
        </div>
      </div>
    </div>
  );
};
