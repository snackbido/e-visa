import { CoreValue } from "../components/about/CoreValue";
import { Service } from "../components/about/Service";
import { ContactSection } from "../components/Contact";
import { WhyApplySection } from "../components/WhyApply";

// Placeholder icons (In a real project, you would use actual SVG icons or a library like Heroicons/Font Awesome)

export const About = () => {
  return (
    <div className="min-h-screen py-16 px-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl overflow-hidden">
        {/* Header Section: Hero */}
        <header className=" sm:py-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">About Us</h1>
          <p className="text-xl text-custom">
            Simplifying Your Vietnam e-Visa Journey Since 2025.
          </p>
        </header>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="py-8 lg:w-3/4 sm:py-8 space-y-12">
            {/* Introduction */}
            <section className="text-lg text-gray-700 leading-relaxed border-b pb-8">
              <p className="mb-4">
                <b>ApplyVietVisa.com</b> is a professional{" "}
                <b>
                  <i>Vietnam e-Visa support website</i>
                </b>{" "}
                dedicated to helping international travelers obtain their
                Vietnam travel authorization with ease, clarity, and confidence.
                Founded in <b>2025</b>, our mission is to simplify the visa
                application process by offering a fast, secure, and reliable
                online visa assistance service.
              </p>
              <p>
                We proudly support travelers from around the world, including
                tourists, business visitors, families, and international
                professionals planning to enter Vietnam.
              </p>
            </section>

            {/* Who We Are */}
            <section>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Who We Are
              </h2>
              <div className="lg:flex lg:space-x-10">
                <div className="lg:w-2/3 text-gray-700 leading-relaxed space-y-4">
                  <p>
                    We are a <b>private visa support service</b> — not a
                    government agency — and we are <b>not affiliated</b> with
                    the Vietnam Government, Immigration Department, or any
                    embassy.
                  </p>
                  <p>
                    Instead, we operate independently to assist travelers by
                    <b>
                      {" "}
                      reviewing application details, minimizing common errors,
                      providing guidance
                    </b>
                    , and submitting visa requests on behalf of applicants
                    through official immigration processing channels.
                  </p>
                  <p>
                    ApplyVietVisa.com was founded by a team of professionals
                    passionate about travel facilitation and customer service.
                    Having seen many travelers face unnecessary delays and visa
                    rejections due to confusing requirements, missing documents,
                    or simple clerical errors, we created a service that offers
                    <b>clarity, support, and peace of mind</b> during the visa
                    process.
                  </p>
                </div>
                <div className="lg:w-1/3 mt-6 lg:mt-0">
                  <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                    <h3 className="font-bold text-lg text-yellow-800 mb-2">
                      Legal Notice
                    </h3>
                    <p className="text-sm text-yellow-700">
                      ApplyVietVisa.com is a private visa support website. We
                      are not part of the Vietnam Government, not affiliated
                      with any embassy, and do not represent the Vietnam
                      Immigration Department. Visa approval decisions are made
                      entirely by the Vietnam Immigration authorities. Our role
                      is to assist applicants with preparation, submission, and
                      communication.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* What We Do and Our Mission */}
            <section className="lg:flex lg:space-x-12 border-t pt-8">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  What We Do
                </h2>
                <p className="text-gray-700 mb-4">
                  We focus exclusively on{" "}
                  <b>Vietnam e-Visa (electronic visa) processing assistance</b>.
                  Our services include:
                </p>
                <Service />
                <p className="mt-4 text-sm italic text-gray-600">
                  While the final approval of all visa applications is issued
                  solely by the Vietnam Immigration Department, we ensure that
                  every application is carefully reviewed before submission to
                  reduce the risk of rejection or delay.
                </p>
              </div>

              <div className="lg:w-1/2 mt-8 lg:mt-0 p-6 bg-blue-50 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-blue-800 mb-4">
                  Our Mission
                </h2>
                <p className="text-xl font-semibold text-gray-700 mb-4">
                  Make Vietnam visa processing easy, transparent, and
                  stress-free.
                </p>
                <p className="text-gray-600">
                  We believe the visa application should not prevent people from
                  traveling. Whether someone is visiting Vietnam for tourism,
                  business, education, or family visits, we want to ensure a
                  smooth and reliable experience.
                </p>
              </div>
            </section>

            {/* Core Values */}
            <section className="border-t pt-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Our Core Values
              </h2>
              <CoreValue />
            </section>

            {/* Why Travelers Choose Us & Security */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t pt-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Why Travelers Choose Us
                </h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>
                    <b>Clear</b> and straightforward visa guidance
                  </li>
                  <li>Simple online process</li>
                  <li>
                    Professional <b>review</b> of application details
                  </li>
                  <li>Email support throughout the process</li>
                  <li>Secure payment handling</li>
                  <li>Transparent service fees</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  We understand that visas can be time-sensitive, and small
                  mistakes can result in travel disruption. That’s why we assist
                  carefully with each case while maintaining efficiency and
                  accuracy.
                </p>
              </div>

              <div className="p-6 bg-gray-100 rounded-lg shadow-inner">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-3xl mr-2 text-blue-600">🛡️</span>
                  Data Security & Privacy Protection
                </h3>
                <p className="text-gray-700 mb-4">
                  We take user data security seriously. All personal information
                  submitted through our website is <b>encrypted</b> and handled
                  with strict confidentiality.
                </p>
                <p className="text-gray-700">
                  We collect only what is necessary to process visa applications
                  and never <b>sell, trade, or misuse</b> customer data. For
                  full details, users may refer to our{" "}
                  <a
                    href="/privacy-policy"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">
                  Customer Support Commitment
                </h3>
                <p className="text-gray-700">
                  Our customer service team is available via email to answer
                  questions, assist with updates, and provide guidance
                  throughout the application process. We strive to respond
                  <b> quickly and professionally</b> to every inquiry.
                </p>
              </div>
            </section>
          </div>
          <aside className="lg:w-1/4 mt-8 lg:py-6 lg:mt-0 space-y-8">
            <WhyApplySection />
            <ContactSection />
          </aside>
        </div>
      </div>
    </div>
  );
};
