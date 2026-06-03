export const ANALYSIS_SYSTEM_PROMPT = `
You are LessonLens, a supportive instructional coach for government school teachers.

You analyze short classroom transcripts and produce a practical coaching card. Your feedback must help the teacher improve the very next class without feeling judged.

Coaching stance:
- Be warm, respectful, concrete, and non-judgmental.
- Use simple language that is easy for a busy teacher to understand.
- Base every claim only on the transcript.
- Do not infer grade, duration, learning outcome, student ability, or teacher intent unless the transcript states it.
- Prefer specific evidence over broad praise.
- Name actual words or teaching moves from the transcript when available.
- If evidence is limited, say so gently and still give one useful next move.

You must analyze:
- student participation
- question quality
- language clarity and pacing
- one specific next-class action
- one teacher strength

Specificity rules:
- Avoid generic lines like "Students participated by answering questions", "Questions were relevant", or "The teacher communicated clearly".
- Evidence must mention what happened in the transcript, such as short student answers, teacher follow-ups, repeated teacher explanation, wait time, or student reasoning.
- Good evidence sounds like: "Students gave short answers like 'steam' and 'evaporation', but were not asked to explain their thinking."

Classroom snapshot rules:
- classroom_snapshot.title must be a warm 3-6 word phrase.
- classroom_snapshot.title must not combine topic and mood with punctuation like "states of matter - engaged".
- classroom_snapshot.summary must be exactly 2 short sentences about the teaching pattern.

Try-this-tomorrow rules:
- Give exactly one concrete suggestion.
- It must need no extra materials.
- It must be usable tomorrow.
- It must include one exact sample phrase the teacher can say.

Caution rules:
- Add a caution only if the transcript is too short, has no student responses, or gives too little evidence for confident feedback.
- If no caution is needed, set caution.note to "No caution needed from this transcript."

Return only valid JSON matching the required schema. Do not include markdown, headings, or commentary.
`;

export const feedbackResponseJsonSchema = {
  name: "lessonlens_feedback_response",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: [
      "classroom_snapshot",
      "student_participation",
      "question_quality",
      "language_clarity_and_pacing",
      "try_this_tomorrow",
      "strength",
      "encouragement",
      "caution",
    ],
    properties: {
      classroom_snapshot: {
        type: "object",
        additionalProperties: false,
        required: ["title", "summary"],
        properties: {
          title: {
            type: "string",
            description: "A warm 3-6 word phrase, not a topic/mood pair.",
          },
          summary: {
            type: "string",
            description: "Exactly 2 short sentences about the teaching pattern.",
          },
        },
      },
      student_participation: metricSchema(),
      question_quality: metricSchema(),
      language_clarity_and_pacing: metricSchema(),
      try_this_tomorrow: {
        type: "object",
        additionalProperties: false,
        required: ["title", "tip", "example_phrase"],
        properties: {
          title: { type: "string" },
          tip: {
            type: "string",
            description: "Exactly one concrete action requiring no extra materials.",
          },
          example_phrase: {
            type: "string",
            description: "One exact phrase the teacher can say tomorrow.",
          },
        },
      },
      strength: {
        type: "object",
        additionalProperties: false,
        required: ["title", "feedback"],
        properties: {
          title: { type: "string" },
          feedback: {
            type: "string",
            description: "One specific teacher strength grounded in the transcript.",
          },
        },
      },
      encouragement: {
        type: "object",
        additionalProperties: false,
        required: ["message"],
        properties: {
          message: { type: "string" },
        },
      },
      caution: {
        type: "object",
        additionalProperties: false,
        required: ["note"],
        properties: {
          note: { type: "string" },
        },
      },
    },
  },
} as const;

export function buildAnalysisUserPrompt(transcript: string) {
  return `
Analyze the transcript and return JSON that exactly matches the schema.

Field guidance:
- student_participation.rating: short label such as "Limited", "Medium", or "Active".
- student_participation.evidence: quote or describe student turns and how much students contributed.
- student_participation.coaching_note: one practical next move for participation.
- question_quality.rating: short label such as "Recall-heavy", "Some reasoning", or "Reasoning-rich".
- question_quality.evidence: describe the actual question pattern and student thinking shown.
- question_quality.coaching_note: one practical next move for stronger questioning.
- language_clarity_and_pacing.rating: short label such as "Clear", "Quick", or "Needs more wait time".
- language_clarity_and_pacing.evidence: describe actual wording, pacing, or explanation pattern.
- language_clarity_and_pacing.coaching_note: one practical next move for clarity or pacing.
- try_this_tomorrow.title: a short action title.
- try_this_tomorrow.tip: exactly one action.
- try_this_tomorrow.example_phrase: one phrase in quotation marks.
- strength.title: a short strength label.
- strength.feedback: specific praise grounded in the transcript.
- encouragement.message: warm closing message.
- caution.note: only a caution if transcript evidence is thin; otherwise use the exact no-caution sentence from the system prompt.

Transcript:
${transcript}
`;
}

function metricSchema() {
  return {
    type: "object",
    additionalProperties: false,
    required: ["rating", "evidence", "coaching_note"],
    properties: {
      rating: { type: "string" },
      evidence: {
        type: "string",
        description: "Specific evidence based only on the transcript.",
      },
      coaching_note: {
        type: "string",
        description: "A practical, non-judgmental coaching note.",
      },
    },
  } as const;
}
