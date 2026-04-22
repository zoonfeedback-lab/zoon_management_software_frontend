import { PrimaryButton, ProgressBar, Section, StatusBadge } from "@/components/ui";
import { invoices, paymentMetrics } from "@/lib/data";

export default function PaymentsPage() {
  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-end">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">zoon / Revenue Ops</p>
          <h1 className="display-title text-4xl text-white md:text-5xl">Payments &amp; Invoicing</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-mute md:text-lg">
            Manage project revenue, overdue contracts, collection health, and finance-ready invoice visibility.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryButton>Create New Invoice</PrimaryButton>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[repeat(2,minmax(0,1fr))_1.15fr]">
        {paymentMetrics.map((metric) => (
          <article key={metric.label} className="panel-surface grid gap-4 p-6">
            <div className="text-sm uppercase tracking-[0.22em] text-mute">{metric.label}</div>
            <div className="display-title text-5xl text-white">{metric.value}</div>
            <div className={metric.accent === "green" ? "text-success" : metric.accent === "red" ? "text-brand" : "text-mute"}>
              {metric.note}
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_360px]">
        <Section title="Revenue Overview" eyebrow="6 Month Window">
          <div className="grid min-h-[360px] items-end p-6 md:p-7">
            <div className="grid gap-5">
              {[28, 42, 39, 61, 70, 82].map((value, index) => (
                <div key={value} className="grid gap-2">
                  <div className="flex items-center justify-between text-sm text-zinc-300">
                    <span>Month {index + 1}</span>
                    <span>${(value * 1200).toLocaleString()}</span>
                  </div>
                  <ProgressBar value={value} tone={index > 3 ? "red" : "white"} />
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Payment Distribution" eyebrow="Collection Split">
          <div className="grid gap-5 p-6 md:p-7">
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-sm text-zinc-300"><span>Direct Deposit</span><span>72%</span></div>
              <ProgressBar value={72} />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-sm text-zinc-300"><span>Crypto (USDC)</span><span>18%</span></div>
              <ProgressBar value={18} tone="white" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-sm text-zinc-300"><span>Wire Transfer</span><span>10%</span></div>
              <ProgressBar value={10} tone="green" />
            </div>
          </div>
          <div className="relative m-6 overflow-hidden bg-brand p-6 text-white md:m-7">
            <div className="absolute -bottom-6 right-4 text-[88px] font-black text-white/10">+</div>
            <h3 className="text-2xl font-semibold">Quick Export</h3>
            <p className="mt-3 max-w-xs leading-7 text-white/90">
              Generate tax-ready financial reports for Q2 and package invoice summaries for accounting review.
            </p>
          </div>
        </Section>
      </div>

      <Section title="Recent Invoices" eyebrow="Billing Table">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {["Invoice ID", "Project Name", "Amount", "Due Date", "Status"].map((heading) => (
                <th key={heading} className="border-b border-line px-6 py-4 text-left text-xs uppercase tracking-[0.22em] text-mute">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="transition hover:bg-white/[0.03]">
                <td className="border-b border-line px-6 py-5 text-white">{invoice.id}</td>
                <td className="border-b border-line px-6 py-5 font-semibold text-white">{invoice.project}</td>
                <td className="border-b border-line px-6 py-5 text-white">{invoice.amount}</td>
                <td className="border-b border-line px-6 py-5 text-mute">{invoice.dueDate}</td>
                <td className="border-b border-line px-6 py-5"><StatusBadge status={invoice.status} /></td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}
