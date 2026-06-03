import { ArrowDownToLine, ClipboardList, Sparkles } from "lucide-react";

type EmptyStateProps = {
  hasTranscript: boolean;
};

export default function EmptyState({ hasTranscript }: EmptyStateProps) {
  return (
    <div className="flex h-full min-h-[520px] flex-col justify-between rounded-lg border-2 border-dashed border-ink/18 bg-white p-6 shadow-[0_8px_0_rgba(22,48,61,0.06)]">
      <div>
        <div className="grid h-14 w-14 place-items-center rounded-lg bg-grape text-white">
          {hasTranscript ? (
            <ArrowDownToLine size={27} aria-hidden="true" />
          ) : (
            <ClipboardList size={27} aria-hidden="true" />
          )}
        </div>

        <h3 className="mt-6 text-2xl font-black text-ink">
          {hasTranscript ? "Transcript ready" : "Feedback card will appear here"}
        </h3>
        <p className="mt-3 max-w-xl text-base font-semibold leading-7 text-ink/68">
          {hasTranscript
            ? "Click Analyze My Class to generate the prototype feedback."
            : "Load the sample transcript or paste a short classroom exchange."}
        </p>
      </div>

      <div className="mt-8 rounded-lg bg-chalk p-4">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-normal text-peacock">
          <Sparkles size={16} aria-hidden="true" />
          Supportive by default
        </div>
        <p className="mt-3 text-lg font-black text-ink">
          Clear wins, practical next steps, and a little encouragement.
        </p>
      </div>
    </div>
  );
}
