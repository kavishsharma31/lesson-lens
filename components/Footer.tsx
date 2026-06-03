import { BookOpenCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink/10 bg-white py-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-black text-ink">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-peacock text-white">
            <BookOpenCheck size={20} aria-hidden="true" />
          </span>
          LessonLens
        </div>
        <p className="text-sm font-bold text-ink/58">
          Frontend-only hackathon prototype with mock teaching feedback.
        </p>
      </div>
    </footer>
  );
}
