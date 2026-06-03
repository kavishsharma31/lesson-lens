export const DEMO_VIDEO_URL = "https://youtu.be/0xiOhYdYCq8";

export function getDemoVideoEmbedUrl() {
  const videoId = getYouTubeVideoId(DEMO_VIDEO_URL);

  return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : "";
}

function getYouTubeVideoId(videoUrl: string) {
  const trimmedUrl = videoUrl.trim();

  if (!trimmedUrl || trimmedUrl === "PASTE_YOUTUBE_LINK_HERE") {
    return "";
  }

  try {
    const url = new URL(trimmedUrl);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        return sanitizeVideoId(url.searchParams.get("v") ?? "");
      }

      const match = url.pathname.match(/^\/(?:embed|shorts)\/([^/?#]+)/);
      return sanitizeVideoId(match?.[1] ?? "");
    }

    if (host === "youtu.be") {
      return sanitizeVideoId(url.pathname.split("/").filter(Boolean)[0] ?? "");
    }
  } catch {
    return "";
  }

  return "";
}

function sanitizeVideoId(videoId: string) {
  const match = videoId.match(/^[a-zA-Z0-9_-]{6,}$/);

  return match ? videoId : "";
}
