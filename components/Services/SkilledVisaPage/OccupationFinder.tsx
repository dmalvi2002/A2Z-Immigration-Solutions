"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, RotateCcw } from "lucide-react";
import { occupationData, searchOccupations, eligibility, standardSalary, occupationPath } from "@/utils/skilled-worker";

export default function OccupationFinder() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [limit, setLimit] = useState(9);
  const results = useMemo(() => searchOccupations(query, filter), [query, filter]);
  return (
    <section id="soc-code-finder" aria-labelledby="soc-heading" className="scroll-mt-28 bg-gradient-to-b from-sky-50/70 to-white px-4 py-16 dark:from-blacksection dark:to-black sm:px-6 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-300">Find your occupation</span>
          <h1 id="soc-heading" className="mt-3 text-3xl font-bold tracking-tight text-sky-900 dark:text-white sm:text-4xl">SOC Code &amp; Salary Threshold Finder</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">Search job titles or a four-digit SOC code to explore Skilled Worker occupation eligibility, related roles and published salary going rates.</p>
        </div>
        <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm dark:border-strokedark dark:bg-blacksection sm:p-6">
          <div className="grid gap-4 md:grid-cols-[1fr_240px]">
            <div>
              <label htmlFor="soc-search" className="mb-2 block text-sm font-medium text-slate-800 dark:text-white">Job title or SOC code</label>
              <div className="relative"><Search aria-hidden="true" className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                <input id="soc-search" type="search" value={query} onChange={e => { setQuery(e.target.value); setLimit(9); }} placeholder="e.g. software developer, nurse or 2134" className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 dark:border-strokedark dark:bg-black dark:text-white" />
              </div>
            </div>
            <div><label htmlFor="soc-filter" className="mb-2 block text-sm font-medium text-slate-800 dark:text-white">Occupation category</label>
              <select id="soc-filter" value={filter} onChange={e => { setFilter(e.target.value); setLimit(9); }} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 focus:outline-sky-600 dark:border-strokedark dark:bg-black dark:text-white">
                <option value="all">All occupations</option><option value="Higher Skilled">Higher skilled</option><option value="Medium Skilled">Medium skilled — conditional</option><option value="Ineligible">Ineligible</option>
              </select>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">The usual salary requirement is the higher of £{occupationData.generalThreshold.toLocaleString("en-GB")} a year or the applicable occupation going rate. Exceptions and different rules apply, including healthcare, education and some existing visa holders. This is an occupation lookup, not a personal eligibility decision.</p>
        </div>
        <div className="my-5 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p role="status" aria-live="polite" className="text-slate-600 dark:text-slate-300">{results.length} occupations found · Showing {Math.min(limit, results.length)}</p>
          {(query || filter !== "all") && <button type="button" onClick={() => { setQuery(""); setFilter("all"); setLimit(9); }} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-sky-700 hover:bg-sky-50 dark:text-sky-300"><RotateCcw className="h-4 w-4" aria-hidden="true" />Reset search</button>}
        </div>
        {results.length === 0 ? <div className="rounded-2xl border border-dashed border-sky-200 p-10 text-center"><h3 className="font-semibold text-slate-900 dark:text-white">No matching occupations</h3><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Try a broader title, fewer words or a four-digit code. A missing search result does not determine visa eligibility.</p></div> :
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{results.slice(0, limit).map(o => {
            const status = eligibility(o);
            return <article key={o.code} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-strokedark dark:bg-blacksection">
              <div className="flex flex-wrap items-center justify-between gap-2"><span className="font-mono text-sm font-semibold text-sky-700 dark:text-sky-300">SOC {o.code}</span><span className={"rounded-full px-2.5 py-1 text-xs font-medium " + status.tone}>{status.label}</span></div>
              <h3 className="mb-3 mt-4 text-lg font-semibold leading-snug text-slate-900 dark:text-white"><Link href={occupationPath(o.code)} className="hover:text-sky-700 hover:underline">{o.title}</Link></h3>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Standard going rate</p><p className="mt-1 whitespace-pre-line text-base font-semibold text-sky-900 dark:text-sky-200">{standardSalary(o)}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300"><span className="font-medium">Related titles: </span>{o.relatedTitles.slice(0, 3).join("; ")}{o.relatedTitles.length > 3 ? "; and more" : ""}</p>
              <Link href={occupationPath(o.code)} className="mt-auto flex items-center gap-1 pt-5 text-sm font-semibold text-sky-700 hover:underline dark:text-sky-300">View salary &amp; eligibility notes<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></Link>
            </article>;
          })}</div>}
        {results.length > limit && <div className="mt-7 text-center"><button type="button" onClick={() => setLimit(n => n + 12)} className="rounded-xl border border-sky-200 bg-white px-6 py-3 font-medium text-sky-800 transition hover:bg-sky-50 dark:bg-blacksection dark:text-sky-200">Show more occupations</button></div>}
        <div className="mt-8 space-y-2 border-t border-sky-100 pt-5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          <p>Data reviewed {new Date(occupationData.reviewedAt + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })} · {occupationData.occupations.length} SOC 2020 occupations. Published going rates generally use a 37.5-hour week; other working patterns and special salary rules need separate checks. Matching duties matters more than matching a job title.</p>
          <p>Sources: <a className="underline" href={occupationData.sources.occupations}>GOV.UK occupations</a>{" · "}<a className="underline" href={occupationData.sources.rates}>Going rates</a>{" · "}<a className="underline" href={occupationData.sources.rules}>Eligibility and salary rules</a>. Contains public sector information licensed under the <a className="underline" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0</a>.</p>
        </div>
      </div>
    </section>
  );
}
