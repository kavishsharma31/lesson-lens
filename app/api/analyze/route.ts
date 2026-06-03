import { NextResponse } from "next/server";
import { analyzeTranscript } from "../../../lib/analyzeTranscript";

const MIN_TRANSCRIPT_LENGTH = 100;
const MAX_TRANSCRIPT_LENGTH = 12000;

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonError(
      "Please send the transcript as JSON, for example: { \"transcript\": \"...\" }.",
      400,
    );
  }

  const transcript =
    typeof (body as { transcript?: unknown })?.transcript === "string"
      ? (body as { transcript: string }).transcript.trim()
      : "";

  if (!transcript) {
    return jsonError("Please paste a classroom transcript before analyzing.", 400);
  }

  if (transcript.length < MIN_TRANSCRIPT_LENGTH) {
    return jsonError(
      "Please add a little more transcript detail so LessonLens can give useful feedback.",
      400,
    );
  }

  if (transcript.length > MAX_TRANSCRIPT_LENGTH) {
    return jsonError(
      "This transcript is a bit too long for one coaching card. Please keep it under 12,000 characters.",
      413,
    );
  }

  try {
    const feedback = await analyzeTranscript(transcript);
    return NextResponse.json(feedback);
  } catch {
    return jsonError(
      "I could not analyze this transcript right now. Please try again in a moment.",
      502,
    );
  }
}

function jsonError(message: string, status: number) {
  return NextResponse.json(
    {
      error: {
        message,
      },
    },
    { status },
  );
}
