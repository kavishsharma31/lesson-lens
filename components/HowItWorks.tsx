import { ClipboardPaste, Lightbulb, WandSparkles } from "lucide-react";

const steps = [
  {
    title: "Paste",
    body: "Drop in a short transcript from a classroom moment.",
    icon: ClipboardPaste,
    color: "bg-peacock text-white",
  },
  {
    title: "Analyze",
    body: "LessonLens scans for participation, questions, clarity, and pacing.",
    icon: WandSparkles,
    color: "bg-mango text-ink",
  },
  {
    title: "Try",
    body: "Leave with one practical classroom move for tomorrow.",
    icon: Lightbulb,
    color: "bg-poppy text-white",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-normal text-peacock">
            How it works
          </p>
          <h2 className="mt-2 text-3xl font-black text-ink sm:text-4xl">
            A quick routine for reflective teaching.
          </h2>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="rounded-lg border-2 border-ink/10 bg-chalk p-5 shadow-[0_7px_0_rgba(22,48,61,0.08)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`grid h-12 w-12 place-items-center rounded-lg ${step.color}`}>
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <span className="text-5xl font-black leading-none text-ink/10">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-black text-ink">{step.title}</h3>
                <p className="mt-2 text-base font-semibold leading-7 text-ink/70">
                  {step.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
