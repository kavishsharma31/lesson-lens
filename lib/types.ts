export type LessonLensMetric = {
  rating: string;
  evidence: string;
  coaching_note: string;
};

export type FeedbackResponse = {
  classroom_snapshot: {
    title: string;
    summary: string;
  };
  student_participation: LessonLensMetric;
  question_quality: LessonLensMetric;
  language_clarity_and_pacing: LessonLensMetric;
  try_this_tomorrow: {
    title: string;
    tip: string;
    example_phrase: string;
  };
  strength: {
    title: string;
    feedback: string;
  };
  encouragement: {
    message: string;
  };
  caution: {
    note: string;
  };
};

export type MetricTone = "peacock" | "mango" | "poppy" | "leaf" | "grape";

export type FeedbackMetric = {
  title: string;
  score: number;
  label: string;
  summary: string;
  evidence: string;
  nextMove: string;
  tone: MetricTone;
};

export type FeedbackReport = {
  snapshot: {
    grade: string;
    topic: string;
    duration: string;
    classMood: string;
    summary: string;
  };
  metrics: FeedbackMetric[];
  tryTomorrow: string[];
  didWell: string;
  badge: {
    label: string;
    description: string;
  };
};
