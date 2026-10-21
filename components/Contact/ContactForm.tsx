"use client";

// components/ContactForm.tsx
import React, { useRef, FormEvent, useState } from "react";
import { submitEnquiryForm } from "@/utils/submitEnquiry";

interface ContactFormProps {
  serviceId: string;
  templateId: string;
  publicKey: string;
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  serviceId,
  templateId,
  publicKey,
  className = "",
}) => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    submitEnquiryForm(form.current, "Contact form")
      .then(
        () => {
          console.log("SUCCESS!");
          setSubmitStatus({
            success: true,
            message: "Your message has been sent successfully!",
          });
          if (form.current) form.current.reset();
        },
        (error) => {
          setSubmitStatus({
            success: false,
            message: error.message || "Unable to send your message. Please try again.",
          });
        },
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={className}>
      <form ref={form} onSubmit={sendEmail} className="space-y-4">
        <div>
          <label htmlFor="user_name" className="mb-1 block">
            Name
          </label>
          <input
            type="text"
            name="user_name"
            id="user_name"
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="user_email" className="mb-1 block">
            Email
          </label>
          <input
            type="email"
            name="user_email"
            id="user_email"
            className="w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-1 block">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            className="h-32 w-full rounded-md border px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>

        {submitStatus && (
          <div
            className={`mt-4 rounded-md p-3 ${submitStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {submitStatus.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
