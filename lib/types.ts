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
