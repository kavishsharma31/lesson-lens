import {
  ANALYSIS_SYSTEM_PROMPT,
  buildAnalysisUserPrompt,
  feedbackResponseJsonSchema,
} from "./analysisPrompt";
import type { FeedbackResponse, LessonLensMetric } from "./types";

type OpenAIChatCompletion = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

type LooseRecord = Record<string, unknown>;

const FALLBACK_TEXT = "Not enough evidence in this short transcript.";
const NO_CAUTION = "No caution needed from this transcript.";

export const mockFeedback: FeedbackResponse = {
  classroom_snapshot: {
    title: "Clear lesson, short responses",
    summary:
      "The teacher guided students toward the idea that heated water becomes steam. Students answered briefly, so the next opportunity is to ask them to explain their thinking.",
  },
  student_participation: {
    rating: "Medium",
    evidence:
      "Students gave short answers such as getting hot and making bubbles or steam, while the teacher did most of the explaining.",
    coaching_note:
      "After one student answers, invite another student to add on before confirming the answer.",
  },
  question_quality: {
    rating: "Recall-heavy",
    evidence:
      "The teacher asked what happens when water is heated, and students named visible changes rather than explaining why they happen.",
    coaching_note:
      "Add one reasoning follow-up after a correct answer so students explain the science in their own words.",
  },
  language_clarity_and_pacing: {
    rating: "Clear",
    evidence:
      'The teacher used direct language: "That steam is gas. The liquid turns into gas."',
    coaching_note:
      "Keep the clear explanation, then pause for one student to restate the idea before moving on.",
  },
  try_this_tomorrow: {
    title: "Ask one why question",
    tip: "After a correct answer, ask one student to explain the reason behind it before you give the final explanation.",
    example_phrase: '"Why do you think water changes into steam when it gets hot?"',
  },
  strength: {
    title: "Clear concept naming",
    feedback:
      "You connected the students' observation about steam to the science word gas, which helps students attach everyday experience to the lesson concept.",
  },
  encouragement: {
    message:
      "This is a strong base for a short science explanation. One extra reasoning question can make the same moment more student-led.",
  },
  caution: {
    note: NO_CAUTION,
  },
};

export async function analyzeTranscript(transcript: string): Promise<FeedbackResponse> {
  if (!process.env.OPENAI_API_KEY) {
    return mockFeedback;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: ANALYSIS_SYSTEM_PROMPT },
        { role: "user", content: buildAnalysisUserPrompt(transcript) },
      ],
      response_format: {
        type: "json_schema",
        json_schema: feedbackResponseJsonSchema,
      },
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    throw new Error("OpenAI analysis request failed.");
  }

  const data = (await response.json()) as OpenAIChatCompletion;
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenAI returned an empty analysis.");
  }

  return normalizeFeedback(JSON.parse(content));
}

export function normalizeFeedback(value: unknown): FeedbackResponse {
  const raw = asRecord(value);
  const oldSnapshot = asRecord(raw.snapshot);
  const newSnapshot = asRecord(raw.classroom_snapshot);
  const oldMetrics = Array.isArray(raw.metrics) ? raw.metrics : [];

  const studentParticipation = normalizeMetric(
    raw.student_participation,
    oldMetrics,
    "Student Participation",
    mockFeedback.student_participation,
  );
  const questionQuality = normalizeMetric(
    raw.question_quality,
    oldMetrics,
    "Question Quality",
    mockFeedback.question_quality,
  );
  const clarityAndPacing = normalizeMetric(
    raw.language_clarity_and_pacing,
    oldMetrics,
    "Language Clarity & Pacing",
    mockFeedback.language_clarity_and_pacing,
  );

  const tryTomorrow = asRecord(raw.try_this_tomorrow);
  const oldTryTomorrow = Array.isArray(raw.tryTomorrow)
    ? raw.tryTomorrow.find((item) => typeof item === "string")
    : undefined;
  const strength = asRecord(raw.strength);
  const encouragement = asRecord(raw.encouragement);
  const caution = asRecord(raw.caution);
  const oldBadge = asRecord(raw.badge);

  return {
    classroom_snapshot: {
      title: cleanSnapshotTitle(
        firstUsefulString(newSnapshot.title, raw.classroom_snapshot_title, oldSnapshot.title),
      ),
      summary: cleanSummary(
        firstUsefulString(newSnapshot.summary, raw.classroom_snapshot_summary, oldSnapshot.summary),
      ),
    },
    student_participation: studentParticipation,
    question_quality: questionQuality,
    language_clarity_and_pacing: clarityAndPacing,
    try_this_tomorrow: {
      title: cleanString(
        firstUsefulString(tryTomorrow.title, raw.try_this_tomorrow_title),
        mockFeedback.try_this_tomorrow.title,
      ),
      tip: cleanString(
        firstUsefulString(tryTomorrow.tip, raw.try_this_tomorrow_tip, oldTryTomorrow),
        mockFeedback.try_this_tomorrow.tip,
      ),
      example_phrase: cleanExamplePhrase(
        firstUsefulString(tryTomorrow.example_phrase, raw.example_phrase),
      ),
    },
    strength: {
      title: cleanString(firstUsefulString(strength.title, raw.strength_title), mockFeedback.strength.title),
      feedback: cleanString(
        firstUsefulString(strength.feedback, raw.strength_feedback, raw.didWell),
        mockFeedback.strength.feedback,
      ),
    },
    encouragement: {
      message: cleanString(
        firstUsefulString(encouragement.message, raw.encouragement, oldBadge.description),
        mockFeedback.encouragement.message,
      ),
    },
    caution: {
      note: cleanCaution(firstUsefulString(caution.note, raw.caution)),
    },
  };
}

