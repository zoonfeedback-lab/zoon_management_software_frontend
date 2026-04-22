import { GhostButton, PrimaryButton } from "@/components/ui";
import { reviews } from "@/lib/data";

const pendingReviews = [
  {
    id: "PRJ-2023-A4",
    title: "E-Commerce Platform Migration",
    summary: "Phase 2: Database integration and initial frontend component deployment completed on Oct 12.",
    team: ["EL", "MK"],
  },
];

export default function ReviewsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-5 border-b border-line pb-6 xl:flex-row xl:items-end">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">zoon / Client Voice</p>
          <h1 className="display-title text-4xl text-white md:text-6xl">Reviews &amp; Feedback</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-mute md:text-lg">
            Analyze and manage client testimonials across all engineering hubs and publish the strongest signals.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <GhostButton>Request Feedback</GhostButton>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_minmax(0,1.9fr)]">
        <section className="panel-surface p-6 md:p-7">
          <div className="mb-5 flex items-center gap-4">
            <div className="h-10 w-1 bg-brand" />
            <h2 className="text-3xl font-semibold text-white">Awaiting Your Review</h2>
          </div>
          {pendingReviews.map((item) => (
            <article key={item.id} className="border border-line bg-white/[0.02] p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 border border-brand px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  Action Required
                </span>
                <span className="text-sm uppercase tracking-[0.18em] text-mute">{item.id}</span>
              </div>
              <h3 className="mt-5 text-3xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-300">{item.summary}</p>
              <div className="mt-8 flex flex-col gap-5 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex -space-x-3">
                  {item.team.map((member) => (
                    <div
                      key={member}
                      className="grid h-11 w-11 place-items-center rounded-full border border-[#23475c] bg-gradient-to-br from-sky-900 to-sky-500 text-sm font-bold text-white"
                    >
                      {member}
                    </div>
                  ))}
                </div>
                <PrimaryButton>Submit Review</PrimaryButton>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-4 md:grid-cols-[repeat(2,minmax(0,1fr))_1.2fr]">
          <article className="panel-surface flex flex-col items-center justify-center p-6 text-center">
            <div className="text-sm uppercase tracking-[0.22em] text-mute">Average Rating</div>
            <div className="display-title mt-5 text-6xl text-white">
              4.9<span className="text-3xl text-mute">/5</span>
            </div>
            <div className="mt-5 text-3xl tracking-[0.25em] text-brand">*****</div>
          </article>
          <article className="panel-surface flex flex-col justify-center p-6">
            <div className="text-sm uppercase tracking-[0.22em] text-mute">Total Reviews</div>
            <div className="display-title mt-6 text-6xl text-white">128</div>
            <div className="mt-6 text-lg text-success">+12% this month</div>
          </article>
          <article className="panel-surface relative overflow-hidden p-6">
            <div className="absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-white/5 to-transparent" />
            <div className="text-sm uppercase tracking-[0.22em] text-mute">Net Promoter Score (NPS)</div>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="display-title text-7xl text-white">82</div>
              <span className="border border-brand px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">World Class</span>
            </div>
            <p className="mt-5 max-w-md text-lg leading-8 text-mute">
              Your score is higher than 94% of engineering firms in the sector.
            </p>
          </article>
        </section>
      </div>

      <section className="grid gap-5">
        <div className="flex items-center gap-4">
          <div className="h-10 w-1 bg-white/20" />
          <h2 className="text-3xl font-semibold text-white">Past Feedback</h2>
        </div>

        {reviews.map((review, index) => (
          <article key={`${review.client}-${review.project}`} className="panel-surface p-6 md:p-7">
            <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_180px]">
              <div className="border-b border-line pb-4 xl:border-b-0 xl:border-r xl:pb-0 xl:pr-6">
                <span className="inline-flex items-center gap-2 border border-zinc-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-100">
                  <span className="h-2 w-2 rounded-full bg-zinc-100" />
                  Completed
                </span>
                <h3 className="mt-5 text-3xl font-semibold text-white">{review.project}</h3>
                <p className="mt-3 text-lg text-mute">{index === 0 ? "Sep 15, 2023" : index === 1 ? "Jul 02, 2023" : review.updatedAt}</p>
              </div>

              <div>
                <div className="text-3xl tracking-[0.22em] text-brand">*****</div>
                <div className="mt-3 text-2xl text-white">{review.score}</div>
                <p className="mt-5 max-w-4xl text-xl leading-9 text-zinc-300">"{review.quote}"</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["Communication", "Speed", review.type].map((tag) => (
                    <span key={tag} className="bg-white/[0.06] px-3 py-2 text-sm text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 self-start">
                <PrimaryButton className={index === 2 ? "bg-zinc-700 hover:bg-zinc-600" : ""}>
                  {index === 2 ? "Approved" : "Approve"}
                </PrimaryButton>
                <GhostButton className="border-line">Hide</GhostButton>
                <div className="pt-4 text-right text-xs uppercase tracking-[0.22em] text-mute">Revision</div>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
