// app/(site)/offers/page.tsx
"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import { submitEnquiryForm } from "@/utils/submitEnquiry";

type SubmitStatus =
  | { success: true; message: string }
  | { success: false; message: string }
  | null;

export default function OffersPage() {
  // Enquiry form state
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page refresh

    if (!formRef.current) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    submitEnquiryForm(formRef.current, "Offers page")
      .then(() => {
        setSubmitStatus({
          success: true,
          message: "Your message has been sent successfully.",
        });
        formRef.current?.reset();
        // Scroll message into view for better UX
        document.getElementById("formStatusBox")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      })
      .catch(() => {
        setSubmitStatus({
          success: false,
          message: "Error sending the message, kindly message us on WhatsApp.",
        });
        document.getElementById("formStatusBox")?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  // === Page animations / behaviors (existing) ===
  useEffect(() => {
    // Smooth scrolling for anchor links
    const anchors = Array.from(
      document.querySelectorAll('a[href^="#"]'),
    ) as HTMLAnchorElement[];
    const onAnchor = (e: Event) => {
      e.preventDefault();
      const el = e.currentTarget as HTMLAnchorElement;
      const target = document.querySelector(el.getAttribute("href") || "");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    anchors.forEach((a) => a.addEventListener("click", onAnchor));

    // Intersection Observer for animations
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("fade-in");
      });
    }, observerOptions);

    const animTargets = document.querySelectorAll(
      ".pricing-card, .feature-card, .stat-item",
    );
    animTargets.forEach((el) => io.observe(el));

    // Counter animation for stats
    const animateCounter = (
      element: HTMLElement,
      target: number,
      duration = 2000,
    ) => {
      let start = 0;
      const increment = target / (duration / 16);
      const step = () => {
        start += increment;
        if (start < target) {
          element.textContent =
            Math.floor(start) + (element.dataset.suffix || "");
          requestAnimationFrame(step);
        } else {
          element.textContent = target + (element.dataset.suffix || "");
        }
      };
      step();
    };

    const animate247 = (element: HTMLElement, duration = 2000) => {
      let start = 0;
      const increment = 24 / (duration / 16);
      const step = () => {
        start += increment;
        if (start < 24) {
          element.textContent = Math.floor(start) + "/7";
          requestAnimationFrame(step);
        } else {
          element.textContent = "24/7";
        }
      };
      step();
    };

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector(
              ".stat-number",
            ) as HTMLElement | null;
            if (numberElement) {
              const text = numberElement.textContent || "";
              if (text === "24/7") {
                animate247(numberElement);
              } else {
                const number = parseInt(text.replace(/\D/g, ""), 10);
                const suffix = text.replace(/\d/g, "");
                if (!isNaN(number)) {
                  numberElement.dataset.suffix = suffix;
                  animateCounter(numberElement, number);
                }
              }
            }
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    document
      .querySelectorAll(".stat-item")
      .forEach((item) => statsObserver.observe(item));

    // Add floating animation to WhatsApp button
    const pulseInterval = setInterval(() => {
      const whatsappBtn = document.querySelector(
        ".whatsapp-float",
      ) as HTMLElement | null;
      if (whatsappBtn) {
        whatsappBtn.style.animation = "none";
        setTimeout(() => {
          whatsappBtn.style.animation = "pulse-ring 2s infinite";
        }, 100);
      }
    }, 5000);

    // Hover z-index tweak for pricing cards
    const cards = Array.from(
      document.querySelectorAll(".pricing-card"),
    ) as HTMLElement[];
    const onEnter = function (this: HTMLElement) {
      this.style.zIndex = "10";
    };
    const onLeave = function (this: HTMLElement) {
      this.style.zIndex = "1";
    };
    cards.forEach((c) => {
      c.addEventListener("mouseenter", onEnter);
      c.addEventListener("mouseleave", onLeave);
    });

    return () => {
      anchors.forEach((a) => a.removeEventListener("click", onAnchor));
      animTargets.forEach((el) => io.unobserve(el));
      document
        .querySelectorAll(".stat-item")
        .forEach((item) => statsObserver.unobserve(item));
      clearInterval(pulseInterval);
      cards.forEach((c) => {
        c.removeEventListener("mouseenter", onEnter as any);
        c.removeEventListener("mouseleave", onLeave as any);
      });
    };
  }, []);

  // === 2-Day rolling countdown (highlight-banner only) ===
  useEffect(() => {
    const STORAGE_KEY = "a2z_highlight_offer_deadline";
    const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");

    if (!daysEl || !hoursEl || !minutesEl) return;

    const now = () => new Date().getTime();

    const getOrCreateDeadline = (): number => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const asNum = raw ? parseInt(raw, 10) : NaN;

        if (!raw || Number.isNaN(asNum) || asNum <= now()) {
          // remove old value and set a fresh 2-day window from NOW
          localStorage.removeItem(STORAGE_KEY);
          const newDeadline = now() + TWO_DAYS_MS;
          localStorage.setItem(STORAGE_KEY, String(newDeadline));
          return newDeadline;
        }
        return asNum;
      } catch {
        // Fallback: no storage available
        return now() + TWO_DAYS_MS;
      }
    };

    let deadline = getOrCreateDeadline();

    const render = () => {
      let remaining = deadline - now();

      // If finished, reset for another 2 days (rolling window)
      if (remaining <= 0) {
        try {
          localStorage.removeItem(STORAGE_KEY);
          deadline = now() + TWO_DAYS_MS;
          localStorage.setItem(STORAGE_KEY, String(deadline));
        } catch {
          deadline = now() + TWO_DAYS_MS;
        }
        remaining = deadline - now();
      }

      const DAY = 24 * 60 * 60 * 1000;
      const HOUR = 60 * 60 * 1000;
      const MIN = 60 * 1000;

      const d = Math.floor(remaining / DAY);
      const h = Math.floor((remaining % DAY) / HOUR);
      const m = Math.floor((remaining % HOUR) / MIN);

      // Keep original structure/classes; just update text
      daysEl.textContent = String(d);
      hoursEl.textContent = String(h);
      minutesEl.textContent = String(m);
    };

    // Initial paint ASAP
    render();

    // Update every second (smooth; minutes display will step when needed)
    const interval = setInterval(render, 1000);

    // Also refresh when tab becomes visible again
    const onVis = () => {
      if (document.visibilityState === "visible") render();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      {/* --- Hero Section with Trust Signals --- */}
      <div className="offers-scope">
        <div className="offers-hero">
          <div className="container">
            <div className="header-contents">
              {/* Professional Trust Badges */}
              <div className="trust-badges">
                <div className="trust-badge-item">
                  <div className="badge-icon-wrapper">
                    <img
                      src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945401/home-office-logo-white_fuqriv.png"
                      alt="UK Government Authorized"
                      className="trust-badge"
                    />
                  </div>
                  <span className="trust-badge-label">
                    Government Authorized
                  </span>
                </div>
                <div className="trust-badge-item">
                  <div className="badge-icon-wrapper">
                    <img
                      src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945402/iaa_govt_fzouvk.png"
                      alt="OISC Regulated"
                      className="trust-badge"
                    />
                  </div>
                  <span className="trust-badge-label">
                    OISC Member F202100303
                  </span>
                </div>
                <div className="trust-badge-item">
                  <div className="badge-icon-wrapper">
                    <img
                      src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1755965258/Add_a_heading_rugrhy.png"
                      alt="Law Society Member"
                      className="trust-badge"
                    />
                  </div>
                  <span className="trust-badge-label">Rated 5/5 stars!</span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="hero-heading">
                <h1>🎯 Aberdeen&apos;s Most Trusted Immigration Experts</h1>
              </div>

              {/* Professional Tagline */}
              <div className="hero-tagline">
                <p>
                  Save 50% on Professional Immigration Services | 200+ Success
                  Stories | Money-Back Guarantee
                </p>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="hero-stats">
                <div className="hero-stat">
                  <strong>99%</strong>
                  <span>Success Rate</span>
                </div>
                <div className="hero-stat">
                  <strong>200+</strong>
                  <span>Happy Clients</span>
                </div>
                <div className="hero-stat">
                  <strong>15+</strong>
                  <span>Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Urgency Banner --- */}
        <div className="container">
          <div className="highlight-banner">
            <div className="highlight-banner-content">
              <h2>⏰ Limited Time Offer - Ends Soon!</h2>
              <p>
                ✅ Save 50% on ALL Services | 🎯 FREE Consultation Worth £150 |
                ⚡ 24-Hour Response Guarantee
              </p>
              <div className="countdown-timer">
                <div className="timer-item">
                  <span className="timer-number" id="days">
                    29
                  </span>
                  <span className="timer-label">Days</span>
                </div>
                <div className="timer-item">
                  <span className="timer-number" id="hours">
                    23
                  </span>
                  <span className="timer-label">Hours</span>
                </div>
                <div className="timer-item">
                  <span className="timer-number" id="minutes">
                    59
                  </span>
                  <span className="timer-label">Minutes</span>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <div className="whatsapp-action">
                <a
                  href="https://wa.me/447441398273?text=Hi! I'm interested in the 50% discount offer. Can you help me?"
                  className="whatsapp-btn"
                  target="_blank"
                >
                  <div className="whatsapp-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
                    </svg>
                  </div>
                  <span className="whatsapp-text">
                    Hurry up to get the amazing offer!
                  </span>
                  <div className="whatsapp-pulse"></div>
                </a>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <section className="pricing-section">
            <h2 className="section-title">💰 Our Special Offer Prices</h2>
            <div className="pricing-grid">
              {/* Sponsor Licence */}
              <div className="pricing-card fade-in">
                <div className="card-header">
                  <div className="card-icon">🏢</div>
                  <h3>Sponsor Licence Application</h3>
                  <div className="savings-badge">Save £1,000</div>
                  <div className="price">
                    £1,000<span className="original-price">£2,000</span>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="features">
                    <li>
                      <i className="fas fa-check-circle"></i> Eligibility check
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Docs & templates
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Application
                      drafted + submitted
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Mock audit
                      preparation
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Professional
                      guidance
                    </li>
                  </ul>
                </div>
                <div className="card-footer">
                  <a href="#contact" className="btn-primary">
                    Get Started Today
                  </a>
                </div>
              </div>

              {/* Skilled Worker Visa */}
              <div className="pricing-card fade-in">
                <div className="card-header">
                  <div className="card-icon">👨‍💼</div>
                  <h3>Skilled Worker Visa Application</h3>
                  <div className="savings-badge">Save £800</div>
                  <div className="price">
                    £800<span className="original-price">£1,600</span>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="features">
                    <li>
                      <i className="fas fa-check-circle"></i> Role & points
                      check (RQF 6+)
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Forms + cover
                      letters
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Home Office
                      enquiries handled
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Interview
                      preparation
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Submission support
                    </li>
                  </ul>
                </div>
                <div className="card-footer">
                  <a href="#contact" className="btn-primary">
                    Apply Now
                  </a>
                </div>
              </div>

              {/* ILR Application */}
              <div className="pricing-card fade-in">
                <div className="card-header">
                  <div className="card-icon">🏠</div>
                  <h3>ILR (Indefinite Leave to Remain)</h3>
                  <div className="savings-badge">Save £650</div>
                  <div className="price">
                    £650<span className="original-price">£1,300</span>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="features">
                    <li>
                      <i className="fas fa-check-circle"></i> Route check
                      (5-year / 10-year)
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Absence & lawful
                      stay audit
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Life in the UK /
                      English guidance
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Application &
                      document pack
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Professional
                      guidance
                    </li>
                  </ul>
                </div>
                <div className="card-footer">
                  <a href="#contact" className="btn-primary">
                    Start Application
                  </a>
                </div>
              </div>

              {/* Spouse Visa */}
              <div className="pricing-card fade-in">
                <div className="card-header">
                  <div className="card-icon">💑</div>
                  <h3>Spouse/PartnerVisa (FM)</h3>
                  <div className="savings-badge">Save £650</div>
                  <div className="price">
                    £650<span className="original-price">£1,300</span>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="features">
                    <li>
                      <i className="fas fa-check-circle"></i> Relationship
                      evidence pack
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Financial
                      requirement (Appendix FM) calculation
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Accommodation
                      checks
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Forms & cover
                      letter
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Professional
                      guidance
                    </li>
                  </ul>
                </div>
                <div className="card-footer">
                  <a href="#contact" className="btn-primary">
                    Begin Process
                  </a>
                </div>
              </div>

              {/* Naturalisation */}
              <div className="pricing-card fade-in">
                <div className="card-header">
                  <div className="card-icon">📕</div>
                  <h3>Naturalisation + Passport</h3>
                  <div className="savings-badge">Save £500</div>
                  <div className="price">
                    £500<span className="original-price">£1,000</span>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="features">
                    <li>
                      <i className="fas fa-check-circle"></i> Eligibility &
                      residence check
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Absence/travel
                      audit
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Life in the UK /
                      English guidance
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Application,
                      referees & ceremony steps
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Professional
                      guidance
                    </li>
                  </ul>
                </div>
                <div className="card-footer">
                  <a href="#contact" className="btn-primary">
                    Become British Citizen
                  </a>
                </div>
              </div>

              {/* Visit Visa */}
              <div className="pricing-card fade-in">
                <div className="card-header">
                  <div className="card-icon">✈️</div>
                  <h3>Visit Visa Application</h3>
                  <div className="price">
                    £600<span className="original-price">£1200</span>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="features">
                    <li>
                      <i className="fas fa-check-circle"></i> Eligibility &
                      purpose mapping
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Invite/itinerary &
                      cover letter
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Docs checklist &
                      review
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Submission support
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Professional
                      guidance
                    </li>
                  </ul>
                </div>
                <div className="card-footer">
                  <a href="#contact" className="btn-primary">
                    Plan Your Visit
                  </a>
                </div>
              </div>

              {/* Student Visa */}
              <div className="pricing-card fade-in">
                <div className="card-header">
                  <div className="card-icon">🎓</div>
                  <h3>Student Visa Application</h3>
                  <div className="price">
                    £500<span className="original-price">£1,000</span>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="features">
                    <li>
                      <i className="fas fa-check-circle"></i> CAS & course check
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Financials
                      (maintenance) review
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Forms + SOP
                      guidance
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Submission &
                      priority options
                    </li>
                    <li>
                      <i className="fas fa-check-circle"></i> Professional
                      guidance
                    </li>
                  </ul>
                </div>
                <div className="card-footer">
                  <a href="#contact" className="btn-primary">
                    Start Your Journey
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="social-proof-section">
            <h2 className="section-title">👥 What Our Clients Say</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <img
                  src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945399/client-photo-1_n7dy7n.jpg"
                  alt="Sarah Ahmed"
                  className="client-photo"
                />
                <div className="testimonial-content">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <p>
                    "A huge thank you to Fiyadh and his team for expertly
                    guiding us through the process of maintaining our Sponsor
                    Licence."
                  </p>
                  <div className="client-info">
                    <strong>MD Ashiqur Rahman</strong>
                    <span>Sponsor Licence Approved</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <img
                  src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945400/client-photo-2_bishn0.png"
                  alt="Raj Patel"
                  className="client-photo"
                />
                <div className="testimonial-content">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <p>
                    "I had a super experience throughout the journey. My wife
                    and I always got great help and cooperation from the team.
                    Everyone is very helpful."
                  </p>
                  <div className="client-info">
                    <strong>Mohammed Afzal</strong>
                    <span>Spouse Visa Approved</span>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <img
                  src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945401/client-photo-3_vgfbu5.png"
                  alt="Maria Garcia"
                  className="client-photo"
                />
                <div className="testimonial-content">
                  <div className="stars">⭐⭐⭐⭐⭐</div>
                  <p>
                    "Had a great experience! Big thanks for all the support with
                    my visa. The team’s really helpful. Would definitely
                    recommend if you need help with visa stuff!"
                  </p>
                  <div className="client-info">
                    <strong>Tanafz</strong>
                    <span>Student Visa Approved</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="google-reviews">
              <a
                target="_blank"
                href="https://www.google.com/search?q=a2z+immigrations+uk&rlz=1C1GCEB_enBD1155BD1155&oq=a2z+immigrations+uk&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDzSAQg1MTQyajBqOagCBrACAfEFcIlwEVprSgI&sourceid=chrome&ie=UTF-8#lrd=0x48841199bf824d51:0x25fb4b10baf319db,1,,,,"
              >
                <img
                  src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945401/google-reviews-badge_qccjai.png"
                  alt="Google Reviews 5.0 stars"
                  className="reviews-badge"
                />
              </a>
              <p>Rated 5/5 stars on Google Reviews from 10+ verified clients</p>
            </div>
          </section>

          {/* Process Section */}
          <section className="process-section">
            <h2 className="section-title">📋 Our Simple 4-Step Process</h2>
            <div className="process-steps">
              <div className="process-step">
                <div className="step-number">1</div>
                <img
                  src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945404/consultation-icon_xvhxoj.jpg"
                  alt="Free Consultation"
                  className="step-image"
                />
                <h3>Free Consultation</h3>
                <p>
                  Book your FREE consultation call. We&apos;ll assess your case
                  and provide honest advice on your chances.
                </p>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <img
                  src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945425/document-preparation_gjnsm4.jpg"
                  alt="Document Preparation"
                  className="step-image"
                />
                <h3>Document Preparation</h3>
                <p>
                  Our experts prepare all required documents and forms with 100%
                  accuracy to maximize approval chances.
                </p>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <img
                  src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945400/application-submission_lf8zjj.jpg"
                  alt="Application Submission"
                  className="step-image"
                />
                <h3>Application Submission</h3>
                <p>
                  We submit your application and handle all communication with
                  the Home Office on your behalf.
                </p>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <img
                  src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945400/approval-celebration_wnkbhb.avif"
                  alt="Get Approval"
                  className="step-image"
                />
                <h3>Get Approval</h3>
                <p>
                  Celebrate your success! We&apos;ll guide you through next
                  steps and provide ongoing support if needed.
                </p>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <div className="stats-content">
              <div className="professional-badge">
                <i className="fas fa-award"></i>
                <span>Industry Leading Immigration Specialists</span>
              </div>
              <h2 className="section-title">Why Choose A2Z Immigration?</h2>
              <p className="stats-subtitle">
                Trusted by thousands of clients worldwide for exceptional
                immigration services
              </p>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Successful Applications</div>
                  <div className="stat-description">
                    Across all visa categories
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50%</div>
                  <div className="stat-label">Cost Savings</div>
                  <div className="stat-description">
                    Compared to competitors
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99%</div>
                  <div className="stat-label">Success Rate</div>
                  <div className="stat-description">
                    Industry leading approval rate
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Expert Support</div>
                  <div className="stat-description">
                    Round-the-clock assistance
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Guarantees Section */}
          <section className="guarantees-section">
            <div className="container">
              <div className="guarantees-header">
                <h2 className="section-title">🛡️ Our Iron-Clad Guarantees</h2>
                <p className="section-subtitle">
                  Your success is our commitment. We stand behind every promise
                  with concrete guarantees.
                </p>
              </div>
              <div className="guarantees-grid">
                <div className="guarantee-card">
                  <div className="guarantee-image-wrapper">
                    <img
                      src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945403/money-back-gurantee_dqdpqk.webp"
                      alt="Money Back Guarantee"
                      className="guarantee-image"
                    />
                  </div>
                  <div className="guarantee-content">
                    <h3>100% Money-Back Guarantee</h3>
                    <p>
                      If we can&apos;t help you achieve your immigration goals,
                      we&apos;ll refund every penny. No questions asked.
                    </p>
                  </div>
                </div>
                <div className="guarantee-card">
                  <div className="guarantee-image-wrapper">
                    <img
                      src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945402/24-hour-response_havhxd.avif"
                      alt="24 Hour Response"
                      className="guarantee-image"
                    />
                  </div>
                  <div className="guarantee-content">
                    <h3>24-Hour Response Promise</h3>
                    <p>
                      Get answers to your questions within 24 hours, guaranteed.
                      Emergency support available 24/7.
                    </p>
                  </div>
                </div>
                <div className="guarantee-card">
                  <div className="guarantee-image-wrapper">
                    <img
                      src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945404/no-hidden-fees_vrmeqd.jpg"
                      alt="No Hidden Fees"
                      className="guarantee-image"
                    />
                  </div>
                  <div className="guarantee-content">
                    <h3>No Hidden Fees</h3>
                    <p>
                      What you see is what you pay. No surprise charges, no
                      additional costs. Complete transparency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section">
            <h2 className="section-title">🌟 Why We&apos;re Different</h2>
            <div className="feature-cards">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-award"></i>
                </div>
                <div className="feature-content">
                  <h3>Expert Legal Team</h3>
                  <p>
                    Our qualified immigration lawyers have over 15 years of
                    combined experience handling complex cases. We stay updated
                    with the latest UK immigration laws and provide personalized
                    legal advice for every client situation.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <div className="feature-content">
                  <h3>Lightning-Fast Processing</h3>
                  <p>
                    We understand time is crucial for immigration matters. Our
                    streamlined process and dedicated case managers ensure your
                    applications are prepared and submitted quickly without
                    compromising on quality or accuracy.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="feature-content">
                  <h3>Satisfaction Guaranteed</h3>
                  <p>
                    With our 99% success rate and money-back guarantee, you can
                    trust us with your immigration journey. We thoroughly review
                    every case and only proceed when we&apos;re confident of a
                    positive outcome.
                  </p>
                </div>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <div className="feature-content">
                  <h3>24/7 Personal Support</h3>
                  <p>
                    Immigration doesn&apos;t wait for business hours. Our
                    dedicated support team is available round-the-clock to
                    answer your questions, provide updates, and guide you
                    through every step of the process.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Urgency Section Before Contact */}
          <section className="urgency-section">
            <div className="urgency-content">
              <img
                src="https://res.cloudinary.com/dvvcwzp4n/image/upload/v1754945410/urgent-immigration_nep3fe.png"
                alt="Time Sensitive Immigration"
                className="urgency-image"
              />
              <div className="urgency-text">
                <h2>
                  ⚠️ Don&apos;t Wait - Immigration Rules Change Frequently
                </h2>
                <p>
                  UK immigration policies can change with little notice.
                  What&apos;s possible today might not be tomorrow. Our current
                  50% discount ends in:
                </p>
                <div className="urgency-benefits">
                  <div className="urgency-benefit">
                    ✅ Prices locked in for 30 days after consultation
                  </div>
                  <div className="urgency-benefit">
                    ✅ FREE case assessment (normally £150)
                  </div>
                  <div className="urgency-benefit">
                    ✅ Priority booking available
                  </div>
                </div>
                <a href="#contact" className="cta-button-large">
                  Request a Callback Now!
                </a>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact-section">
            <div className="contact-container">
              <div className="contact-header">
                <h2>Get Your Free Consultation</h2>
                <p>
                  Our immigration experts are ready to help you achieve your UK
                  immigration goals
                </p>
              </div>

              <div className="contact-grid">
                {/* Contact Form Card */}
                <div className="contact-form-card">
                  <h3>
                    <i className="fas fa-edit"></i>Send us a Message
                  </h3>

                  {/* === FORM (fields + names mirror get-in-touch) === */}
                  <form
                    ref={formRef}
                    onSubmit={sendEmail}
                    className="contact-form"
                    id="contactForm"
                    noValidate
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">
                          <i className="fas fa-user"></i>Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">
                          <i className="fas fa-envelope"></i>Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">
                          <i className="fas fa-phone"></i>Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="number"
                          required
                          placeholder="+44 7123 456789"
                          pattern="^(\+44|0)[0-9]{10}$"
                          minLength={11}
                          maxLength={13}
                          title="Please enter a valid UK phone number starting with +44 or 0"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="subject">
                          <i className="fas fa-tag"></i>Subject *
                        </label>
                        <select id="subject" name="subject" required>
                          <option value="">Select a service</option>
                          <option value="sponsor-licence">
                            Sponsor Licence Application - £1,000
                          </option>
                          <option value="skilled-worker">
                            Skilled Worker Visa - £800
                          </option>
                          <option value="ilr">ILR Application - £650</option>
                          <option value="spouse-visa">
                            Spouse Visa/Extension - £650
                          </option>
                          <option value="naturalisation">
                            Naturalisation + Passport - £500
                          </option>
                          <option value="visit-visa">Visit Visa - £350</option>
                          <option value="student-visa">
                            Student Visa - £500
                          </option>
                          <option value="consultation">
                            General Consultation
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">
                        <i className="fas fa-comment-alt"></i>Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Please tell us about your immigration needs and any specific questions you have..."
                        required
                      />
                    </div>

                    <div className="form-group" style={{ marginTop: 8 }}>
                      <label
                        htmlFor="consent"
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          cursor: "pointer",
                        }}
                      >
                        <input
                          id="consent"
                          name="consent"
                          type="checkbox"
                          required
                          style={{
                            width: 18,
                            height: 18,
                            marginTop: 4,
                            accentColor: "#0ea5e9",
                          }}
                          aria-required="true"
                        />
                        <span>
                          By clicking Checkbox, you agree to use our
                          &quot;Form&quot; terms and consent cookie usage in
                          browser.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn-callback"
                      disabled={isSubmitting}
                    >
                      <i className="fas fa-paper-plane"></i>{" "}
                      {isSubmitting ? "Sending..." : "Request a Callback"}
                    </button>
                  </form>

                  {/* === Inline status box (below the form) === */}
                  <div
                    id="formStatusBox"
                    aria-live="polite"
                    role="status"
                    style={{ marginTop: 12 }}
                  >
                    {submitStatus && submitStatus.success && (
                      <div
                        style={{
                          backgroundColor: "#ecfdf5",
                          color: "#065f46",
                          border: "1px solid #a7f3d0",
                          borderLeft: "6px solid #34d399",
                          padding: "12px 16px",
                          borderRadius: 8,
                          fontWeight: 500,
                        }}
                      >
                        ✅ {submitStatus.message}
                      </div>
                    )}
                    {submitStatus && submitStatus.success === false && (
                      <div
                        style={{
                          backgroundColor: "#fee2e2",
                          color: "#991b1b",
                          border: "1px solid #fecaca",
                          borderLeft: "6px solid #f87171",
                          padding: "12px 16px",
                          borderRadius: 8,
                          fontWeight: 500,
                        }}
                      >
                        ❌ {submitStatus.message}{" "}
                        <a
                          href="https://wa.me/447441398273"
                          target="_blank"
                          style={{
                            textDecoration: "underline",
                          }}
                        >
                          WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Info Card */}
                <div className="contact-info-card">
                  <h3>
                    <i className="fas fa-address-book"></i>Contact Information
                  </h3>
                  <div className="contact-methods">
                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="fas fa-phone"></i>
                      </div>
                      <div className="contact-details">
                        <strong>Phone</strong>
                        <span>+44 7441 398273</span>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="fas fa-envelope"></i>
                      </div>
                      <div className="contact-details">
                        <strong>Email</strong>
                        <span>info@a2zimmigrations.co.uk</span>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="contact-details">
                        <strong>Office Address</strong>
                        <span>49 Shaw Crescent, Aberdeen AB25 3BT, UK</span>
                      </div>
                    </div>

                    <div className="contact-item">
                      <div className="contact-icon">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div className="contact-details">
                        <strong>Business Hours</strong>
                        <span>
                          Mon-Fri: 9:00 – 17:00
                          <br />
                          24/7 Emergency Support
                        </span>
                      </div>
                    </div>

                    <a
                      href="https://wa.me/447441398273"
                      className="whatsapp-btn"
                      target="_blank"
                    >
                      <i className="fab fa-whatsapp"></i>
                      WhatsApp Chat
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/447441398273"
          className="whatsapp-float"
          target="_blank"
          title="Chat with us on WhatsApp"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>
    </>
  );
}
