import {
  ArrowRight,
  ClipboardCheck,
  MessageSquareText,
  Sparkles,
  Star,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-2 border-ink/10 bg-chalk"
    >
      <div className="absolute inset-x-0 top-0 h-3 confetti-edge" aria-hidden="true" />

      <div className="mx-auto grid min-h-[calc(100vh-66px)] max-w-7xl items-center gap-10 px-4 pb-14 pt-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border-2 border-ink/10 bg-white px-3 py-2 text-sm font-black text-peacock shadow-[0_4px_0_rgba(22,48,61,0.09)]">
            <Sparkles size={16} aria-hidden="true" />
            AI feedback for everyday classrooms
          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-normal text-ink sm:text-6xl lg:text-7xl">
            LessonLens
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-semibold leading-8 text-ink/76 sm:text-xl">
            Paste a short classroom transcript and get a warm, practical feedback card
            that helps teachers celebrate what worked and try one sharper move tomorrow.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#transcript"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-peacock px-5 py-3 font-black text-white shadow-[0_5px_0_rgba(22,48,61,0.2)] transition hover:-translate-y-0.5"
            >
              Analyze a transcript
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-md border-2 border-ink/12 bg-white px-5 py-3 font-black text-ink transition hover:border-peacock hover:text-peacock"
            >
              See the flow
            </a>
          </div>

          <div className="mt-9 grid max-w-xl grid-cols-3 gap-3 text-center">
            {[
              ["3", "teaching lenses"],
              ["1", "tomorrow move"],
              ["0", "setup needed"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border-2 border-ink/10 bg-white px-3 py-4 shadow-[0_4px_0_rgba(22,48,61,0.08)]"
              >
                <div className="text-2xl font-black text-poppy">{value}</div>
                <div className="mt-1 text-xs font-black uppercase tracking-normal text-ink/60">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="paper-panel rounded-lg p-4 shadow-soft">
          <div className="rounded-lg border-2 border-ink/12 bg-white p-4 shadow-sticker">
            <div className="mb-4 flex items-center justify-between gap-3 border-b-2 border-dashed border-ink/12 pb-3">
              <div>
                <p className="text-sm font-black uppercase tracking-normal text-peacock">
                  Feedback preview
                </p>
                <h2 className="text-2xl font-black text-ink">Today&apos;s lens</h2>
              </div>
              <span className="grid h-12 w-12 place-items-center rounded-lg bg-mango text-ink">
                <Star size={24} fill="currentColor" aria-hidden="true" />
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-peacock px-4 py-5 text-white">
                <MessageSquareText size={24} aria-hidden="true" />
                <p className="mt-4 text-sm font-bold text-white/82">
                  Classroom Snapshot
                </p>
                <p className="mt-1 text-xl font-black">Curious discussion</p>
              </div>
              <div className="rounded-lg bg-mango px-4 py-5 text-ink">
                <ClipboardCheck size={24} aria-hidden="true" />
                <p className="mt-4 text-sm font-bold text-ink/70">
                  Try This Tomorrow
                </p>
                <p className="mt-1 text-xl font-black">Pair-share pause</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                ["Student Participation", "82%", "bg-peacock"],
                ["Question Quality", "76%", "bg-mango"],
                ["Language Clarity", "88%", "bg-leaf"],
              ].map(([label, score, color]) => (
                <div key={label} className="rounded-lg border-2 border-ink/10 p-3">
                  <div className="flex items-center justify-between text-sm font-black">
                    <span>{label}</span>
                    <span>{score}</span>
                  </div>
                  <div className="mt-2 h-3 rounded-md bg-ink/8">
                    <div
                      className={`h-full rounded-md ${color}`}
                      style={{ width: score }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
