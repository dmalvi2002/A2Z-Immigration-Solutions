"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { submitEnquiryForm } from "@/utils/submitEnquiry";
import React, { useRef, useState, FormEvent, useEffect } from "react";

interface ContactProps {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

const Contact: React.FC<ContactProps> = ({
  serviceId,
  templateId,
  publicKey,
}) => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Fix for rehydration error
  const [hasMounted, setHasMounted] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await submitEnquiryForm(form.current, "Contact page");
      setSubmitStatus({
        success: true,
        message: "Your message has been sent successfully!",
      });
      form.current.reset();
      setIsChecked(false);
    } catch (error) {
      console.error("FAILED...", error);
      setSubmitStatus({
        success: false,
        message: `Failed to send message: ${error instanceof Error ? error.message : "Unexpected error"}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {/* <!-- ===== Contact Start ===== --> */}
      <section id="support" className="px-4 md:px-8 2xl:px-0">
        <div className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] "></div>
          <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
            <Image
              src="./images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="block "
              fill
            />
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8  md:w-3/5 lg:w-3/4 xl:p-15"
            >
              <h2 className="mb-15 bg-gradient-to-l from-sky-800 via-sky-500 to-sky-400 bg-clip-text text-3xl font-bold text-transparent sm:text-3xl md:text-4xl lg:text-5xl  xl:text-sectiontitle2">
                Send a message
              </h2>

              {submitStatus && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-7.5 flex items-center gap-3 rounded-lg p-4 shadow-sm border ${
                    submitStatus.success
                      ? "bg-green-50 text-green-800 border-green-200"
                      : "bg-red-50 text-red-800 border-red-200"
                  }`}
                >
                  {submitStatus.success ? (
                    <svg className="w-5 h-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span className="font-medium">{submitStatus.message}</span>
                </motion.div>
              )}

              <form ref={form} onSubmit={sendEmail} id="contactForm">
                <div className="mb-7.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none  lg:w-1/2"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none  lg:w-1/2"
                  />
                </div>

                <div className="mb-12.5 flex flex-col gap-7.5 lg:flex-row lg:justify-between lg:gap-14">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none  lg:w-1/2"
                  />

                  <input
                    type="tel"
                    name="number"
                    placeholder="+44"
                    pattern="^(\+44|0)[0-9]{10}$"
                    minLength={11}
                    maxLength={13}
                    title="Please enter a valid UK phone number starting with +44 or 0"
                    className="w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none  lg:w-1/2"
                  />
                </div>

                <div className="mb-11.5 flex">
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={4}
                    required
                    className="w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none "
                  ></textarea>
                </div>

                <div className="flex flex-wrap gap-4 xl:justify-between ">
                  <div className="mb-4 flex md:mb-0">
                    <label
                      htmlFor="default-checkbox"
                      className="group flex cursor-pointer select-none items-start gap-3"
                    >
                      <div className="relative mt-1">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          name="consent"
                          checked={isChecked}
                          onChange={(e) => setIsChecked(e.target.checked)}
                          className="h-5 w-5 cursor-pointer rounded border-2 border-gray-300 bg-white shadow-sm transition-all duration-200 checked:border-sky-500 checked:bg-sky-500 checked:shadow-lg checked:shadow-sky-200 hover:border-sky-400 hover:shadow-md focus:ring-2 focus:ring-sky-300 focus:ring-offset-1"
                          required
                        />
                      </div>
                      <span className="text-gray-700 transition-colors duration-200 group-hover:text-sky-600">
                        By clicking Checkbox, you agree to use our "Form" terms
                        And consent cookie usage in browser.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    aria-label="send message"
                    className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-l from-sky-700 via-sky-500 to-sky-400 px-6 py-3 font-medium text-white transition-all duration-300 ease-in-out hover:from-sky-800 hover:via-sky-600 hover:to-sky-500 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <svg
                      className="fill-white transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                        fill=""
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },

                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
            >
              <h2 className="mb-12.5 bg-gradient-to-l from-sky-700 via-sky-500 to-sky-400 bg-clip-text text-3xl font-bold text-transparent sm:text-3xl  md:text-4xl lg:text-5xl  xl:text-sectiontitle2">
                Find us
              </h2>

              <div className="5 mb-7">
                <h3 className="mb-4 text-metatitle3 font-medium text-black ">
                  Email Address
                </h3>
                <p>
                  <a href="mailto:info@a2zimmigrations.co.uk">
                    info@a2zimmigrations.co.uk
                  </a>
                </p>
              </div>
              <div>
                <h4 className="mb-4 text-metatitle3 font-medium text-black">
                  Phone Number
                </h4>
                <p>
                  <a href="tel:+447441398273">+44 7441398273</a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* <!-- ===== Contact End ===== --> */}
    </>
  );
};

export default Contact;
