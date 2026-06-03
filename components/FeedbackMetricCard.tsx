import { CheckCircle2 } from "lucide-react";
import type { FeedbackMetric, MetricTone } from "@/lib/types";

type FeedbackMetricCardProps = {
  metric: FeedbackMetric;
};

const toneStyles: Record<
  MetricTone,
  {
    badge: string;
    bar: string;
    panel: string;
  }
> = {
  peacock: {
    badge: "bg-peacock text-white",
    bar: "bg-peacock",
    panel: "bg-[#eefbfc]",
  },
  mango: {
    badge: "bg-mango text-ink",
    bar: "bg-mango",
    panel: "bg-[#fff8df]",
  },
  poppy: {
    badge: "bg-poppy text-white",
    bar: "bg-poppy",
    panel: "bg-[#fff0ef]",
  },
  leaf: {
    badge: "bg-leaf text-white",
    bar: "bg-leaf",
    panel: "bg-[#f0fbf2]",
  },
  grape: {
    badge: "bg-grape text-white",
    bar: "bg-grape",
    panel: "bg-[#f3f1ff]",
  },
};

export default function FeedbackMetricCard({ metric }: FeedbackMetricCardProps) {
  const style = toneStyles[metric.tone];

  return (
    <article className={`rounded-lg border-2 border-ink/10 p-4 ${style.panel}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-black text-ink">{metric.title}</h4>
          <p className="mt-1 text-sm font-black text-ink/62">{metric.label}</p>
        </div>
        <span className={`rounded-md px-3 py-2 text-sm font-black ${style.badge}`}>
          {metric.score}%
        </span>
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-md bg-white/80">
        <div
          className={`h-full rounded-md ${style.bar}`}
          style={{ width: `${metric.score}%` }}
        />
      </div>

      <p className="mt-4 text-sm font-semibold leading-6 text-ink/76">
        {metric.summary}
      </p>

      <div className="mt-4 grid gap-3">
        <div className="rounded-lg bg-white p-3">
          <p className="text-xs font-black uppercase tracking-normal text-ink/52">
            Evidence
          </p>
          <p className="mt-1 text-sm font-semibold leading-6 text-ink/76">
            {metric.evidence}
          </p>
        </div>
        <div className="rounded-lg bg-white p-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-normal text-peacock">
            <CheckCircle2 size={14} aria-hidden="true" />
            Next move
          </div>
          <p className="mt-1 text-sm font-semibold leading-6 text-ink/76">
            {metric.nextMove}
          </p>
        </div>
      </div>
    </article>
  );
}
