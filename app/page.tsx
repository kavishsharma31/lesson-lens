"use client";

import { useEffect, useState } from "react";
import type { FeedbackResponse, LessonLensMetric } from "../lib/types";

type ViewState = "empty" | "filled" | "loading" | "success";

const sampleTranscript =
  "Teacher: Good morning class. Today we're looking at states of matter. Who can tell me what happens when you heat water on a stove?\nStudent (Sarah): It gets hot.\nTeacher: Yes, it gets hot. What else?\nStudent (Tom): It makes bubbles and steam.\nTeacher: Correct. That steam is gas. The liquid turns into gas. Now open your books to page 42.";

const loadingMessages = [
  "Listening to transcript...",
  "Analyzing question types...",
  "Identifying strengths...",
  "Preparing coaching card...",
];

const metricPresentation: Record<
  string,
  {
    accent: "primary" | "secondary" | "tertiary";
    icon: string;
  }
> = {
  "Student Participation": {
    accent: "tertiary",
    icon: "groups",
  },
  "Question Quality": {
    accent: "secondary",
    icon: "question",
  },
  "Language Clarity & Pacing": {
    accent: "primary",
    icon: "voice",
  },
};

function BrainIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M11.6 5.4a5.1 5.1 0 0 0-5.1 5.1v.7A5.7 5.7 0 0 0 4 15.9c0 2.4 1.5 4.5 3.6 5.3v2.1a3.3 3.3 0 0 0 3.3 3.3h2.2v-5.1h-1.6a2 2 0 0 1-2-2v-.7h3.6V5.4h-1.5Zm8.8 0h-1.5v13.4h3.6v.7a2 2 0 0 1-2 2h-1.6v5.1h2.2a3.3 3.3 0 0 0 3.3-3.3v-2.1a5.7 5.7 0 0 0 3.6-5.3 5.7 5.7 0 0 0-2.5-4.7v-.7a5.1 5.1 0 0 0-5.1-5.1Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M13.1 10.6h-2.8m2.8 4h-4m10.8-4h2.8m-2.8 4h4M16 4.8v22.4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SymbolIcon({ name }: { name: string }) {
  const iconLabels: Record<string, string> = {
    arrow: "\u2193",
    sparkle: "\u2726",
    groups: "\u25cc",
    question: "?",
    voice: "\u224b",
    light: "!",
    rocket: "\u2191",
    heart: "\u2665",
    verified: "\u2713",
    refresh: "\u21bb",
  };
  const label = iconLabels[name] ?? "";

  return <span aria-hidden="true">{label}</span>;
}

function getMetricPresentation(title: string) {
  return (
    metricPresentation[title] ?? {
      accent: "primary" as const,
      icon: "sparkle",
    }
  );
}

function scoreWidthFromRating(rating: string) {
  const normalized = rating.toLowerCase();

  if (normalized.includes("active") || normalized.includes("rich") || normalized.includes("clear")) {
    return "76%";
  }

  if (normalized.includes("medium") || normalized.includes("some")) {
    return "60%";
  }

  if (normalized.includes("limited") || normalized.includes("recall") || normalized.includes("quick")) {
    return "42%";
  }

  return "58%";
}

