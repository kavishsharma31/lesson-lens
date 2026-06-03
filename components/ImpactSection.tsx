import { GraduationCap, HandHeart, School } from "lucide-react";

const impactItems = [
  {
    title: "Built for busy teachers",
    body: "A short transcript becomes a focused reflection, without a long coaching form.",
    icon: School,
    color: "bg-peacock text-white",
  },
  {
    title: "Friendly feedback tone",
    body: "Every card starts from strengths and keeps the next step small enough to try.",
    icon: HandHeart,
    color: "bg-poppy text-white",
  },
  {
    title: "Classroom-ready insights",
    body: "The feedback focuses on participation, questioning, clarity, and pacing.",
    icon: GraduationCap,
    color: "bg-mango text-ink",
  },
];

export default function ImpactSection() {
  return (
    <section id="impact" className="bg-chalk py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-peacock">
              Why this matters
            </p>
            <h2 className="mt-2 text-3xl font-black text-ink sm:text-4xl">
              Small teaching moves can travel far.
            </h2>
            <p className="mt-4 text-lg font-semibold leading-8 text-ink/72">
              LessonLens is shaped for government school contexts where time, coaching
              access, and classroom bandwidth are limited. The prototype keeps the
              feedback practical, kind, and easy to project in a staff room.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
            {impactItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border-2 border-ink/10 bg-white p-5 shadow-[0_7px_0_rgba(22,48,61,0.08)]"
                >
                  <div className="flex gap-4">
                    <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${item.color}`}>
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm font-semibold leading-6 text-ink/68">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
