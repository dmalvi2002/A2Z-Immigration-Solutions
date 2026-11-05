// Define interface for tab content
interface TabContent {
  key: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  modalContent?: {
    detailedTitle?: string;
    detailedDescription?: string;
    detailedCTA?: string;
  };
}

const tabsData: TabContent[] = [
  {
    key: "EXPERT REVIEW",
    title: "EXPERT REVIEW",
    description:
      "Our team of experts will review your eligibility and help you prepare for a successful application.",
    imageSrc: "/images/features/tab-container-01.png",
    imageAlt: "Expert reviewing documents",
    modalContent: {
      detailedTitle: "Eligibility Assessment",
      detailedDescription:
        "Before applying, your business must meet the UK Home Office requirements for sponsorship. This includes proving that you are a legitimate and actively trading company, have a genuine need for skilled workers, and can comply with sponsorship duties. A free eligibility check helps determine if you qualify and what steps are needed to strengthen your application.",
      detailedCTA:
        "📩 Need expert guidance? Contact us today to begin your Sponsor Licence application with confidence!",
    },
  },
  {
    key: "SUBMIT APPLICATION",
    title: "SUBMIT APPLICATION",
    description:
      "We'll guide you through every step of submitting your sponsor licence application.",
    imageSrc: "/images/features/tab-container-02.png",
    imageAlt: "Submitting application documents",
    modalContent: {
      detailedTitle: "Submit Application",
      detailedDescription:
        "Once your business is fully prepared, the next step is submitting the Sponsor Licence application online. Our experts provide a thorough review of your supporting documents and letters, ensuring they are well-structured, persuasive, and compliant with Home Office standards to strengthen your case and maximise the chance of approval. We also handle all follow-ups and communications with the Home Office, addressing any additional requests or clarifications to help keep your application on track. The Home Office makes the final decision.",
      detailedCTA:
        "📩 Need expert guidance? Contact us today to begin your Sponsor Licence application with confidence!",
    },
  },
  {
    key: "ONGOING SUPPORT",
    title: "ONGOING SUPPORT",
    description:
      "Our support continues throughout the application process with dedicated assistance.",
    imageSrc: "/images/features/tab-container-03.png",
    imageAlt: "Customer support representative",
    modalContent: {
      detailedTitle: "Initial Compliance Check",
      detailedDescription:
        "The Home Office expects businesses to have robust HR and compliance systems in place before granting a Sponsor Licence. This step involves ensuring you have proper right-to-work checks, record-keeping procedures, and reporting mechanisms. We assist by conducting a mock compliance audit to help you meet Home Office standards and avoid potential refusals.",
      detailedCTA:
        "📩 Need expert guidance? Contact us today to begin your Sponsor Licence application with confidence!",
    },
  },
  {
    key: "SPONSORSHIP APPROVED",
    title: "SPONSORSHIP APPROVED",
    description:
      "Congratulations on your approved sponsor licence! We'll help you understand your new responsibilities.",
    imageSrc: "/images/features/tab-container-04.png",
    imageAlt: "Approved sponsorship certificate",
    modalContent: {
      detailedTitle: "Sponsor Licence Granted",
      detailedDescription:
        "If your application is successful, the Home Office will issue your Sponsor Licence, allowing you to start assigning Certificates of Sponsorship (CoS) to skilled workers. You must stay compliant with sponsorship duties, including keeping records, reporting employee changes, and preparing for audits to maintain your licence. Our team provides ongoing support to help you stay fully compliant and audit-ready.",
      detailedCTA:
        "📩 Need expert guidance? Contact us today to begin your Sponsor Licence application with confidence!",
    },
  },
];

export default tabsData;
