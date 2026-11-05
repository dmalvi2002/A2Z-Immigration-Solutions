import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { occupationData, occupationPath, eligibility, standardSalary } from "@/utils/skilled-worker";
import { absoluteUrl } from "@/sanity/lib/seo";

type Props = { params: Promise<{ code: string }> };
const find = (code: string) => occupationData.occupations.find(o => o.code === code);
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const o = find(code);
  if (!o) return { title: "Occupation not found", robots: { index: false } };
  return { title: { absolute: "SOC " + o.code + ": " + o.title + " | Skilled Worker Salary | A2Z" }, description: "Explore SOC " + o.code + " — " + o.title + ". View related job titles, published salary going rates and Skilled Worker occupation eligibility notes.", alternates: { canonical: absoluteUrl(occupationPath(o.code)) } };
}
export default async function OccupationPage({ params }: Props) {
  const { code } = await params;
  const o = find(code);
  if (!o) notFound();
  const status = eligibility(o);
  const date = new Date(occupationData.reviewedAt + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  return <main className="mx-auto max-w-5xl px-5 pb-20 pt-40">
    <Link href="/soc-code-finder" className="text-sm font-medium text-sky-700 hover:underline dark:text-sky-300">← Back to occupation finder</Link>
    <p className="mt-8 font-mono font-semibold text-sky-700 dark:text-sky-300">SOC 2020 · {o.code}</p>
    <h1 className="mt-3 text-3xl font-bold text-sky-900 dark:text-white sm:text-4xl">{o.title}</h1>
    <p className="mt-3 text-sm text-slate-500">Skilled Worker occupation and salary guide · Reviewed {date}</p>
    <section className="mt-8 rounded-2xl border border-sky-100 bg-sky-50/50 p-6 dark:border-strokedark dark:bg-blacksection">
      <span className={"inline-block rounded-full px-3 py-1 text-sm font-medium " + status.tone}>{status.label}</span>
      <p className="mt-4 leading-relaxed text-slate-700 dark:text-slate-300">{status.note}</p>
      {o.skillLevel.startsWith("Medium Skilled") && <p className="mt-3 text-sm"><a className="text-sky-700 underline dark:text-sky-300" href="https://www.gov.uk/government/publications/skilled-worker-visa-immigration-salary-list">Check the Immigration Salary List</a>{" · "}<a className="text-sky-700 underline dark:text-sky-300" href="https://www.gov.uk/government/publications/skilled-worker-visa-temporary-shortage-list">Check the Temporary Shortage List</a></p>}
    </section>
    <section className="mt-8"><h2 className="text-2xl font-semibold text-sky-900 dark:text-white">Salary going rates</h2>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-5 dark:border-strokedark"><dt className="text-sm text-slate-500">Published standard going rate</dt><dd className="mt-2 whitespace-pre-line text-xl font-semibold text-sky-900 dark:text-sky-200">{standardSalary(o)}</dd></div>
        {o.lowerRate && o.skillLevel !== "Ineligible" && <div className="rounded-xl border border-slate-200 p-5 dark:border-strokedark"><dt className="text-sm text-slate-500">Published lower going rate — qualifying cases only</dt><dd className="mt-2 whitespace-pre-line text-xl font-semibold text-sky-900 dark:text-sky-200">{o.lowerRate}</dd></div>}
      </dl>
      <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-300">The usual requirement is the higher of £{occupationData.generalThreshold.toLocaleString("en-GB")} per year or the applicable going rate. A published going rate alone is not your personal salary threshold. Working hours, new entrant or PhD provisions, existing visa history and occupation-specific rules can change the requirement. Healthcare and education roles may use national pay scales. The lower rate is not available to every applicant.</p>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Published annual going rates generally assume 37.5 hours per week and need adjustment for other working patterns. If no rate is shown, check the official occupation-specific guidance.</p>
    </section>
    <section className="mt-8"><h2 className="text-2xl font-semibold text-sky-900 dark:text-white">Related job titles</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700 dark:text-slate-300">{o.relatedTitles.map(title => <li key={title}>{title}</li>)}</ul><p className="mt-4 text-sm text-slate-600 dark:text-slate-300">These examples help you search. Select a code based on the actual job duties, not the title alone. An eligible occupation does not guarantee a visa.</p></section>
    <div className="mt-10 flex flex-wrap gap-3"><Link href="/get-in-touch" className="rounded-xl bg-sky-700 px-5 py-3 font-medium text-white hover:bg-sky-800">Discuss your role with our team</Link><Link href="/calculator" className="rounded-xl border border-sky-200 px-5 py-3 font-medium text-sky-800 dark:text-sky-200">Estimate visa fees</Link></div>
    <footer className="mt-10 space-y-2 border-t border-slate-200 pt-5 text-sm text-slate-500"><p>Official sources: <a className="underline" href={occupationData.sources.occupations}>Occupation eligibility</a>{" · "}<a className="underline" href={occupationData.sources.rates}>Salary going rates</a>{" · "}<a className="underline" href={occupationData.sources.rules}>Skilled Worker requirements</a>.</p><p>Contains public sector information licensed under the <a className="underline" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0</a>.</p></footer>
  </main>;
}
