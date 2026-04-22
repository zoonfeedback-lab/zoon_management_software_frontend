export default function LoginPage() {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <p className="eyebrow">Zoonlabs / Secure Access</p>
        <h1>Welcome Back</h1>
        <p>Sign in to access project delivery, payments, reviews, and operational dashboards.</p>
        <form className="form-grid">
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="team@zoonlabs.com" />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="••••••••" />
          </div>
          <button className="primary-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
