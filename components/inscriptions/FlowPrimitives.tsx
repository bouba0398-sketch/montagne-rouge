/**
 * Shared primitives reused across all 4 inscription flows.
 * Not a page or route — imported directly by flow components.
 */

/* ── Field wrapper ── */
export function Field({
  label, required = false, error, children,
}: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-black/50 mb-1.5 tracking-wide">
        {label}{required && <span className="text-rouge ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
}

/* ── Text input ── */
export function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  const { error, className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={`w-full rounded-2xl border px-4 py-3 text-sm text-black placeholder:text-black/30 outline-none transition-all duration-150 focus:ring-2 ${
        error
          ? "border-red-400 bg-red-50/40 focus:ring-red-200"
          : "border-black/10 bg-white focus:border-black/25 focus:ring-black/8"
      } ${className}`}
    />
  );
}

/* ── Textarea ── */
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  const { error, className = "", ...rest } = props;
  return (
    <textarea
      {...rest}
      className={`w-full rounded-2xl border px-4 py-3 text-sm text-black placeholder:text-black/30 outline-none transition-all duration-150 focus:ring-2 resize-none ${
        error
          ? "border-red-400 bg-red-50/40 focus:ring-red-200"
          : "border-black/10 bg-white focus:border-black/25 focus:ring-black/8"
      } ${className}`}
    />
  );
}

/* ── Select ── */
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  const { error, className = "", ...rest } = props;
  return (
    <select
      {...rest}
      className={`w-full rounded-2xl border px-4 py-3 text-sm text-black outline-none transition-all duration-150 focus:ring-2 cursor-pointer bg-white ${
        error
          ? "border-red-400 bg-red-50/40 focus:ring-red-200"
          : "border-black/10 focus:border-black/25 focus:ring-black/8"
      } ${className}`}
    />
  );
}

/* ── Chip group (single or multi select) ── */
export function ChipGroup({
  options, value, onChange, multi = false,
}: {
  options: string[];
  value: string | string[];
  onChange: (val: string | string[]) => void;
  multi?: boolean;
}) {
  const isSelected = (opt: string) =>
    multi ? (value as string[]).includes(opt) : value === opt;

  const toggle = (opt: string) => {
    if (multi) {
      const arr = value as string[];
      onChange(arr.includes(opt) ? arr.filter((v) => v !== opt) : [...arr, opt]);
    } else {
      onChange(opt === value ? "" : opt);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className="px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 active:scale-[0.96]"
          style={
            isSelected(opt)
              ? { background: "#960018", color: "#fff", borderColor: "#960018" }
              : { background: "#fff", color: "rgba(10,10,10,0.60)", borderColor: "rgba(0,0,0,0.10)" }
          }
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ── Step section heading ── */
export function StepHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-semibold text-black text-[18px] mb-6 leading-snug">
      {children}
    </h2>
  );
}

/* ── Success screen ── */
export function SuccessScreen({
  title, message, nextSteps,
}: {
  title: string; message: string; nextSteps?: string[];
}) {
  return (
    <div className="text-center py-4">
      <div className="w-14 h-14 rounded-full bg-rouge/10 flex items-center justify-center mx-auto mb-6">
        <svg className="w-7 h-7 text-rouge" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="font-display font-semibold text-black text-[22px] mb-2">{title}</h2>
      <p className="text-[22px] font-display italic text-rouge mb-4">Jërëjëf !</p>
      <p className="text-sm text-black/50 leading-relaxed max-w-sm mx-auto mb-6">{message}</p>
      {nextSteps && nextSteps.length > 0 && (
        <div className="text-left bg-black/[0.03] rounded-2xl p-5 max-w-sm mx-auto mb-6">
          <p className="text-xs font-semibold text-black/50 uppercase tracking-wider mb-3">Prochaines étapes</p>
          <ul className="space-y-2">
            {nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-black/60">
                <span className="shrink-0 w-4 h-4 rounded-full bg-rouge/10 flex items-center justify-center mt-0.5">
                  <span className="text-[9px] font-bold text-rouge">{i + 1}</span>
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
