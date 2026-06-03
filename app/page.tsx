import Link from "next/link";
import { DemoVideoSection } from "../components/DemoVideoSection";
import { TeacherGrowthSection } from "../components/TeacherGrowthSection";

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
    light: "!",
  };
  const label = iconLabels[name] ?? "";

  return <span aria-hidden="true">{label}</span>;
}

export default function Home() {
  return (
    <main className="lesson-page">
      <header className="top-bar">
        <div className="top-bar-inner">
          <Link className="brand" href="/" aria-label="LessonLens home">
            <BrainIcon className="brand-mark" />
            <span>LessonLens</span>
          </Link>
          <span className="track-chip">School Education Track</span>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link className="active" href="/">
              Dashboard
            </Link>
            <Link href="/analyze">Observations</Link>
          </nav>
          <div className="header-actions">
            <Link className="start-button" href="/analyze">
              Start Observation
            </Link>
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
              <Link className="primary-button" href="/analyze">
                Try it now
                <SymbolIcon name="arrow" />
              </Link>
              <a className="secondary-button" href="#demo-video">
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
              <p>Medium {"\u2022"} 60%</p>
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

      <DemoVideoSection />

      <TeacherGrowthSection />

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
          --outline-variant: #c7c4d7;
          --primary: #4648d4;
          --primary-container: #6063ee;
          --secondary: #8127cf;
          --secondary-container: #9c48ea;
          --tertiary: #00628d;
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

        a {
          color: inherit;
          text-decoration: none;
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

        .start-button,
        .primary-button {
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
        .primary-button:hover {
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
        .section-heading h2 {
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

        .video-section {
          padding: 66px 20px 72px;
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
          max-width: 620px;
          margin: 14px auto 0;
          color: var(--on-variant);
          font-size: 21px;
          line-height: 1.4;
        }

        .video-frame {
          width: min(100%, 952px);
          aspect-ratio: 16 / 9;
          margin: 0 auto;
          overflow: hidden;
          border: 1px solid rgba(70, 72, 212, 0.12);
          border-radius: 30px;
          background:
            radial-gradient(circle at 50% 20%, rgba(70, 72, 212, 0.14), transparent 18rem),
            linear-gradient(135deg, var(--surface-lowest), var(--surface-low));
          box-shadow: var(--shadow-2);
        }

        .video-frame iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .video-placeholder {
          display: grid;
          place-items: center;
          align-content: center;
          gap: 18px;
          height: 100%;
          padding: 28px;
          text-align: center;
          color: var(--on-variant);
        }

        .video-placeholder span {
          display: grid;
          place-items: center;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          color: white;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
          box-shadow: var(--shadow-2);
          font-size: 28px;
        }

        .video-placeholder p {
          max-width: 440px;
          margin: 0;
          font-size: 18px;
          line-height: 1.5;
          font-weight: 700;
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

        @media (max-width: 980px) {
          .desktop-nav,
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

          .hero-grid {
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

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
          }

          .hero-visual {
            display: none;
          }

          .video-section {
            padding-left: 16px;
            padding-right: 16px;
          }

          .video-frame {
            border-radius: 24px;
          }

          .site-footer p {
            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}
