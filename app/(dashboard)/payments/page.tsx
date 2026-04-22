import { ProgressBar, Section, StatusBadge } from "@/components/ui";
import { invoices, paymentMetrics } from "@/lib/data";

export default function PaymentsPage() {
  return (
    <div className="page-stack">
      <div className="hero">
        <div>
          <p className="eyebrow">Zoonlabs / Revenue Ops</p>
          <h1>Payments &amp; Invoicing</h1>
          <p>Manage project revenue, overdue contracts, collection health, and finance-ready invoice visibility.</p>
        </div>
        <div className="hero-actions">
          <button className="primary-button">Create New Invoice</button>
        </div>
      </div>

      <div className="metrics-grid">
        {paymentMetrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-note ${metric.accent ?? ""}`}>{metric.note}</div>
          </article>
        ))}
      </div>

      <div className="split-grid">
        <Section title="Revenue Overview" eyebrow="6 Month Window">
          <div style={{ padding: 28, minHeight: 360, display: "grid", alignItems: "end" }}>
            <div style={{ display: "grid", gap: 22 }}>
              {[28, 42, 39, 61, 70, 82].map((value, index) => (
                <div key={value} style={{ display: "grid", gap: 8 }}>
                  <div className="distribution-label"><span>Month {index + 1}</span><span>${(value * 1200).toLocaleString()}</span></div>
                  <ProgressBar value={value} tone={index > 3 ? "red" : "white"} />
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Payment Distribution" eyebrow="Collection Split">
          <div className="distribution">
            <div className="distribution-row">
              <div className="distribution-label"><span>Direct Deposit</span><span>72%</span></div>
              <ProgressBar value={72} />
            </div>
            <div className="distribution-row">
              <div className="distribution-label"><span>Crypto (USDC)</span><span>18%</span></div>
              <ProgressBar value={18} tone="white" />
            </div>
            <div className="distribution-row">
              <div className="distribution-label"><span>Wire Transfer</span><span>10%</span></div>
              <ProgressBar value={10} tone="green" />
            </div>
          </div>
          <div className="highlight-box">
            <h3 style={{ marginTop: 0 }}>Quick Export</h3>
            <p>Generate tax-ready financial reports for Q2 and package invoice summaries for accounting review.</p>
          </div>
        </Section>
      </div>

      <Section title="Recent Invoices" eyebrow="Billing Table">
        <table className="table">
          <thead>
            <tr>
              <th>Invoice ID</th>
              <th>Project Name</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.project}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.dueDate}</td>
                <td><StatusBadge status={invoice.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
