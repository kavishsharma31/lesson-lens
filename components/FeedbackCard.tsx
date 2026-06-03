import {
  Award,
  CheckCircle2,
  ClipboardCheck,
  HeartHandshake,
  Lightbulb,
  Users,
} from "lucide-react";
import FeedbackMetricCard from "@/components/FeedbackMetricCard";
import type { FeedbackReport } from "@/lib/types";

type FeedbackCardProps = {
  feedback: FeedbackReport;
};

export default function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <article className="rounded-lg border-2 border-ink/12 bg-white p-5 shadow-soft">
      <div className="flex flex-col justify-between gap-4 border-b-2 border-dashed border-ink/12 pb-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-normal text-peacock">
            Feedback card
          </p>
          <h3 className="mt-1 text-3xl font-black text-ink">
            Supportive teaching lens
          </h3>
        </div>
        <div className="inline-flex items-center gap-2 rounded-lg bg-mango px-4 py-3 font-black text-ink">
          <Award size={20} fill="currentColor" aria-hidden="true" />
          {feedback.badge.label}
        </div>
      </div>

      <section className="mt-5 rounded-lg bg-peacock p-5 text-white">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-white/78">
          <ClipboardCheck size={17} aria-hidden="true" />
          Classroom Snapshot
        </div>
        <p className="mt-3 text-xl font-black">{feedback.snapshot.summary}</p>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["Grade", feedback.snapshot.grade],
            ["Topic", feedback.snapshot.topic],
            ["Duration", feedback.snapshot.duration],
            ["Mood", feedback.snapshot.classMood],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg bg-white/12 p-3">
              <dt className="text-xs font-black uppercase tracking-normal text-white/62">
                {label}
              </dt>
              <dd className="mt-1 font-black">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-5 grid gap-4">
        {feedback.metrics.map((metric) => (
          <FeedbackMetricCard key={metric.title} metric={metric} />
        ))}
      </section>

      <section className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-lg border-2 border-ink/10 bg-[#fff8df] p-4">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-ink/62">
            <Lightbulb size={17} aria-hidden="true" />
            Try This Tomorrow
          </div>
          <ul className="mt-4 space-y-3">
            {feedback.tryTomorrow.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm font-semibold leading-6 text-ink/78"
              >
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-md bg-mango text-ink">
                  <CheckCircle2 size={14} aria-hidden="true" />
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border-2 border-ink/10 bg-[#f0fbf2] p-4">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-leaf">
            <HeartHandshake size={17} aria-hidden="true" />
            One thing you did well
          </div>
          <p className="mt-4 text-base font-semibold leading-7 text-ink/78">
            {feedback.didWell}
          </p>

          <div className="mt-4 rounded-lg bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-black text-grape">
              <Users size={17} aria-hidden="true" />
              Encouragement badge
            </div>
            <p className="mt-2 text-lg font-black text-ink">{feedback.badge.label}</p>
            <p className="mt-1 text-sm font-semibold leading-6 text-ink/66">
              {feedback.badge.description}
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
