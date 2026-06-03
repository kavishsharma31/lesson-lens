"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ClipboardList, Eraser, Play, WandSparkles } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import FeedbackCard from "@/components/FeedbackCard";
import LoadingState from "@/components/LoadingState";
import { mockFeedback } from "@/lib/mockFeedback";
import { sampleTranscript } from "@/lib/sampleTranscript";
import type { FeedbackReport } from "@/lib/types";

type AnalysisStatus = "idle" | "loading" | "complete";

export default function TranscriptInput() {
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState<AnalysisStatus>("idle");
  const [feedback, setFeedback] = useState<FeedbackReport | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
  const canAnalyze = transcript.trim().length > 0 && status !== "loading";

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  function loadSampleTranscript() {
    setTranscript(sampleTranscript);
    setFeedback(null);
    setStatus("idle");
  }

  function handleTranscriptChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setTranscript(event.target.value);
    if (status === "complete") {
      setFeedback(null);
      setStatus("idle");
    }
  }

  function analyzeTranscript() {
    if (!canAnalyze) {
      return;
    }

    setFeedback(null);
    setStatus("loading");

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setFeedback(mockFeedback);
      setStatus("complete");
    }, 950);
  }

  function clearTranscript() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    setTranscript("");
    setFeedback(null);
    setStatus("idle");
  }

  return (
    <section id="transcript" className="bg-[#f3fbfc] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-normal text-peacock">
              Try the prototype
            </p>
            <h2 className="mt-2 text-3xl font-black text-ink sm:text-4xl">
              Analyze a classroom transcript.
            </h2>
            <p className="mt-3 text-lg font-semibold leading-8 text-ink/70">
              The current demo uses a mock feedback card while the product shape is
              being tested with teachers.
            </p>
          </div>

          <div className="rounded-lg border-2 border-ink/10 bg-white px-4 py-3 text-sm font-black text-ink shadow-[0_5px_0_rgba(22,48,61,0.08)]">
            {wordCount} words ready
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-lg border-2 border-ink/12 bg-white p-4 shadow-soft">
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-xl font-black text-ink">Classroom transcript</h3>
                <p className="text-sm font-bold text-ink/60">Short teacher-student exchange</p>
              </div>

              <button
                type="button"
                onClick={loadSampleTranscript}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-mango px-4 py-2 text-sm font-black text-ink shadow-[0_4px_0_rgba(22,48,61,0.16)] transition hover:-translate-y-0.5"
              >
                <ClipboardList size={17} aria-hidden="true" />
                Load Sample Transcript
              </button>
            </div>

            <textarea
              value={transcript}
              onChange={handleTranscriptChange}
              placeholder="Paste your classroom transcript here..."
              className="min-h-[360px] w-full resize-y rounded-lg border-2 border-ink/12 bg-chalk p-4 text-base font-semibold leading-7 text-ink placeholder:text-ink/42 focus:border-peacock focus:bg-white focus:outline-none"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={analyzeTranscript}
                disabled={!canAnalyze}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-peacock px-5 py-3 font-black text-white shadow-[0_5px_0_rgba(22,48,61,0.2)] transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-ink/28 disabled:shadow-none"
              >
                {status === "loading" ? (
                  <WandSparkles className="animate-pulse" size={18} aria-hidden="true" />
                ) : (
                  <Play size={18} aria-hidden="true" />
                )}
                Analyze My Class
              </button>

              <button
                type="button"
                onClick={clearTranscript}
                disabled={!transcript && status === "idle"}
                className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-ink/12 bg-white px-5 py-3 font-black text-ink transition enabled:hover:border-poppy enabled:hover:text-poppy disabled:cursor-not-allowed disabled:text-ink/30"
              >
                <Eraser size={18} aria-hidden="true" />
                Clear
              </button>
            </div>
          </div>

          <div aria-live="polite" className="min-h-[520px]">
            {status === "loading" && <LoadingState />}
            {status === "complete" && feedback && <FeedbackCard feedback={feedback} />}
            {status === "idle" && <EmptyState hasTranscript={transcript.trim().length > 0} />}
          </div>
        </div>
      </div>
    </section>
  );
}
