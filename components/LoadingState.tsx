import { SearchCheck, Sparkles } from "lucide-react";

export default function LoadingState() {
  return (
    <div className="min-h-[520px] rounded-lg border-2 border-ink/12 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4 border-b-2 border-dashed border-ink/12 pb-4">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-peacock">
            Reading transcript
          </p>
          <h3 className="mt-1 text-2xl font-black text-ink">
            Finding classroom moments...
          </h3>
        </div>
        <div className="grid h-14 w-14 place-items-center rounded-lg bg-mango text-ink">
          <SearchCheck className="animate-pulse" size={28} aria-hidden="true" />
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {["Classroom Snapshot", "Student Participation", "Question Quality"].map(
          (label, index) => (
            <div
              key={label}
              className="rounded-lg border-2 border-ink/10 bg-chalk p-4"
            >
              <div className="mb-3 flex items-center gap-2 text-sm font-black text-ink/62">
                <Sparkles size={15} aria-hidden="true" />
                {label}
              </div>
              <div className="h-3 w-full animate-pulse rounded-md bg-ink/10" />
              <div
                className="mt-3 h-3 animate-pulse rounded-md bg-ink/10"
                style={{ width: `${78 - index * 12}%` }}
              />
            </div>
          ),
        )}
      </div>

      <div className="mt-6 rounded-lg bg-peacock p-5 text-white">
        <p className="text-lg font-black">Preparing a teacher-friendly feedback card</p>
        <p className="mt-2 font-semibold leading-7 text-white/78">
          Highlighting what worked, then choosing one small move for tomorrow.
        </p>
      </div>
    </div>
  );
}
