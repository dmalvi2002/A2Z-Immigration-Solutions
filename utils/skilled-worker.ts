import data from "@/data/skilled-worker-occupations.json";
export const occupationData = data;
export type Occupation = typeof data.occupations[number];
export const occupationPath = (code: string) => "/services/skilled-worker-visa/occupations/" + code;
export function eligibility(occupation: Occupation) {
  if (occupation.skillLevel === "Ineligible") return { label: "Ineligible occupation", tone: "bg-slate-100 text-slate-700", note: "This occupation is listed as ineligible for the Skilled Worker route in the published occupation table." };
  if (occupation.skillLevel.startsWith("Medium Skilled")) return { label: "Subject to conditions", tone: "bg-amber-50 text-amber-800", note: occupation.skillLevel + ". Medium-skilled roles require additional checks, such as inclusion on the Immigration Salary List or Temporary Shortage List, or applicable transitional provisions. Some roles have specific restrictions." };
  if (occupation.skillLevel !== "Higher Skilled") return { label: "Review required", tone: "bg-amber-50 text-amber-800", note: "Check the official occupation guidance before proceeding." };
  return { label: "Eligible occupation", tone: "bg-emerald-50 text-emerald-800", note: "Listed as a higher-skilled occupation. The actual duties must match this code, and sponsorship, salary and other visa requirements must also be met." };
}
export function searchOccupations(query: string, filter = "all") {
  const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return data.occupations.filter(o => {
    const text = [o.code, o.title, ...o.relatedTitles].join(" ").toLowerCase();
    return words.every(word => text.includes(word)) && (filter === "all" || o.skillLevel.startsWith(filter));
  }).sort((a, b) => Number(b.code === query.trim()) - Number(a.code === query.trim()));
}
export function standardSalary(occupation: Occupation) {
  if (occupation.skillLevel === "Ineligible") return "Not applicable";
  return occupation.standardRate || "Check occupation-specific salary rules";
}