function normalizeMetric(
  value: unknown,
  oldMetrics: unknown[],
  oldTitle: string,
  fallback: LessonLensMetric,
): LessonLensMetric {
  const metric = asRecord(value);
  const oldMetric = asRecord(
    oldMetrics.find((item) => asRecord(item).title === oldTitle),
  );

  return {
    rating: cleanString(
      firstUsefulString(metric.rating, metric.label, oldMetric.rating, oldMetric.label),
      fallback.rating,
    ),
    evidence: cleanString(
      firstUsefulString(metric.evidence, oldMetric.evidence, metric.summary, oldMetric.summary),
      fallback.evidence,
    ),
    coaching_note: cleanString(
      firstUsefulString(
        metric.coaching_note,
        metric.coachingNote,
        metric.nextMove,
        oldMetric.coaching_note,
        oldMetric.coachingNote,
        oldMetric.nextMove,
      ),
      fallback.coaching_note,
    ),
  };
}

function asRecord(value: unknown): LooseRecord {
  return typeof value === "object" && value !== null ? (value as LooseRecord) : {};
}

function firstUsefulString(...values: unknown[]) {
  return values.find(
    (value) =>
      typeof value === "string" &&
      value.trim() &&
      !/unknown from transcript/i.test(value.trim()) &&
      value.trim().toLowerCase() !== "undefined" &&
      value.trim().toLowerCase() !== "null",
  );
}

function cleanSnapshotTitle(value: unknown) {
  const title = cleanString(value, mockFeedback.classroom_snapshot.title);
  const withoutUnknowns = title.replace(/\bunknown from transcript\b/gi, "").trim();

  if (!withoutUnknowns || withoutUnknowns.includes(" / ")) {
    return mockFeedback.classroom_snapshot.title;
  }

  if (withoutUnknowns.includes(" - ")) {
    return withoutUnknowns.split(" - ")[0].trim() || mockFeedback.classroom_snapshot.title;
  }

  return withoutUnknowns;
}

function cleanSummary(value: unknown) {
  const summary = cleanString(value, mockFeedback.classroom_snapshot.summary);

  return summary
    .replace(/\bUnknown from transcript\b\s*\/\s*\bUnknown from transcript\b/gi, FALLBACK_TEXT)
    .replace(/\s+/g, " ")
    .trim();
}

function cleanExamplePhrase(value: unknown) {
  const phrase = cleanString(value, mockFeedback.try_this_tomorrow.example_phrase);

  if (phrase.startsWith('"') && phrase.endsWith('"')) {
    return phrase;
  }

  return `"${phrase.replace(/^"+|"+$/g, "")}"`;
}

function cleanCaution(value: unknown) {
  const note = cleanString(value, NO_CAUTION);
  const normalized = note.toLowerCase();

  if (
    normalized === "none" ||
    normalized === "n/a" ||
    normalized === "no caution" ||
    normalized === "no caution needed"
  ) {
    return NO_CAUTION;
  }

  return note;
}

function cleanString(value: unknown, fallback: string) {
  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();

  if (
    !trimmed ||
    /unknown from transcript/i.test(trimmed) ||
    trimmed.toLowerCase() === "undefined" ||
    trimmed.toLowerCase() === "null"
  ) {
    return fallback;
  }

  return trimmed;
}
