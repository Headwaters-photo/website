export default function Home() {
  return (
    <main className="relative isolate flex min-h-dvh overflow-hidden bg-white px-6 py-8 sm:px-10 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-[radial-gradient(ellipse_at_bottom,_rgba(14,116,144,0.12),_transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-32rem] left-1/2 -z-10 h-[42rem] w-[72rem] -translate-x-1/2 rounded-[50%] border border-sky-950/10 bg-sky-50/50 blur-[1px]"
      />

      <nav
        aria-label="Primary navigation"
        className="absolute inset-x-0 top-0 flex items-center justify-center px-6 py-7 sm:justify-start sm:px-10 sm:py-9"
      >
        <span className="flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.02em] text-slate-950">
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 rounded-full bg-cyan-700 shadow-[0_0_0_4px_rgba(14,116,144,0.1)]"
          />
          Headwaters
        </span>
      </nav>

      <section className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center pb-8 pt-20 text-center sm:pb-12">
        <div className="hero-enter">
          <p className="mb-7 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-800">
            A new home for your memories
          </p>

          <h1 className="text-balance text-[clamp(4rem,12vw,8.75rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-slate-950">
            Headwaters
          </h1>

          <h2 className="mx-auto mt-9 max-w-3xl text-balance text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.045em] text-slate-800">
            Your photos deserve
            <br className="hidden sm:block" /> a better home.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
            A thoughtful place to preserve, organize, and return to the moments
            that matter most.
          </p>

          <button
            type="button"
            className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-slate-950 px-7 py-3 text-sm font-medium text-white shadow-[0_12px_35px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-950 hover:shadow-[0_16px_40px_rgba(15,23,42,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-700 active:translate-y-0"
          >
            Coming Soon
          </button>
        </div>
      </section>

      <p className="absolute inset-x-0 bottom-7 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400 sm:bottom-9">
        Made for the moments worth keeping
      </p>
    </main>
  );
}
