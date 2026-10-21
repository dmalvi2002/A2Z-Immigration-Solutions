"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { submitEnquiry } from "@/utils/submitEnquiry";

interface FormData {
  name: string;
  email: string;
  number: string;
  message: string;
}

const BookCallSidebar: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitEnquiry({ ...formData, source: "Book a call" });
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        number: "",
        message: "",
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Failed to send email:", err);
      setIsSubmitting(false);
      setError("Failed to send message. Please try again later.");

      // Hide error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md rounded-xl bg-gradient-to-b from-[#06A2D9] via-[#0698cd] to-[#148fbc] px-6 py-6 text-white shadow-lg"
    >
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-1 text-center text-2xl font-bold"
        style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.1)" }}
      >
        Book a call
      </motion.h2>
      <motion.p
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4 text-center text-sm"
      >
        Please give us more information to get started.
      </motion.p>
      <motion.form
        onSubmit={handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-4" variants={itemVariants}>
          <label
            htmlFor="name"
            className="mb-1 block text-base font-medium"
            style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.6)" }}
          >
            Name:
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-xl  px-3 py-2 text-gray-700 placeholder-gray-400 transition-all duration-200 focus:border-sky-500 focus:outline-none"
            required
          />
        </motion.div>

        <motion.div className="mb-4" variants={itemVariants}>
          <label
            htmlFor="email"
            className="mb-1 block text-base font-medium"
            style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.6)" }}
          >
            Email:
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
            className="w-full rounded-xl px-3 py-2 text-gray-700 placeholder-gray-400 transition-all duration-200 focus:border-sky-500 focus:outline-none"
            required
          />
        </motion.div>

        <motion.div className="mb-4" variants={itemVariants}>
          <label
            htmlFor="number"
            className="mb-1 block text-base font-medium"
            style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.6)" }}
          >
            Phone:
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            type="tel"
            id="number"
            name="number"
            placeholder="+44"
            value={formData.number}
            onChange={handleChange}
            pattern="^\+?[1-9][0-9]{10,12}$"
            title="Please enter a valid phone number (11-13 digits)"
            minLength={11}
            maxLength={13}
            className="w-full rounded-xl px-3 py-2 text-gray-700 placeholder-gray-400 transition-all duration-200 focus:border-sky-500 focus:outline-none"
            required
          />
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <label
            htmlFor="message"
            className="mb-1 block text-base font-medium"
            style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.6)" }}
          >
            Message:
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            id="message"
            name="message"
            rows={4}
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full rounded-xl  px-3 py-2 text-gray-700 placeholder-gray-400 transition-all duration-200 focus:border-sky-500 focus:outline-none"
            required
          />
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 rounded-lg bg-red-500/20 py-2 text-center text-sm font-medium text-red-200"
          >
            {error}
          </motion.div>
        )}

        <motion.div className="flex justify-center">
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isSubmitting}
            className="flex max-w-80 items-center justify-center rounded-lg bg-yellow-400 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
            style={{ boxShadow: "0 0 8px 2px rgba(255, 255, 0, 0.2)" }}
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-5 w-5 rounded-full border-2 border-gray-800 border-t-transparent"
              />
            ) : isSuccess ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center"
              >
                <span className="mr-2">Sent</span>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    d="M3 9.5L7 13.5L15 5.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            ) : (
              <motion.span className="flex items-center">
                <span className="mr-2 text-lg">Send Message</span>
                <motion.div
                  style={{ marginTop: "2px", marginLeft: "-2px" }}
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  <Send size={16} />
                </motion.div>
              </motion.span>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
      <motion.p
        initial={{ y: -5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4 mt-8 text-center text-base"
      >
        Feel free to share your opinion with us.
      </motion.p>
    </motion.div>
  );
};

export default BookCallSidebar;
