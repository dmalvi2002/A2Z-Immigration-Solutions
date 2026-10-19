import {pageMetadata} from '@/sanity/lib/content';
import PageData from '@/components/CMS/PageData';
export const generateMetadata = () => pageMetadata('terms');
import React from "react";

export default function TermsConditions() {
  return (<> <PageData id="terms" />
    <div className="bg-gray-50">
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");
        @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");
        body { font-family: "Inter", sans-serif; }
        .hero-gradient::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.98) 0%,
            rgba(2, 6, 23, 0.95) 100%
          );
        }
        .section-number {
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-bluestyle { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); }
        .text-bluepaint { color: #7dc0ff; }
      `}</style>

      {/* Hero Section */}
      <section className="hero-gradient relative mt-16 h-[400px] overflow-hidden md:h-[450px] lg:h-[500px] ">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Legal Documents"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-35" />

        <div className="container relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
          <div className="flex w-full flex-col items-center justify-between gap-8 lg:flex-row">
            {/* Left Side - Title */}
            <div className="text-center lg:text-left">
              <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                Terms & <span className="text-bluepaint">Conditions</span>
              </h1>
              <div className="mt-6 flex items-center justify-center text-white lg:justify-start">
                <i className="fas fa-shield-alt mr-2 flex-shrink-0" />
                <span className="text-center text-[11px] drop-shadow-md sm:text-base lg:text-left lg:text-left">
                  IAA Regulated • Professional Immigration Services
                </span>
              </div>
            </div>

            {/* Right Side - Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="/get-in-touch"
                className="text-bluestyle inline-flex transform items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-200 hover:scale-105 sm:px-8 sm:py-4"
              >
                <i className="fas fa-envelope mr-3" />
                Contact Us
              </a>
              <a
                href="/about-us"
                className="inline-flex transform items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-800 shadow-lg transition duration-200 hover:scale-105 hover:bg-gray-100 sm:px-8 sm:py-4"
              >
                <i className="fas fa-info-circle mr-3" />
                About Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 sm:text-4xl">
              Who We Are
            </h2>
            <div className="mx-auto h-1 w-24 bg-blue-600" />
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8 lg:p-10">
            <p className="mb-8 text-base leading-relaxed text-gray-700 sm:text-lg">
              A2Z Immigration Solutions Limited ("A2Z Immigration", "we", "us",
              "our") provides UK immigration advice and services to businesses
              and individuals, including Sponsor Licence support and Skilled
              Worker, Spouse/Partner and Student visa applications. We are
              regulated by the Immigration Advice Authority (IAA) at Level 1.
              IAA may review client files as part of its regulatory role. Learn
              more{" "}
              <a href="/about-us" className="font-bold text-blue-600">
                about us.
              </a>
            </p>

            {/* Info Cards */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                <i className="fas fa-building mb-3 text-2xl text-blue-600" />
                <h4 className="mb-2 font-semibold text-slate-800">
                  Company Number
                </h4>
                <p className="text-sm text-gray-600">SC659958</p>
              </div>

              <div className="rounded-xl border border-green-100 bg-green-50 p-5">
                <i className="fas fa-certificate mb-3 text-2xl text-green-600" />
                <h4 className="mb-2 font-semibold text-slate-800">
                  IAA Registration
                </h4>
                <p className="text-sm text-gray-600">F202100303</p>
              </div>

              <div className="rounded-xl border border-purple-100 bg-purple-50 p-5">
                <i className="fas fa-map-marker-alt mb-3 text-2xl text-purple-600" />
                <h4 className="mb-2 font-semibold text-slate-800">
                  Registered Office
                </h4>
                <p className="text-sm text-gray-600">
                  49 Shaw Crescent, Aberdeen AB25 3BT, UK
                </p>
              </div>

              <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">
                <i className="fas fa-phone-alt mb-3 text-2xl text-orange-600" />
                <h4 className="mb-2 font-semibold text-slate-800">Contact</h4>
                <p className="text-sm text-gray-600">+44 7441 398273</p>
                <p className="mt-1 text-xs text-gray-600">
                  info@a2zimmigrations.co.uk
                </p>
              </div>
            </div>

            {/* Services Grid */}
            <div className="rounded-xl bg-gray-50 p-6">
              <h3 className="mb-4 flex items-center text-xl font-semibold text-slate-800">
                <i className="fas fa-briefcase mr-3 text-blue-600" />
                Our Services Include
              </h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-500" />
                  <span className="text-gray-700">Sponsor Licence Support</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-500" />
                  <span className="text-gray-700">Skilled Worker Visas</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-500" />
                  <span className="text-gray-700">Spouse/Partner Visas</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-500" />
                  <span className="text-gray-700">
                    Student Visa Applications
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-500" />
                  <span className="text-gray-700">Business Immigration</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle mr-2 text-green-500" />
                  <span className="text-gray-700">Individual Immigration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What These Terms Cover Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-slate-800 sm:text-4xl">
              What These Terms Cover
            </h2>
            <div className="mx-auto h-1 w-24 bg-blue-600" />
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-lg sm:p-8 lg:p-10">
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    1
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-slate-800">
                      Website Usage
                    </h4>
                    <p className="text-gray-600">
                      Your use of our website a2zimmigrations.co.uk (the
                      "Website")
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                    2
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-slate-800">
                      Service Engagement
                    </h4>
                    <p className="text-gray-600">
                      Engagement of our immigration advice/services (the
                      "Services")
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-6">
              <div className="flex items-start">
                <i className="fas fa-exclamation-triangle mr-3 mt-1 text-xl text-amber-600" />
                <div>
                  <h4 className="mb-2 font-semibold text-amber-900">
                    Important Notice
                  </h4>
                  <p className="text-amber-800">
                    If there's any conflict, a signed Client Care
                    Letter/Engagement Letter and any Fee/Scope appendix will
                    prevail. (IAA requires clear Client Care terms at the start
                    of engagement.)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Starting from Section 1 */}
      <main className="container mx-auto max-w-6xl px-4 py-16">
        {/* Section 1: Not legal advice on the Website */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              1
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Not legal advice on the Website
              </h3>
              <div className="text-gray-700">
                <p>
                  Website content is general information only and not a
                  substitute for tailored advice. Immigration rules change
                  frequently. You should obtain specific advice before acting.
                  We do not accept liability for reliance on Website content or
                  third-party links.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Scope of our Services */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              2
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Scope of our Services
              </h3>
              <div className="text-gray-700">
                <p className="mb-4">
                  The scope, deliverables, timescales, and fees will be set out
                  in your Client Care Letter before work starts.
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-blue-50 p-5">
                    <h4 className="mb-3 flex items-center font-semibold text-slate-800">
                      <i className="fas fa-handshake mr-2 text-blue-600" />
                      We will:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-chevron-right mr-2 mt-1 text-xs text-blue-500" />
                        <span>Act with reasonable skill and care</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-chevron-right mr-2 mt-1 text-xs text-blue-500" />
                        <span>Base advice on the information you supply</span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-chevron-right mr-2 mt-1 text-xs text-blue-500" />
                        <span>Keep you updated on material developments</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-green-50 p-5">
                    <h4 className="mb-3 flex items-center font-semibold text-slate-800">
                      <i className="fas fa-user-check mr-2 text-green-600" />
                      You agree to:
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <i className="fas fa-chevron-right mr-2 mt-1 text-xs text-green-500" />
                        <span>
                          Provide complete, accurate and timely information and
                          documents
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-chevron-right mr-2 mt-1 text-xs text-green-500" />
                        <span>
                          Tell us of any changes relevant to your matter
                        </span>
                      </li>
                      <li className="flex items-start">
                        <i className="fas fa-chevron-right mr-2 mt-1 text-xs text-green-500" />
                        <span>
                          Cooperate in good faith and meet deadlines (Home
                          Office/UKVI or otherwise)
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Fees, disbursements & payments */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              3
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Fees, disbursements & payments
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start">
                  <i className="fas fa-pound-sign mr-3 mt-1 text-blue-600" />
                  <p>
                    <strong>Fees:</strong> fixed fee or hourly, as stated in
                    your Client Care Letter.
                  </p>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-receipt mr-3 mt-1 text-blue-600" />
                  <p>
                    <strong>Disbursements</strong> (e.g., Home Office fees, IHS,
                    translation, courier) are your responsibility and usually
                    non-refundable.
                  </p>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-file-invoice mr-3 mt-1 text-blue-600" />
                  <p>
                    <strong>Invoices:</strong> payable on receipt (or as
                    stated). We may pause work for overdue sums.
                  </p>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-undo mr-3 mt-1 text-blue-600" />
                  <p>
                    <strong>Refunds:</strong> If you end the Services after
                    instruction but before completion, we'll refund any unearned
                    part of fixed fees (less reasonable time/costs incurred).
                    Government fees are non-refundable once paid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: No guarantee of outcome */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              4
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                No guarantee of outcome
              </h3>
              <div className="rounded border-l-4 border-red-500 bg-red-50 p-4">
                <p className="text-gray-700">
                  We cannot guarantee the outcome of any application or
                  processing times. Decisions are made by the Home Office/UKVI
                  and other authorities at their discretion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Compliance, KYC/AML & conflicts */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              5
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Compliance, KYC/AML & conflicts
              </h3>
              <div className="text-gray-700">
                <p>
                  We may conduct identity checks, source-of-funds checks, and
                  conflict checks. We may decline or cease acting if regulatory
                  or ethical issues arise (e.g., conflict of interest,
                  misrepresentation, or unlawful instructions).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Your documents & records */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              6
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Your documents & records
              </h3>
              <div className="text-gray-700">
                <p>
                  We may retain working copies and correspondence. The original
                  documents you supply remain yours and will be returned upon
                  request (subject to regulatory holds). We keep files for a
                  minimum period consistent with IAA/insurer requirements, after
                  which we may securely destroy them. (Your retention schedule
                  appears in our Privacy Policy.)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Confidentiality & data protection */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              7
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Confidentiality & data protection
              </h3>
              <div className="text-gray-700">
                <p>
                  We keep your information confidential, subject to
                  legal/regulatory disclosures (e.g., to IAA, auditors,
                  insurers). Personal data is handled per our Privacy Policy
                  (see below) and UK GDPR/Data Protection Act 2018.
                </p>
                <div className="mt-3 inline-flex items-center text-blue-600">
                  <i className="fas fa-lock mr-2" />
                  <span className="font-semibold">GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Communications & e-signatures */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              8
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Communications & e-signatures
              </h3>
              <div className="text-gray-700">
                <p>
                  We commonly use email and secure portals. You accept the
                  security and timing risks of electronic communications. You
                  consent to e-signatures, which have the same effect as wet
                  ink.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Website use & IP */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              9
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Website use & IP
              </h3>
              <div className="text-gray-700">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-circle mr-3 mt-2 text-xs text-blue-600" />
                    <span>
                      We own or license all Website content (text, graphics,
                      logos, software) and grant you a revocable, non-exclusive
                      licence to access for personal, non-commercial use.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle mr-3 mt-2 text-xs text-blue-600" />
                    <span>
                      You must not copy, scrape, mirror, or re-publish content
                      without consent.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-circle mr-3 mt-2 text-xs text-blue-600" />
                    <span>
                      Do not misuse the Website (e.g., introduce malware,
                      attempt unauthorised access). We may suspend or block
                      access if we detect misuse.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Third-party links */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              10
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Third-party links
              </h3>
              <div className="text-gray-700">
                <p>
                  External links are provided for convenience only. We don't
                  control or endorse third-party sites and aren't responsible
                  for their content or policies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Limitation of liability */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              11
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Limitation of liability
              </h3>
              <div className="text-gray-700">
                <p>
                  Nothing limits liability for death/personal injury caused by
                  negligence, fraud, or any liability that cannot be excluded by
                  law. Otherwise, our liability for Services is capped at the
                  fees you paid for the specific matter giving rise to the
                  claim. We're not liable for indirect or consequential loss,
                  loss of profit, or losses caused by third-party
                  decision-makers (e.g., Home Office) or events beyond our
                  reasonable control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 12: Complaints */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              12
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Complaints
              </h3>
              <div className="text-gray-700">
                <p>
                  We aim to resolve concerns promptly. Please write to{" "}
                  <a
                    href="mailto:info@a2zimmigrations.co.uk"
                    className="text-blue-600 hover:underline"
                  >
                    info@a2zimmigrations.co.uk
                  </a>
                  . If unresolved, you may escalate under IAA's complaints
                  process. Details are provided in your Client Care Letter and
                  available from the IAA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 13: Termination */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              13
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Termination
              </h3>
              <div className="text-gray-700">
                <p>
                  Either party may terminate on written notice. You'll be liable
                  for fees/costs incurred up to termination. We may terminate
                  where permitted by professional conduct rules (e.g.,
                  non-payment, loss of instructions, regulatory reasons).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 14: Changes to these terms */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              14
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Changes to these terms
              </h3>
              <div className="text-gray-700">
                <p>
                  We may update these terms for legal or operational reasons.
                  The version posted on the Website at the time of use applies.
                  For Services, the version incorporated into your Client Care
                  Letter applies unless varied in writing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 15: Governing law & jurisdiction */}
        <section className="mb-12 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start">
            <span className="section-number mr-4 text-4xl font-bold sm:mr-6 sm:text-5xl">
              15
            </span>
            <div className="flex-1">
              <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                Governing law & jurisdiction
              </h3>
              <div className="text-gray-700">
                <p>
                  These terms and any dispute are governed by the laws of
                  [England & Wales / Scotland] and subject to the exclusive
                  jurisdiction of the courts of [England & Wales / Scotland].
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center rounded-lg bg-white px-6 py-3 shadow-md">
            <i className="fas fa-calendar-alt mr-4 text-lg text-blue-500"></i>
            <span className="text-sm text-gray-600">
              Last updated: September 14, 2025
            </span>
          </div>
        </div>
      </main>
    </div>
  </>);
}
