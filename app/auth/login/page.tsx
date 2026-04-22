export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090b]">
      <div className="absolute inset-y-0 left-0 w-1 bg-brand" />
      <div className="grid-bg absolute inset-0 opacity-25" />
      <div className="absolute inset-y-0 right-0 hidden w-[24%] border-l border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] lg:block" />

      <div className="relative flex min-h-screen flex-col justify-between">
        <div className="mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-10">
          <div className="w-full max-w-xl">
            <div className="mb-12 flex items-center gap-4">
              <div className="grid h-[52px] w-[52px] place-items-center bg-brand text-xl font-black text-white">{">"}</div>
              <div>
                <div className="display-title text-4xl text-brand md:text-5xl">zoon</div>
                <div className="mt-1 text-base uppercase tracking-[0.18em] text-[#f2b9ab] md:text-lg">Engineering Hub</div>
              </div>
            </div>

            <div className="panel-surface w-full max-w-[550px] p-8 md:p-10">
              <h1 className="text-4xl font-semibold text-white md:text-5xl">Sign in</h1>
              <p className="mt-4 text-xl text-[#eac0b5] md:text-2xl">Access your engineering environment.</p>

              <form className="mt-10 grid gap-6">
                <div className="grid gap-3">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f2c4ba]">Email Address</div>
                  <input
                    id="email"
                    type="email"
                    placeholder="engineer@zoon.io"
                    className="border border-line bg-black/45 px-5 py-4 text-xl text-white placeholder:text-mute md:text-2xl"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#f2c4ba]">
                    <label htmlFor="password">Password</label>
                    <a href="#forgot" className="text-brand">Forgot password?</a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="........"
                    className="border border-line bg-black/45 px-5 py-4 text-xl text-white placeholder:text-mute md:text-2xl"
                  />
                </div>

                <button className="mt-1 bg-brand px-6 py-4 text-2xl font-bold text-white transition hover:bg-[#ff343a] md:text-3xl" type="submit">
                  Authenticate
                </button>
              </form>

              <div className="my-8 flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-zinc-600">
                <div className="h-px flex-1 bg-line" />
                <span>Or Continue With</span>
                <div className="h-px flex-1 bg-line" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button className="border border-line bg-black/35 px-5 py-4 text-xl font-semibold uppercase tracking-[0.14em] text-white">
                  GitHub
                </button>
                <button className="border border-line bg-black/35 px-5 py-4 text-xl font-semibold uppercase tracking-[0.14em] text-white">
                  Google
                </button>
              </div>
            </div>

            <div className="mt-8 flex max-w-[550px] items-center justify-between gap-4 text-lg text-[#e7c4bc] md:text-xl">
              <span>New to zoon?</span>
              <a href="#request-access" className="font-semibold uppercase tracking-[0.16em] text-brand">
                Request Access
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line px-6 py-4 text-sm uppercase tracking-[0.18em] text-[#e7c4bc] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand" /> Auth_Server: Online</span>
            <span>Encryption: AES-256</span>
          </div>
          <span>Region: EU-West-1 // Node: 0x82F1</span>
        </div>
      </div>
    </div>
  );
}
