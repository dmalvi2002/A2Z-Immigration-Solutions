import React, { useEffect, useId, useRef, useState } from "react";
import { CalculatorState } from "./index";

interface Props {
  state: CalculatorState;
  updateState: (key: keyof CalculatorState, value: any) => void;
}

const PriorityHelp = ({ label, children }: { label: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const id = useId();
  const container = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <span ref={container} className="relative inline-flex shrink-0"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpen(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setOpen(false); }}
      onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}
    >
      <button type="button" aria-label={label} aria-expanded={open}
        aria-controls={id} aria-describedby={open ? id : undefined}
        onClick={() => setOpen(value => !value)}
        onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) setOpen(true); }}
        onBlur={() => setOpen(false)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-sky-700 transition-colors hover:bg-sky-50 hover:text-sky-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:text-sky-300 dark:hover:bg-sky-900/30 dark:hover:text-sky-100"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
          <circle cx="10" cy="10" r="8" fill="currentColor" fillOpacity="0.18" />
          <path d="M8.25 7.5a1.75 1.75 0 0 1 3.5 0c0 1.25-1.75 1.5-1.75 2.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="10" cy="12.75" r="0.8" fill="currentColor" />
        </svg>
      </button>
      {open && (
        <span id={id} role="tooltip" className="absolute bottom-full right-0 z-30 w-60 max-w-[calc(100vw-3rem)] rounded-xl border border-sky-100 bg-white p-3 text-left text-xs leading-relaxed text-slate-700 shadow-lg dark:border-strokedark dark:bg-blacksection dark:text-white">
          {children}
        </span>
      )}
    </span>
  );
};

const CalculatorForm: React.FC<Props> = ({ state, updateState }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* 1. Sponsor Details */}
      <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-5 dark:border-strokedark dark:bg-blacksection">
        <h3 className="mb-5 text-xl font-semibold text-black dark:text-white">
          Sponsor Details
        </h3>
        
        <div className="mb-5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Sponsor Size
          </label>
          <div className="flex gap-3">
            {(["small", "large"] as const).map((size) => (
              <button
                key={size}
                onClick={() => updateState("sponsorSize", size)}
                className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
                  state.sponsorSize === size
                    ? "bg-primary text-white"
                    : "bg-stroke text-black hover:bg-opacity-80 dark:bg-strokedark dark:text-white"
                }`}
              >
                {size === "small" ? "Small / Charitable" : "Medium / Large"}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Sponsor Licence Needs
          </label>
          <select
            value={state.licenceType}
            onChange={(e) => updateState("licenceType", e.target.value)}
            className="w-full rounded-md border border-stroke bg-transparent px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:text-white"
          >
            <option value="none">I already have a licence (No fee)</option>
            <option value="worker">Worker sponsor licence</option>
            <option value="worker_temp">Worker + Temporary Worker</option>
            <option value="temp_only">Temporary Worker only</option>
            <option value="add_worker">Add Worker to Temporary</option>
            <option value="add_temp">Add Temporary to Worker</option>
          </select>
        </div>

        <div className="mb-0">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Licence Priority Services (Optional)
          </label>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="flex items-center gap-1">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={state.preLicencePriority}
                onChange={(e) => updateState("preLicencePriority", e.target.checked)}
                className="h-5 w-5 rounded border-stroke text-primary accent-primary"
              />
              <span className="text-sm">Pre-licence priority</span>
            </label>
              <PriorityHelp label="About pre-licence priority">
                For organisations applying for a sponsor licence. This optional service prioritises consideration of an eligible licence application. Subject to availability; approval is not guaranteed.
              </PriorityHelp>
            </div>
            <div className="flex items-center gap-1">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={state.postLicencePriority}
                onChange={(e) => updateState("postLicencePriority", e.target.checked)}
                className="h-5 w-5 rounded border-stroke text-primary accent-primary"
              />
              <span className="text-sm">Post-licence priority</span>
            </label>
              <PriorityHelp label="About post-licence priority">
                For organisations that already hold a sponsor licence. This optional service prioritises eligible sponsor change requests, such as certain Certificate of Sponsorship allocation or key personnel changes. Subject to availability; approval is not guaranteed.
              </PriorityHelp>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Visa Details */}
      <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-5 dark:border-strokedark dark:bg-blacksection">
        <h3 className="mb-5 text-xl font-semibold text-black dark:text-white">
          Visa Application Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Application Location
            </label>
            <div className="flex gap-3">
              {(["outside", "inside"] as const).map((loc) => (
                <button
                  key={loc}
                  onClick={() => updateState("location", loc)}
                  className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
                    state.location === loc
                      ? "bg-primary text-white"
                      : "bg-stroke text-black hover:bg-opacity-80 dark:bg-strokedark dark:text-white"
                  }`}
                >
                  {loc === "outside" ? "Outside UK" : "Inside UK"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
              Is job on Salary List?
            </label>
            <div className="flex gap-3">
              {[true, false].map((val) => (
                <button
                  key={val.toString()}
                  onClick={() => updateState("salaryList", val)}
                  className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
                    state.salaryList === val
                      ? "bg-meta text-white"
                      : "bg-stroke text-black hover:bg-opacity-80 dark:bg-strokedark dark:text-white"
                  }`}
                >
                  {val ? "Yes (Lower Fee)" : "No"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white flex justify-between">
            <span>Visa Duration (Years)</span>
            <span className="text-primary font-bold">{state.visaDuration} Years</span>
          </label>
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={state.visaDuration}
            onChange={(e) => updateState("visaDuration", parseInt(e.target.value))}
            className="w-full h-2 bg-stroke rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-waterloo mt-2">
            <span>1 Year</span>
            <span>2 Years</span>
            <span>3 Years</span>
            <span>4 Years</span>
            <span>5 Years</span>
          </div>
        </div>
      </div>

      {/* 3. Applicants */}
      <div className="rounded-lg border border-stroke bg-white p-6 shadow-solid-5 dark:border-strokedark dark:bg-blacksection">
        <h3 className="mb-5 text-xl font-semibold text-black dark:text-white">
          Applicants
        </h3>

        <div className="flex flex-col gap-4 mb-6">
          {[
            { id: "mainApplicants", label: "Main Applicants", min: 1 },
            { id: "adultDependants", label: "Adult Dependants (Partner)", min: 0 },
            { id: "childDependants", label: "Child Dependants (Under 18)", min: 0 },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded bg-alabaster dark:bg-strokedark">
              <span className="text-sm font-medium text-black dark:text-white">
                {item.label}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateState(item.id as any, Math.max(item.min, (state as any)[item.id] - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-stroke text-black hover:bg-primary hover:text-white transition"
                >
                  -
                </button>
                <span className="w-4 text-center font-semibold text-black dark:text-white">
                  {(state as any)[item.id]}
                </span>
                <button
                  onClick={() => updateState(item.id as any, (state as any)[item.id] + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-stroke text-black hover:bg-primary hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-0">
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
            Visa Priority Service (Optional)
          </label>
          <select
            value={state.visaPriority}
            onChange={(e) => updateState("visaPriority", e.target.value)}
            className="w-full rounded-md border border-stroke bg-transparent px-4 py-3 text-black focus:border-primary focus:outline-none dark:border-strokedark dark:text-white"
          >
            <option value="standard">Standard Service (No extra fee)</option>
            <option value="priority">Priority Service (£500/person)</option>
            <option value="super_priority">Super Priority Service (£1000/person)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;