function metricCards(feedback: FeedbackResponse): Array<{
  title: string;
  metric: LessonLensMetric;
}> {
  return [
    {
      title: "Student Participation",
      metric: feedback.student_participation,
    },
    {
      title: "Question Quality",
      metric: feedback.question_quality,
    },
    {
      title: "Language Clarity & Pacing",
      metric: feedback.language_clarity_and_pacing,
    },
  ];
}

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [viewState, setViewState] = useState<ViewState>("empty");
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (viewState !== "loading") {
      return;
    }

    const messageTimer = window.setInterval(() => {
      setLoadingIndex((index) => (index + 1) % loadingMessages.length);
    }, 760);

    return () => {
      window.clearInterval(messageTimer);
    };
  }, [viewState]);

  function loadSampleTranscript() {
    setTranscript(sampleTranscript);
    setViewState("filled");
    setLoadingIndex(0);
    setFeedback(null);
    setErrorMessage("");
  }

  async function analyzeClass() {
    setViewState("loading");
    setLoadingIndex(0);
    setFeedback(null);
    setErrorMessage("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });
      const data = (await response.json().catch(() => null)) as
        | FeedbackResponse
        | { error?: { message?: string } }
        | null;

      if (!response.ok) {
        const message =
          data && "error" in data && data.error?.message
            ? data.error.message
            : "LessonLens could not analyze this transcript. Please try again.";
        throw new Error(message);
      }

      if (!data || "error" in data) {
        throw new Error("LessonLens returned an empty response. Please try again.");
      }

      setFeedback(data as FeedbackResponse);
      setViewState("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "LessonLens could not analyze this transcript. Please try again.",
      );
      setViewState(transcript.trim() ? "filled" : "empty");
    }
  }

  function clearPage() {
    setTranscript("");
    setViewState("empty");
    setLoadingIndex(0);
    setFeedback(null);
    setErrorMessage("");
  }

  return (
    <main className="lesson-page">
      <header className="top-bar">
        <div className="top-bar-inner">
          <a className="brand" href="#top" aria-label="LessonLens home">
            <BrainIcon className="brand-mark" />
            <span>LessonLens</span>
          </a>
          <span className="track-chip">School Education Track</span>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a className="active" href="#demo">
              Dashboard
            </a>
            <a href="#impact">Observations</a>
            <a href="#feedback">History</a>
            <a href="#footer">Resources</a>
          </nav>
          <div className="header-actions">
            <button className="sign-in" type="button">
              Sign In
            </button>
            <a className="start-button" href="#demo">
              Start Observation
            </a>
          </div>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <SymbolIcon name="sparkle" />
              Your personal teaching coach
            </div>
            <h1>
              Every teacher deserves <span>feedback.</span>
            </h1>
            <p>
              Paste a short classroom transcript and get a practical,
              encouraging coaching card in seconds. No grading, just growth.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#demo">
                Try it now
                <SymbolIcon name="arrow" />
              </a>
              <a className="secondary-button" href="#impact">
                Watch Video
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="floating-card participation-card">
              <div className="floating-card-title">
                <span className="icon-bubble">
                  <SymbolIcon name="groups" />
                </span>
                Student Participation
              </div>
              <div className="progress-track">
                <span className="progress-fill" />
              </div>
              <p>Medium • 60%</p>
            </div>

            <div className="floating-card question-card">
              <div className="inline-card-title">
                <span className="outline-icon">
                  <SymbolIcon name="question" />
                </span>
                Question Quality
              </div>
              <p>Mostly Recall-based.</p>
            </div>

            <div className="floating-card tomorrow-card">
              <div className="tomorrow-label">
                Try Tomorrow
                <span>
                  <SymbolIcon name="light" />
                </span>
              </div>
              <p>Ask one "Why" question after a student answers correctly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="demo-section" id="demo">
        <div className="section-heading">
          <h2>Analyze a classroom moment</h2>
          <p>Paste your transcript below to see LessonLens in action.</p>
        </div>

        {viewState !== "loading" && viewState !== "success" && (
          <section className="input-card" aria-label="Classroom transcript">
            <textarea
              value={transcript}
              onChange={(event) => {
                setTranscript(event.target.value);
                setViewState(event.target.value ? "filled" : "empty");
                setFeedback(null);
                setErrorMessage("");
              }}
              placeholder={`E.g., Teacher: Today we are talking about the water cycle. Can anyone tell me what happens to puddles when the sun comes out?\nStudent: They go away.\nTeacher: Right. That's called evaporation. Next...`}
              rows={7}
            />
            {errorMessage ? (
              <div className="error-message" role="alert">
                {errorMessage}
              </div>
            ) : null}
            <div className="input-actions">
              <button className="clear-button" type="button" onClick={clearPage}>
                Clear
              </button>
              <div className="button-group">
                <button
                  className="sample-button"
                  type="button"
                  onClick={loadSampleTranscript}
                >
                  Load Sample
                </button>
                <button
                  className="analyze-button"
                  type="button"
                  onClick={analyzeClass}
                >
                  <SymbolIcon name="sparkle" />
                  Analyze My Class
                </button>
              </div>
            </div>
          </section>
        )}

        {viewState === "loading" && (
          <section className="loading-card" aria-live="polite">
            <div className="loader-ring">
              <span />
            </div>
            <h3>{loadingMessages[loadingIndex]}</h3>
            <p>Building a practical, encouraging coaching card.</p>
          </section>
        )}

        {viewState === "success" && feedback && (
          <section className="feedback-stack" id="feedback" aria-live="polite">
            <div className="feedback-heading">
              <h3>Your Classroom Snapshot</h3>
              <button type="button" onClick={clearPage}>
                <SymbolIcon name="refresh" />
                Start Over
              </button>
            </div>

            <article className="snapshot-card">
              <div>
                <span>Classroom Snapshot</span>
                <h4>{feedback.classroom_snapshot.title}</h4>
              </div>
              <p>{feedback.classroom_snapshot.summary}</p>
            </article>

            <article className="tomorrow-highlight">
              <div className="rocket-badge">
                <SymbolIcon name="rocket" />
              </div>
              <div>
                <div className="chip-row">
                  <span>Try This Tomorrow</span>
                  <small>Small change, big impact</small>
                </div>
                <h4>{feedback.try_this_tomorrow.title}</h4>
                <p>
                  {feedback.try_this_tomorrow.tip}{" "}
                  <strong>{feedback.try_this_tomorrow.example_phrase}</strong>
                </p>
              </div>
            </article>

            <div className="metric-grid">
              {metricCards(feedback).map(({ title, metric }) => {
                const presentation = getMetricPresentation(title);

                return (
                  <article
                    className={`metric-card accent-${presentation.accent}`}
                    key={title}
                  >
                    <div className="metric-topline">
                      <span>{title}</span>
                      <i>
                        <SymbolIcon name={presentation.icon} />
                      </i>
                    </div>
                    <h4>{metric.rating}</h4>
                    <div className="meter">
                      <span style={{ width: scoreWidthFromRating(metric.rating) }} />
                    </div>
                    <p>{metric.evidence}</p>
                    <small>{metric.coaching_note}</small>
                  </article>
                );
              })}
            </div>

            <div className="support-grid">
              <article className="strength-card">
                <div className="heart-badge">
                  <SymbolIcon name="heart" />
                </div>
                <div>
                  <span>One thing you did well</span>
                  <h4>{feedback.strength.title}</h4>
                  <p>{feedback.strength.feedback}</p>
                </div>
              </article>

              <article className="encouragement-card">
                <div>
                  <SymbolIcon name="verified" />
                </div>
                <h4>Encouragement</h4>
                <p>{feedback.encouragement.message}</p>
                {feedback.caution.note !== "No caution needed from this transcript." ? (
                  <small>{feedback.caution.note}</small>
                ) : null}
              </article>
            </div>
          </section>
        )}
      </section>

      <section className="impact-section" id="impact">
        <div className="impact-inner">
          <div>
            <span className="section-kicker">Built for teacher growth</span>
            <h2>A feedback loop that feels like a coach, not a gradebook.</h2>
          </div>
          <div className="impact-list">
            <article>
              <strong>01</strong>
              <h3>Paste a real classroom moment</h3>
              <p>Use short transcripts from observation notes, recordings, or memory.</p>
            </article>
            <article>
              <strong>02</strong>
              <h3>Get a focused snapshot</h3>
              <p>See participation, question quality, pacing, and a next step.</p>
            </article>
            <article>
              <strong>03</strong>
              <h3>Try one small move tomorrow</h3>
              <p>Leave with a concrete coaching card teachers can actually use.</p>
            </article>
          </div>
        </div>
      </section>

      <footer className="site-footer" id="footer">
        <div className="footer-brand">
          <BrainIcon className="brand-mark" />
          LessonLens
        </div>
        <nav aria-label="Footer navigation">
          <a href="#footer">Privacy Policy</a>
          <a href="#footer">Terms of Service</a>
          <a href="#footer">Help Center</a>
          <a href="#footer">Contact Support</a>
        </nav>
        <p>Built for Education Hackathon 2024 {"\u2022"} LessonLens</p>
      </footer>

      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Nunito+Sans:wght@600;700;800;900&display=swap");

        :root {
          --surface: #f8f9ff;
          --surface-lowest: #ffffff;
          --surface-low: #eff4ff;
          --surface-container: #e5eeff;
          --surface-high: #dce9ff;
          --surface-highest: #d3e4fe;
          --on-surface: #0b1c30;
          --on-variant: #464554;
          --outline: #767586;
          --outline-variant: #c7c4d7;
          --primary: #4648d4;
          --primary-container: #6063ee;
          --secondary: #8127cf;
          --secondary-container: #9c48ea;
          --tertiary: #00628d;
          --tertiary-container: #007cb1;
          --shadow-1: 0 4px 20px rgba(70, 72, 212, 0.05);
          --shadow-2: 0 12px 32px rgba(70, 72, 212, 0.12);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--surface);
          color: var(--on-surface);
          font-family: "Inter", system-ui, sans-serif;
        }

        button,
        textarea,
        a {
          font: inherit;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          border: 0;
          cursor: pointer;
        }

        .lesson-page {
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 82% 18%, rgba(70, 72, 212, 0.09), transparent 26rem),
            radial-gradient(circle at 8% 40%, rgba(129, 39, 207, 0.08), transparent 22rem),
            var(--surface);
        }

        .top-bar {
          position: sticky;
          top: 0;
          z-index: 20;
          border-bottom: 1px solid rgba(70, 72, 212, 0.1);
          background: rgba(248, 249, 255, 0.88);
          backdrop-filter: blur(14px);
          box-shadow: 0 2px 12px rgba(11, 28, 48, 0.08);
        }

        .top-bar-inner {
          width: min(100%, 1200px);
          min-height: 64px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .brand,
        .footer-brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--primary);
          font-family: "Nunito Sans", system-ui, sans-serif;
          font-size: 24px;
          font-weight: 900;
          white-space: nowrap;
        }

        .brand-mark {
          width: 28px;
          height: 28px;
          flex: 0 0 auto;
        }

        .track-chip,
        .eyebrow {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
        }

        .track-chip {
          padding: 6px 18px;
          color: #fff;
          background: linear-gradient(90deg, var(--secondary-container), #b84bea);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 34px;
          flex: 1;
          color: #1f2030;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0;
        }

        .desktop-nav a {
          padding: 22px 0 17px;
          border-bottom: 3px solid transparent;
        }

        .desktop-nav a.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-left: auto;
        }

        .sign-in {
          color: var(--primary);
          background: transparent;
          font-weight: 700;
        }

        .start-button,
        .primary-button,
        .analyze-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: white;
          background: linear-gradient(90deg, var(--primary), #8127cf);
          box-shadow: var(--shadow-1);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .start-button:hover,
        .primary-button:hover,
        .analyze-button:hover {
          transform: translateY(-1px);
          box-shadow: var(--shadow-2);
        }

        .start-button {
          min-height: 48px;
          padding: 0 25px;
          border-radius: 14px;
          font-weight: 800;
        }

        .hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 560px;
          padding: 74px 20px 92px;
        }

        .hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.48;
          background-image: radial-gradient(rgba(70, 72, 212, 0.12) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        .hero-grid {
          width: min(100%, 1200px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(420px, 1fr);
          align-items: center;
          gap: 48px;
        }

        .hero-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 24px;
        }

        .eyebrow {
          gap: 10px;
          padding: 11px 16px;
          color: var(--primary);
          background: var(--surface-highest);
        }

        .hero h1,
        .section-heading h2,
        .impact-section h2 {
          margin: 0;
          color: var(--on-surface);
          font-family: "Nunito Sans", system-ui, sans-serif;
          letter-spacing: 0;
        }

        .hero h1 {
          max-width: 590px;
          font-size: clamp(44px, 5vw, 62px);
          line-height: 1.16;
          font-weight: 900;
        }

        .hero h1 span {
          color: transparent;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          background-clip: text;
          -webkit-background-clip: text;
        }

        .hero-copy p {
          max-width: 610px;
          margin: 0;
          color: var(--on-variant);
          font-size: 22px;
          line-height: 1.48;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          padding-top: 22px;
        }

        .primary-button,
        .secondary-button {
          min-height: 64px;
          padding: 0 30px;
          border-radius: 14px;
          font-size: 18px;
          font-weight: 800;
        }

        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--on-variant);
          border: 2px solid var(--outline-variant);
          background: rgba(255, 255, 255, 0.2);
        }

        .hero-visual {
          position: relative;
          min-height: 400px;
        }

        .floating-card {
          position: absolute;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.68);
          box-shadow: var(--shadow-2);
        }

        .participation-card {
          top: 30px;
          right: 78px;
          width: 258px;
          padding: 22px;
          animation: float-one 6s ease-in-out infinite;
        }

        .floating-card-title,
        .inline-card-title {
          display: flex;
          align-items: center;
          gap: 14px;
          color: #151724;
          font-size: 18px;
          font-weight: 800;
        }

        .icon-bubble {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: var(--primary);
          background: #e4e5ff;
          font-weight: 900;
        }

        .progress-track {
          height: 10px;
          margin-top: 26px;
          overflow: hidden;
          border-radius: 999px;
          background: var(--surface-low);
        }

        .progress-fill {
          display: block;
          width: 60%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #7c26d9, #9b22da);
        }

        .participation-card p {
          margin: 12px 0 0;
          text-align: right;
          color: #303140;
          font-size: 16px;
        }

        .question-card {
          bottom: 58px;
          left: 38px;
          width: 360px;
          padding: 26px 30px;
          border-left: 5px solid var(--tertiary);
          animation: float-two 7s ease-in-out infinite;
        }

        .outline-icon {
          color: var(--tertiary);
          font-size: 28px;
          font-weight: 900;
        }

        .question-card p {
          margin: 14px 0 0 42px;
          color: #2a2b3a;
          font-size: 22px;
        }

        .tomorrow-card {
          top: 156px;
          right: -8px;
          width: 360px;
          padding: 28px 26px;
          background: linear-gradient(135deg, white, var(--surface-low));
          animation: float-one 6s ease-in-out infinite 1s;
        }

        .tomorrow-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: var(--secondary);
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .tomorrow-card p {
          margin: 18px 0 0;
          color: #121420;
          font-size: 22px;
          line-height: 1.38;
          font-weight: 600;
        }

        .demo-section {
          padding: 66px 20px 62px;
          border-top: 1px solid rgba(199, 196, 215, 0.45);
          border-bottom: 1px solid rgba(199, 196, 215, 0.45);
          background: rgba(229, 238, 255, 0.45);
        }

        .section-heading {
          margin: 0 auto 30px;
          text-align: center;
        }

        .section-heading h2 {
          font-size: 32px;
          line-height: 1.25;
          font-weight: 900;
        }

        .section-heading p {
          margin: 14px 0 0;
          color: var(--on-variant);
          font-size: 21px;
          line-height: 1.4;
        }

        .input-card,
        .feedback-stack,
        .loading-card {
          width: min(100%, 952px);
          margin: 0 auto;
        }

        .input-card {
          padding: 30px;
          border-radius: 30px;
          background: var(--surface-lowest);
          box-shadow: var(--shadow-1);
        }

        textarea {
          width: 100%;
          min-height: 224px;
          resize: vertical;
          padding: 25px 22px;
          border: 1px solid rgba(118, 117, 134, 0.28);
          border-radius: 18px;
          outline: 0;
          color: var(--on-surface);
          background: var(--surface);
          font-size: 21px;
          line-height: 1.45;
          transition: border-color 180ms ease, box-shadow 180ms ease;
        }

        textarea::placeholder {
          color: rgba(70, 69, 84, 0.74);
        }

        textarea:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 5px rgba(70, 72, 212, 0.1);
        }

        .error-message {
          margin-top: 16px;
          padding: 14px 16px;
          border: 1px solid rgba(186, 26, 26, 0.16);
          border-radius: 14px;
          color: #93000a;
          background: #ffdad6;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.45;
        }

        .input-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-top: 32px;
        }

        .clear-button {
          color: #232433;
          background: transparent;
          font-size: 17px;
          font-weight: 800;
        }

        .button-group {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .sample-button,
        .analyze-button {
          min-height: 54px;
          padding: 0 27px;
          border-radius: 14px;
          font-size: 17px;
          font-weight: 900;
        }

        .sample-button {
          color: #071528;
          border: 1px solid #cbd6ef;
          background: var(--surface-high);
        }

        .loading-card {
          display: grid;
          place-items: center;
          min-height: 360px;
          text-align: center;
          border-radius: 30px;
          background: rgba(255, 255, 255, 0.62);
          box-shadow: var(--shadow-1);
        }

        .loader-ring {
          position: relative;
          width: 78px;
          height: 78px;
          margin-bottom: 24px;
          border-radius: 50%;
          border: 5px solid var(--surface-highest);
        }

        .loader-ring span {
          position: absolute;
          inset: -5px;
          border-radius: inherit;
          border: 5px solid var(--primary);
          border-top-color: transparent;
          animation: spin 900ms linear infinite;
        }

        .loading-card h3 {
          margin: 0;
          color: var(--on-surface);
          font-family: "Nunito Sans", system-ui, sans-serif;
          font-size: 24px;
          font-weight: 800;
        }

        .loading-card p {
          margin: 10px 0 0;
          color: var(--on-variant);
        }

        .feedback-stack {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .feedback-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .feedback-heading h3 {
          margin: 0;
          font-family: "Nunito Sans", system-ui, sans-serif;
          font-size: 24px;
          font-weight: 900;
        }

        .feedback-heading button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--primary);
          background: transparent;
          font-weight: 800;
        }

        .snapshot-card {
          display: grid;
          gap: 10px;
          padding: 24px;
          border: 1px solid rgba(70, 72, 212, 0.12);
          border-radius: 22px;
          background: var(--surface-lowest);
          box-shadow: var(--shadow-1);
        }

        .snapshot-card span {
          display: inline-flex;
          width: fit-content;
          margin-bottom: 8px;
          padding: 6px 10px;
          border-radius: 999px;
          color: var(--primary);
          background: rgba(70, 72, 212, 0.1);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .snapshot-card h4 {
          margin: 0;
          font-family: "Nunito Sans", system-ui, sans-serif;
          color: var(--on-surface);
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 0;
        }

        .snapshot-card p,
        .snapshot-card small {
          margin: 0;
          color: var(--on-variant);
          line-height: 1.5;
        }

        .snapshot-card small {
          font-weight: 800;
        }

        .tomorrow-highlight {
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 22px;
          padding: 28px;
          border: 1px solid rgba(70, 72, 212, 0.25);
          border-radius: 24px;
          background:
            radial-gradient(circle at 100% 0%, rgba(70, 72, 212, 0.16), transparent 14rem),
            linear-gradient(90deg, rgba(73, 75, 214, 0.1), rgba(129, 39, 207, 0.1));
          box-shadow: var(--shadow-2);
        }

        .rocket-badge,
        .heart-badge {
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          color: white;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          box-shadow: 0 12px 24px rgba(70, 72, 212, 0.18);
        }

        .rocket-badge {
          width: 58px;
          height: 58px;
          border-radius: 18px;
          font-size: 28px;
        }

        .chip-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 12px;
        }

        .chip-row span,
        .strength-card span,
        .section-kicker {
          display: inline-flex;
          width: fit-content;
          border-radius: 999px;
          color: var(--primary);
          background: rgba(70, 72, 212, 0.1);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .chip-row span {
          padding: 7px 12px;
        }

        .chip-row small {
          padding: 4px 8px;
          border: 1px solid rgba(199, 196, 215, 0.45);
          border-radius: 8px;
          background: white;
          color: var(--on-variant);
          font-size: 11px;
          font-weight: 800;
        }

        .tomorrow-highlight h4,
        .metric-card h4,
        .strength-card h4,
        .encouragement-card h4,
        .impact-list h3 {
          margin: 0;
          font-family: "Nunito Sans", system-ui, sans-serif;
          color: var(--on-surface);
          font-weight: 900;
          letter-spacing: 0;
        }

        .tomorrow-highlight h4 {
          margin-bottom: 8px;
          font-size: 28px;
        }

        .tomorrow-highlight p {
          margin: 0;
          color: var(--on-variant);
          font-size: 18px;
          line-height: 1.55;
        }

        .tomorrow-highlight strong {
          color: var(--on-surface);
          border-radius: 6px;
          background: rgba(70, 72, 212, 0.07);
          padding: 0 4px;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .metric-card,
        .strength-card,
        .encouragement-card,
        .impact-list article {
          border-radius: 22px;
          background: var(--surface-lowest);
          box-shadow: var(--shadow-1);
        }

        .metric-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 22px;
          border-left: 5px solid var(--primary);
          box-shadow: inset 0 0 0 1px rgba(70, 72, 212, 0.1), var(--shadow-1);
        }

        .metric-card.accent-secondary {
          border-left-color: var(--secondary);
        }

        .metric-card.accent-tertiary {
          border-left-color: var(--tertiary);
        }

        .metric-topline {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          color: var(--outline);
          font-size: 14px;
          font-weight: 900;
        }

        .metric-topline i {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          color: var(--primary);
          background: rgba(70, 72, 212, 0.1);
          font-style: normal;
        }

        .accent-secondary .metric-topline i {
          color: var(--secondary);
          background: rgba(129, 39, 207, 0.1);
        }

        .accent-tertiary .metric-topline i {
          color: var(--tertiary);
          background: rgba(0, 98, 141, 0.1);
        }

        .metric-card h4 {
          font-size: 21px;
        }

        .meter {
          height: 7px;
          overflow: hidden;
          border-radius: 999px;
          background: var(--surface-low);
        }

        .meter span {
          display: block;
          height: 100%;
          border-radius: inherit;
          background: var(--primary);
        }

        .accent-secondary .meter span {
          background: var(--secondary);
        }

        .accent-tertiary .meter span {
          background: var(--tertiary);
        }

        .metric-card p,
        .metric-card small {
          margin: 0;
          color: var(--on-variant);
          line-height: 1.45;
        }

        .metric-card small {
          color: #22324a;
          font-weight: 700;
        }

        .support-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 18px;
        }

        .strength-card {
          display: flex;
          gap: 18px;
          padding: 22px;
          border: 1px solid rgba(70, 72, 212, 0.14);
        }

        .heart-badge {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: var(--primary-container);
        }

        .strength-card span {
          padding: 6px 10px;
          margin-bottom: 10px;
          color: var(--on-variant);
          background: var(--surface-container);
        }

        .strength-card h4 {
          font-size: 18px;
        }

        .strength-card p,
        .encouragement-card p,
        .encouragement-card small {
          margin: 6px 0 0;
          color: var(--on-variant);
          line-height: 1.5;
        }

        .encouragement-card small {
          display: block;
          padding-top: 8px;
          color: #6b3f00;
          font-weight: 700;
        }

        .encouragement-card {
          display: grid;
          place-items: center;
          align-content: center;
          gap: 10px;
          padding: 22px;
          text-align: center;
          border: 1px solid rgba(0, 98, 141, 0.14);
          background: linear-gradient(135deg, rgba(0, 124, 177, 0.14), var(--surface-container));
        }

        .encouragement-card div {
          color: var(--tertiary);
          font-size: 42px;
          line-height: 1;
        }

        .encouragement-card h4 {
          font-size: 18px;
        }

        .impact-section {
          padding: 72px 20px;
          background: var(--surface);
        }

        .impact-inner {
          width: min(100%, 1120px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.86fr 1.14fr;
          gap: 42px;
          align-items: start;
        }

        .section-kicker {
          padding: 7px 13px;
          margin-bottom: 16px;
        }

        .impact-section h2 {
          max-width: 430px;
          font-size: 34px;
          line-height: 1.18;
          font-weight: 900;
        }

        .impact-list {
          display: grid;
          gap: 16px;
        }

        .impact-list article {
          display: grid;
          grid-template-columns: auto 1fr;
          column-gap: 18px;
          padding: 22px;
          border: 1px solid rgba(70, 72, 212, 0.09);
        }

        .impact-list strong {
          grid-row: span 2;
          color: var(--secondary);
          font-family: "Nunito Sans", system-ui, sans-serif;
          font-size: 22px;
          font-weight: 900;
        }

        .impact-list h3 {
          font-size: 19px;
        }

        .impact-list p {
          margin: 6px 0 0;
          color: var(--on-variant);
          line-height: 1.5;
        }

        .site-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
          padding: 38px 20px;
          background: var(--surface-highest);
          text-align: center;
        }

        .footer-brand {
          font-size: 18px;
        }

        .footer-brand .brand-mark {
          width: 24px;
          height: 24px;
        }

        .site-footer nav {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 28px;
          color: #242536;
          font-size: 14px;
        }

        .site-footer p {
          margin: 0;
          color: var(--on-variant);
          font-size: 20px;
        }

        @keyframes float-one {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }

          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes float-two {
          0%,
          100% {
            transform: translateY(0) rotate(2deg) scale(0.96);
          }

          50% {
            transform: translateY(-15px) rotate(-1deg) scale(1);
          }
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 980px) {
          .desktop-nav,
          .sign-in,
          .track-chip {
            display: none;
          }

          .top-bar-inner {
            min-height: 70px;
          }

          .hero {
            min-height: auto;
            padding: 54px 20px 70px;
          }

          .hero-grid,
          .impact-inner {
            grid-template-columns: 1fr;
          }

          .hero-visual {
            min-height: 330px;
            max-width: 560px;
            width: 100%;
            margin: 0 auto;
          }

          .participation-card {
            right: 28px;
          }

          .question-card {
            left: 0;
          }

          .tomorrow-card {
            right: 0;
          }

          .metric-grid,
          .support-grid {
            grid-template-columns: 1fr;
          }

          .impact-section h2 {
            max-width: 680px;
          }
        }

        @media (max-width: 680px) {
          .top-bar-inner {
            padding: 0 16px;
          }

          .brand {
            font-size: 21px;
          }

          .start-button {
            min-height: 42px;
            padding: 0 16px;
            font-size: 14px;
          }

          .hero {
            padding: 40px 20px 52px;
          }

          .hero-copy {
            gap: 18px;
          }

          .hero h1 {
            font-size: 42px;
            line-height: 1.13;
          }

          .hero-copy p,
          .section-heading p {
            font-size: 18px;
          }

          .hero-actions,
          .input-actions,
          .button-group,
          .feedback-heading {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }

          .primary-button,
          .secondary-button,
          .sample-button,
          .analyze-button {
            width: 100%;
          }

          .hero-visual {
            display: none;
          }

          .demo-section,
          .impact-section {
            padding-left: 16px;
            padding-right: 16px;
          }

          .input-card {
            padding: 18px;
            border-radius: 24px;
          }

          textarea {
            min-height: 220px;
            padding: 18px;
            font-size: 17px;
          }

          .tomorrow-highlight,
          .strength-card,
          .impact-list article {
            grid-template-columns: 1fr;
          }

          .tomorrow-highlight {
            padding: 22px;
          }

          .tomorrow-highlight h4 {
            font-size: 24px;
          }

          .site-footer p {
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}
