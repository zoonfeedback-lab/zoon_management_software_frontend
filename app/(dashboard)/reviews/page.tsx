import { Section, StatusBadge } from "@/components/ui";
import { reviews } from "@/lib/data";

export default function ReviewsPage() {
  return (
    <div className="page-stack">
      <div className="hero">
        <div>
          <p className="eyebrow">Zoonlabs / Client Voice</p>
          <h1>Reviews &amp; Feedback</h1>
          <p>Capture testimonials, executive sentiment, and delivery confidence signals across all active accounts.</p>
        </div>
        <div className="hero-actions">
          <button className="ghost-button">Export Testimonials</button>
          <button className="primary-button">Request Feedback</button>
        </div>
      </div>

      <Section title="Client Feedback Feed" eyebrow="Review Archive">
        <div className="review-list" style={{ padding: 28 }}>
          {reviews.map((review) => (
            <article key={`${review.client}-${review.project}`} className="review-card">
              <div className="review-meta">
                <span>{review.client}</span>
                <StatusBadge status={review.score} />
              </div>
              <h3>{review.project}</h3>
              <p className="quote">"{review.quote}"</p>
              <div className="review-meta" style={{ marginTop: 16 }}>
                <span>{review.type}</span>
                <span>{review.updatedAt}</span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}
