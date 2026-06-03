import { DEMO_VIDEO_URL, getDemoVideoEmbedUrl } from "../lib/demoVideo";

export function DemoVideoSection() {
  const demoVideoEmbedUrl = getDemoVideoEmbedUrl();
  const hasVideo = demoVideoEmbedUrl.length > 0;

  return (
    <section className="video-section" id="demo-video">
      <div className="section-heading">
        <h2>Watch LessonLens in action</h2>
        <p>
          This is where the demo walkthrough video will appear for judges and
          visitors.
        </p>
      </div>

      {hasVideo ? (
        <>
          <div className="video-frame">
            <iframe
              src={demoVideoEmbedUrl}
              title="LessonLens demo video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <a
            href={DEMO_VIDEO_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "block",
              marginTop: "14px",
              textAlign: "center",
              color: "var(--primary)",
              fontSize: "14px",
              fontWeight: 800,
            }}
          >
            Open demo video in a new tab
          </a>
        </>
      ) : (
        <div className="video-frame">
          <div className="video-placeholder">
            <span aria-hidden="true">{"\u25b6"}</span>
            <p>
              Demo video coming soon. Add your Google Drive embed link to
              display it here.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
