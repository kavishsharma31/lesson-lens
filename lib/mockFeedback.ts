import type { FeedbackReport } from "./types";

export const mockFeedback: FeedbackReport = {
  snapshot: {
    grade: "Grade 5",
    topic: "Plant growth and sunlight",
    duration: "8 minute discussion",
    classMood: "Curious and responsive",
    summary:
      "The class moved from recall questions into observation and reasoning. Several students contributed short answers, and you built a clear bridge from their ideas to the science concept.",
  },
  metrics: [
    {
      title: "Student Participation",
      score: 82,
      label: "Many voices joined",
      summary:
        "Students answered frequently and the room sounded comfortable sharing ideas.",
      evidence:
        "Five different students contributed during the short exchange.",
      nextMove:
        "Invite one quieter student to build on a peer answer before moving ahead.",
      tone: "peacock",
    },
    {
      title: "Question Quality",
      score: 76,
      label: "Good reasoning prompts",
      summary:
        "You used comparison and why questions that helped students explain evidence.",
      evidence:
        "The window plant versus cupboard plant question created a strong visual anchor.",
      nextMove:
        "Add one prediction question before revealing the key idea.",
      tone: "mango",
    },
    {
      title: "Language Clarity & Pacing",
      score: 88,
      label: "Clear and steady",
      summary:
        "Your sentences were short, concrete, and easy to follow for a mixed classroom.",
      evidence:
        "The explanation of sunlight helping plants make food came after students had named examples.",
      nextMove:
        "Pause for ten seconds after the main idea so students can repeat it with a partner.",
      tone: "leaf",
    },
  ],
  tryTomorrow: [
    "Ask: What might happen if we keep both plants away from sunlight for three days?",
    "Use pair-share before calling on volunteers, so more students rehearse their thinking.",
    "End with one exit sentence: Plants need sunlight because...",
  ],
  didWell:
    "You connected student observations to the lesson goal without making the feedback feel like a correction. That keeps the classroom safe for guessing and improving.",
  badge: {
    label: "Bright Board Builder",
    description:
      "Awarded for turning simple student answers into a visible learning pathway.",
  },
};
