import {pageMetadata} from '@/sanity/lib/content';
import PageData from '@/components/CMS/PageData';
export const generateMetadata = () => pageMetadata('privacy-policy');
import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (<> <PageData id="privacy-policy" />
    <div className="bg-gray-50">
      <style>{`
      @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css");
        .hero-gradient {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(147, 51, 234, 0.1) 100%
          );
        }
        .text-bluepaint { color: #7dc0ff; }
        .card-hover { transition: all 0.3s ease; }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1),
                      0 10px 10px -5px rgba(0,0,0,0.04);
        }
        .text-bluestyle { background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); }
      `}</style>

      {/* Hero */}
      <section className="hero-gradient relative mt-16 h-[400px] overflow-hidden md:h-[450px] lg:h-[500px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Privacy and Security"
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
                Privacy <span className="text-bluepaint">Policy</span>
              </h1>
              <div className="mt-6 flex items-center justify-center text-white lg:justify-start">
                <i className="fas fa-shield-alt mr-2 flex-shrink-0" />
                <span className="lg:text-md text-center text-[11px] drop-shadow-md sm:text-base lg:text-left">
                  IAA Regulated • Professional Immigration Services
                </span>
              </div>
            </div>
            {/* Right Side - Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/get-in-touch"
                className="text-bluestyle inline-flex transform items-center justify-center rounded-lg px-6 py-3 font-semibold text-white shadow-lg transition duration-200 hover:scale-105 sm:px-8 sm:py-4"
              >
                <i className="fas fa-envelope mr-3" />
                Contact Us
              </Link>
              <Link
                href="/about-us"
                className="inline-flex transform items-center justify-center rounded-lg bg-white px-6 py-3 font-semibold text-slate-800 shadow-lg transition duration-200 hover:scale-105 hover:bg-gray-100 sm:px-8 sm:py-4"
              >
                <i className="fas fa-info-circle mr-3" />
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Introduction Card */}
          <div className="card-hover mb-8 rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-lg bg-blue-100 p-3">
                <i className="fas fa-user-shield text-2xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
            </div>
            <p className="leading-relaxed text-gray-600">
              This Privacy Policy describes how we collect, use, and protect
              your personal information when you use our immigration services.
              We are committed to protecting your privacy and ensuring the
              security of your personal data in accordance with applicable
              privacy laws and regulations.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="card-hover mb-8 rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-lg bg-green-100 p-3">
                <i className="fas fa-database text-2xl text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Information We Collect
              </h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Personal Information
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle mr-3 mt-1 flex-shrink-0 text-blue-500" />
                    Full name, date of birth, and contact information
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle mr-3 mt-1 flex-shrink-0 text-blue-500" />
                    Passport and visa documents
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle mr-3 mt-1 flex-shrink-0 text-blue-500" />
                    Employment history and educational qualifications
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle mr-3 mt-1 flex-shrink-0 text-blue-500" />
                    Financial information relevant to visa applications
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Technical Information
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle mr-3 mt-1 flex-shrink-0 text-blue-500" />
                    IP address, browser type, and device information
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle mr-3 mt-1 flex-shrink-0 text-blue-500" />
                    Website usage data and cookies
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="card-hover mb-8 rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-lg bg-purple-100 p-3">
                <i className="fas fa-cogs text-2xl text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                How We Use Your Information
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  <i className="fas fa-file-alt mr-2 text-blue-500" />
                  Service Provision
                </h3>
                <p className="text-gray-600">
                  To process visa applications, provide immigration advice, and
                  deliver our professional services to you.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  <i className="fas fa-comments mr-2 text-green-500" />
                  Communication
                </h3>
                <p className="text-gray-600">
                  To communicate with you about your applications, send updates,
                  and respond to your inquiries.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  <i className="fas fa-balance-scale mr-2 text-purple-500" />
                  Legal Compliance
                </h3>
                <p className="text-gray-600">
                  To comply with legal obligations and regulations governing
                  immigration services.
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-800">
                  <i className="fas fa-chart-line mr-2 text-orange-500" />
                  Service Improvement
                </h3>
                <p className="text-gray-600">
                  To analyze and improve our services, website functionality,
                  and user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Data Protection & Security */}
          <div className="card-hover mb-8 rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-lg bg-red-100 p-3">
                <i className="fas fa-shield-alt text-2xl text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Data Protection & Security
              </h2>
            </div>
            <div className="space-y-6">
              <p className="leading-relaxed text-gray-600">
                We implement appropriate technical and organizational measures
                to protect your personal data against unauthorized access,
                alteration, disclosure, or destruction.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <i className="fas fa-lock mb-2 text-3xl text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Encryption</h4>
                  <p className="text-sm text-gray-600">
                    Data encrypted in transit and at rest
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <i className="fas fa-server mb-2 text-3xl text-green-600" />
                  <h4 className="font-semibold text-gray-800">
                    Secure Storage
                  </h4>
                  <p className="text-sm text-gray-600">
                    Protected servers and databases
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4 text-center">
                  <i className="fas fa-user-check mb-2 text-3xl text-purple-600" />
                  <h4 className="font-semibold text-gray-800">
                    Access Control
                  </h4>
                  <p className="text-sm text-gray-600">
                    Limited authorized access only
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="card-hover mb-8 rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-lg bg-yellow-100 p-3">
                <i className="fas fa-hand-holding-heart text-2xl text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Data Subject Rights
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <i className="fas fa-eye mr-3 mt-1 flex-shrink-0 text-blue-500" />
                    Right to access your personal data
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-edit mr-3 mt-1 flex-shrink-0 text-green-500" />
                    Right to rectify inaccurate information
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-trash mr-3 mt-1 flex-shrink-0 text-red-500" />
                    Right to erasure in certain circumstances
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-ban mr-3 mt-1 flex-shrink-0 text-purple-500" />
                    Right to restrict processing
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-800">
                  Additional Rights
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <i className="fas fa-download mr-3 mt-1 flex-shrink-0 text-blue-500" />
                    Right to data portability
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-times-circle mr-3 mt-1 flex-shrink-0 text-orange-500" />
                    Right to object to processing
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-exclamation-triangle mr-3 mt-1 flex-shrink-0 text-yellow-500" />
                    Right to lodge a complaint
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="card-hover mb-8 rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-lg bg-indigo-100 p-3">
                <i className="fas fa-clock text-2xl text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Data Retention
              </h2>
            </div>
            <p className="mb-4 leading-relaxed text-gray-600">
              We retain your personal information only for as long as necessary
              to fulfill the purposes for which it was collected and to comply
              with legal obligations.
            </p>
            <div className="border-l-4 border-blue-400 bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fas fa-info-circle text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-blue-700">
                    <strong>Retention Period:</strong> Client files are
                    typically retained for 7 years after the completion of
                    services, in accordance with professional regulatory
                    requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card-hover rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center">
              <div className="mr-4 rounded-lg bg-blue-100 p-3">
                <i className="fas fa-envelope text-2xl text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <p className="mb-4 text-gray-600">
                  If you have any questions about this Privacy Policy or wish to
                  exercise your rights, please contact us:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <i className="fas fa-envelope mr-3 text-blue-500" />
                    <span className="text-gray-700">
                      info@a2zimmigrations.co.uk
                    </span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone mr-3 text-green-500" />
                    <span className="text-gray-700">+44 7441 398273</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-3 text-red-500" />
                    <span className="text-gray-700">
                      49 Shaw Crescent, Aberdeen AB25 3BT, UK
                    </span>
                  </div>
                </div>
              </div>
              {/* You can add a second column here if needed */}
            </div>
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center rounded-lg bg-white px-6 py-3 shadow-md">
              <i className="fas fa-calendar-alt mr-4 text-lg text-blue-500"></i>
              <span className="text-sm text-gray-600">
                Last updated: September 14, 2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}
