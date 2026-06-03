import { DEMO_VIDEO_EMBED_URL } from "../lib/demoVideo";

export function DemoVideoSection() {
  const hasVideo = DEMO_VIDEO_EMBED_URL.trim().length > 0;

  return (
    <section className="video-section" id="demo-video">
      <div className="section-heading">
        <h2>Watch LessonLens in action</h2>
        <p>
          This is where the demo walkthrough video will appear for judges and
          visitors.
        </p>
      </div>

      <div className="video-frame">
        {hasVideo ? (
          <iframe
            src={DEMO_VIDEO_EMBED_URL}
            title="LessonLens demo video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="video-placeholder">
            <span aria-hidden="true">{"\u25b6"}</span>
            <p>
              Demo video coming soon. Add your Google Drive embed link to
              display it here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
