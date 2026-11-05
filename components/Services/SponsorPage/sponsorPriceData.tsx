interface PackageFeature {
  text: string;
}

interface PricingPackage {
  name: string;
  tagline: string;
  text: string;
  color: string;
  ring: string;
  shadowColor: string;
  features: PackageFeature[];
  description: string;
  alwaysExpanded?: boolean;
}

const packages: PricingPackage[] = [
  {
    name: "Essential",
    tagline: "Essential sponsorship application support",
    color: "#08A1DA", // Modified to moderate dark light teal
    ring: "#08A1DA", // Matching ring color
    text: "#fff800",
    shadowColor: "rgba(8, 161, 218, 0.06)", // Updated shadow to match the #08A1DA color
    features: [
      { text: "Initial consultation and eligibility assessment" },
      { text: "Guidance on required documents" },
      {
        text: "Comprehensive Application Support – We handle the entire application process, review & drafting required supporting documents, minimising errors and delays.",
      },
      { text: "General email support for queries" },
    ],
    description:
      "Our Essential package provides essential support for your sponsor license application process, ensuring your application is complete and compliant with Home Office requirements.",
  },
  {
    name: "Enhanced",
    tagline: "Enhanced customer support with priority handling",
    color: "#7986cb",
    ring: "#7986cb",
    text: "#fff",
    shadowColor: "rgba(121, 134, 203, 0.1)", // RGB version of #7986cb with alpha
    features: [
      { text: "Everything in the Essential Package, plus:" },
      {
        text: "Assistance in appointing Key Personnel (Authorising Officer, Key Contact, Level 1 User)",
      },
      { text: "Priority handling of the application" },
      {
        text: "Initial HR compliance check before application submission inlcuding RTW checks.",
      },
      { text: "Dedicated immigration consultant for 3 months post-approval" },
      {
        text: "Assistance with assigning the first Certificate of Sponsorship (CoS)",
      },
      {
        text: "Support with Refusals & Reapplications – If your application is refused, we help you understand the reasons and assess appropriate next steps, including addressing issues before reapplying where suitable. All decisions rest with the Home Office; approval cannot be guaranteed.",
      },
    ],
    description:
      "Our Enhanced package offers priority handling and additional support both during the application process and after your license is approved, including dedicated consultant support.",
  },
  {
    name: "Premium",
    tagline: "Comprehensive solution with ongoing compliance support",
    color: "#ffb900",
    ring: "#ffb900",
    text: "#000",
    shadowColor: "rgba(255, 185, 0, 0.1)", // RGB version of #ffb900 with alpha
    features: [
      { text: "Everything in the Enhanced Package, plus:" },
      {
        text: "Conduct & Assist Recruitment Process as part of Compliance Process",
      },
      {
        text: "Direct Home Office liaison support for complex queries for up to 3 months post-approval",
      },
      { text: "Fast-tracked assistance with the first 3 CoS assignments ✅" },
    ],
    description:
      "Our Premium package provides the highest level of support throughout the entire sponsorship process, including recruitment assistance, direct Home Office liaison, and fast-tracked CoS assignments.",
  },
];

export default packages;
